// scripts/move-changelog.ts
import { promises as fs } from "node:fs";
import path from "node:path";

async function ensureRootChangelog(rootChangelog: string) {
    try {
        await fs.access(rootChangelog);
    } catch {
        await fs.writeFile(rootChangelog, "# Changelog\n\n", "utf8");
    }
}

function extractLatestReleaseBlock(pkgChangelog: string) {
    // Changesets format is typically:
    // # @scope/name
    // ## 1.2.3
    // ...content...
    // ## 1.2.2
    //
    // Grab the first `## <version>` block.
    const lines = pkgChangelog.split(/\r?\n/);
    const startIdx = lines.findIndex(l => /^##\s+/.test(l));
    if (startIdx === -1) return null;

    // end at next '## ' or EOF
    let endIdx = lines.length;
    for (let i = startIdx + 1; i < lines.length; i++) {
        if (/^##\s+/.test(lines[i])) {
            endIdx = i;
            break;
        }
    }
    const latest = lines.slice(startIdx, endIdx).join("\n").trim();
    return latest || null;
}

async function main() {
    const repoRoot = process.cwd();
    const targetDir = process.argv[2] || "packages/ritext";

    const pkgChangelogPath = path.join(repoRoot, targetDir, "CHANGELOG.md");
    const rootChangelogPath = path.join(repoRoot, "CHANGELOG.md");
    const pkgJsonPath = path.join(repoRoot, targetDir, "package.json");

    // If package changelog doesn't exist, nothing to do.
    try { await fs.access(pkgChangelogPath); } catch { return; }

    const pkgChangelog = await fs.readFile(pkgChangelogPath, "utf8");
    const latestBlock = extractLatestReleaseBlock(pkgChangelog);
    if (!latestBlock) {
        // Fallback: if we can't parse blocks, prepend everything after the first line
        const stripped = pkgChangelog.replace(/^#.*\n?/, "").trim();
        if (!stripped) return;
        await ensureRootChangelog(rootChangelogPath);
        const current = await fs.readFile(rootChangelogPath, "utf8");
        const merged = current + `\n---\n\n${stripped}\n`;
        await fs.writeFile(rootChangelogPath, merged, "utf8");
        await fs.rm(pkgChangelogPath);
        return;
    }

    // Get package name for context header
    let pkgName = targetDir;
    try {
        const pkg = JSON.parse(await fs.readFile(pkgJsonPath, "utf8"));
        if (pkg?.name) pkgName = pkg.name;
    } catch { }

    // Prepend a small header with the package name, then the latest block
    const section = `\n---\n\n### ${pkgName}\n\n${latestBlock}\n`;
    await ensureRootChangelog(rootChangelogPath);
    const current = await fs.readFile(rootChangelogPath, "utf8");
    const merged = current + section;
    await fs.writeFile(rootChangelogPath, merged, "utf8");

    // Remove the package-level changelog so it doesn't persist in the repo
    await fs.rm(pkgChangelogPath);
    console.log(`Moved latest changelog entry from ${targetDir} -> root CHANGELOG.md`);
}

main().catch(err => {
    console.error(err?.message || err);
    process.exit(1);
});
