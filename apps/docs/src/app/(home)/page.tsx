import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Blocks,
  BookOpenText,
  Braces,
  CheckCircle2,
  ChevronDown,
  Code2,
  Component,
  Gauge,
  Layers2,
  Paintbrush,
  PenTool,
  Rocket,
  Puzzle,
  Sparkles,
  WandSparkles,
  Workflow,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ritext | A WYSIWYG Editor",
  description:
    "Ritext is a modern WYSIWYG rich text editor built with Tailwind CSS, powered by Tiptap.",
};

const features = [
  {
    title: "Headless & Composable",
    description:
      "Design your own toolbar and editor layout using clean React components. No forced UI or lock-in.",
    icon: Puzzle,
  },
  {
    title: "Tailwind CSS Powered",
    description:
      "Every component is built with Tailwind CSS, so visual customization is as simple as adding a class.",
    icon: Paintbrush,
  },
  {
    title: "Tiptap Foundation",
    description:
      "Built on top of Tiptap v3 with a proven extension architecture and familiar editor APIs.",
    icon: Zap,
  },
  {
    title: "20+ Extensions",
    description:
      "Prebuilt extensions cover text formatting, lists, tables, links, media, and advanced writing tools.",
    icon: Component,
  },
  {
    title: "TypeScript First",
    description:
      "Strong typing across editor APIs, toolbar controls, and extension configuration.",
    icon: Braces,
  },
  {
    title: "Zero Lock-in",
    description:
      "No heavyweight framework assumptions. Use it with your own design system and app structure.",
    icon: Code2,
  },
];

const allExtensions = [
  "Bold", "Italic", "Underline", "Strike", "Heading",
  "Color", "Background Color", "Font Family", "Font Size",
  "Line Height", "Bullet List", "Ordered List", "Task List",
  "Text Align", "Indent / Outdent", "Links", "Image", "Table",
  "Block Quote", "Horizontal Rule", "Emoji", "Hard Break",
  "History", "Clear Format", "Subscript", "Superscript",
];

const useCases = [
  {
    title: "Product Documentation",
    description: "Write feature docs with structured headings, callouts, tables, and embedded media.",
    icon: BookOpenText,
  },
  {
    title: "Campaign & Marketing",
    description: "Ship landing content, newsletters, and knowledge pages with reusable formatting blocks.",
    icon: PenTool,
  },
  {
    title: "Workspace Content",
    description: "Power notes, team updates, and templates inside your app with a polished editing flow.",
    icon: Layers2,
  },
];

const workflowSteps = [
  {
    title: "Install + Compose",
    description: "Choose extensions and create your editor layout with your own UI patterns.",
    icon: Blocks,
  },
  {
    title: "Theme + Customize",
    description: "Style controls with Tailwind classes and map behavior to your product design system.",
    icon: WandSparkles,
  },
  {
    title: "Ship + Iterate",
    description: "Deliver rich writing experiences quickly and evolve features without lock-in.",
    icon: Rocket,
  },
];

const integrations = [
  "React 19",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Tiptap v3",
  "Custom Toolbars",
  "MDX Workflows",
  "Design Systems",
];

const faqs = [
  {
    question: "Can I fully customize the toolbar and editor layout?",
    answer:
      "Yes. Ritext is headless and composable, so you can rearrange controls, hide tools, and design your own editor surface.",
  },
  {
    question: "Do I need all extensions in my bundle?",
    answer:
      "No. You only import extensions you need. This keeps your editor experience focused and your bundle leaner.",
  },
  {
    question: "Will this work with my existing design system?",
    answer:
      "Yes. Components are Tailwind-friendly and TypeScript-first, so they integrate cleanly into existing product styles.",
  },
];

export default function HomePage() {
  return (
    <div className="home-smooth-bg flex flex-col flex-1">
      <section className="relative overflow-hidden px-6 pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="hero-grid absolute inset-0 opacity-25" />
        <div className="liquid-orb liquid-orb-a" />
        <div className="liquid-orb liquid-orb-b" />
        <div className="liquid-orb liquid-orb-c" />
        <div className="mx-auto w-full max-w-[1540px]">
          <div className="glass-panel hero-glow relative rounded-3xl px-6 py-14 sm:px-12 sm:py-16">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_560px]">
              <div>
                <div className="floating inline-flex items-center gap-2 rounded-full border border-two/25 bg-white/85 px-4 py-2 text-sm font-medium text-two">
                  <Sparkles className="h-4 w-4" />
                  Beautiful editing experiences for React apps
                </div>

                <Image
                  src="/logos.png"
                  width={469}
                  height={167}
                  alt="Ritext"
                  className="mt-8 w-42 sm:w-52"
                  priority
                />

                <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-tight text-slate-900 sm:text-6xl">
                  Build a <span className="gradient-text">production-ready editor</span> that matches your product.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                  Ritext is a headless, composable rich text editor for React. Ship your own
                  toolbar, UX, and design language with flexible extensions and clean APIs.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="/docs"
                    className="inline-flex items-center gap-2 rounded-xl bg-two px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-two/20"
                  >
                    Read the Docs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/playground"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-one px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-one/25"
                  >
                    Open Playground
                    <Code2 className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://github.com/siamahnaf/ritext"
                    target="_blank"
                    className="rounded-xl border border-two/20 bg-white/80 px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-two/40 hover:bg-white"
                  >
                    View on GitHub
                  </Link>
                </div>

                <div className="mt-12 grid gap-3 sm:grid-cols-3">
                  <div className="soft-shine rounded-xl border border-two/20 bg-white/80 px-4 py-4">
                    <p className="text-2xl font-semibold text-slate-900">26+</p>
                    <p className="text-sm text-slate-600">Ready-to-use extensions</p>
                  </div>
                  <div className="soft-shine rounded-xl border border-two/20 bg-white/80 px-4 py-4">
                    <p className="text-2xl font-semibold text-slate-900">TypeScript</p>
                    <p className="text-sm text-slate-600">Typed APIs and components</p>
                  </div>
                  <div className="soft-shine rounded-xl border border-two/20 bg-white/80 px-4 py-4">
                    <p className="text-2xl font-semibold text-slate-900">Tiptap v3</p>
                    <p className="text-sm text-slate-600">Battle-tested editor engine</p>
                  </div>
                </div>
              </div>
              <div className="liquid-glass floating relative rounded-3xl p-5 sm:p-6">
                <Image
                  src="/editor-preview.svg"
                  alt="Ritext editor preview"
                  width={1200}
                  height={840}
                  className="relative z-10 w-full rounded-2xl border border-white/80 shadow-2xl shadow-slate-900/15"
                  priority
                />
                <div className="relative z-10 mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-xs text-slate-700">
                    Liquid glass UI
                  </div>
                  <div className="rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-xs text-slate-700">
                    Responsive blocks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-[1540px] rounded-2xl bg-slate-900 px-6 py-6 text-center sm:px-10">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Install via npm</p>
          <code className="text-lg text-three sm:text-xl">npm install ritext</code>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="smooth-surface mx-auto max-w-[1540px] rounded-2xl px-4 py-3 sm:px-6">
          <div className="marquee-wrap">
            <div className="marquee-track gap-3">
              {[...integrations, ...integrations].map((name, idx) => (
                <div
                  key={`${name}-${idx}`}
                  className="rounded-full border border-two/20 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1540px] px-6 py-16">
        <div className="mb-10 text-center">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-two/25 bg-white/70 px-4 py-1 text-sm text-two">
            <BookOpenText className="h-4 w-4" />
            Developer-first architecture
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Everything you need in a rich text editor
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Built for teams that care about content quality and product polish.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="elevated-card stagger-in rounded-2xl p-6" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="mb-5 inline-flex rounded-lg bg-two/10 p-3 text-two">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1540px]">
          <div className="mb-10 text-center">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-two/25 bg-white/70 px-4 py-1 text-sm text-two">
              <Workflow className="h-4 w-4" />
              Use Cases
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Built for real product workflows
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              From docs platforms to collaborative workspaces, Ritext adapts to your product model.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
            <div className="liquid-glass rounded-3xl p-5 sm:p-7">
              <Image
                src="/editor-preview.svg"
                alt="Ritext visual editor preview"
                width={1200}
                height={840}
                className="w-full rounded-2xl border border-white/80 shadow-xl shadow-slate-900/10"
              />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700">
                  Modular extension stack
                </div>
                <div className="rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-700">
                  Fully themed toolbar controls
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {useCases.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="smooth-surface elevated-card rounded-2xl p-5">
                    <div className="mb-4 inline-flex rounded-xl bg-two/10 p-3 text-two">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1540px] rounded-3xl border border-two/15 bg-white/70 p-6 backdrop-blur sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-two/20 bg-white px-4 py-1 text-sm text-two">
              <Gauge className="h-4 w-4" />
              Ship In 3 Steps
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">A faster editor delivery workflow</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="soft-shine smooth-surface rounded-2xl p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="inline-flex rounded-lg bg-two/10 p-2.5 text-two">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest text-slate-400">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1320px] rounded-3xl border border-two/20 bg-white/85 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur sm:p-8">
          <div className="mb-6 flex items-center gap-2 border-b border-slate-200 pb-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-slate-500">MyEditor.tsx</span>
          </div>
          <h2 className="mb-2 text-3xl font-semibold text-slate-900">Simple by design</h2>
          <p className="mb-6 text-slate-600">
            A minimal setup gets you a fully featured editor.
          </p>
          <div className="overflow-x-auto rounded-xl bg-slate-950">
            <pre className="p-6 text-sm leading-relaxed text-slate-200">
              <code>{`import { Editor, Toolbar, Content } from 'ritext';
import { Document, Text, Paragraph } from 'ritext/extension/base';
import { Bold } from 'ritext/extension/bold';
import { Italic } from 'ritext/extension/italic';
import { Heading } from 'ritext/extension/heading';
import 'ritext/styles.css';

const extensions = [Document, Text, Paragraph, Bold, Italic, Heading];

export default function MyEditor() {
  return (
    <Editor extensions={extensions} className="rounded-xl border">
      <Toolbar className="border-b p-2" />
      <Content />
    </Editor>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1540px] px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">26+ Built-in Extensions</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Pick only what you need and keep your bundle intentional.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {allExtensions.map((ext) => (
            <span
              key={ext}
              className="rounded-full border border-two/20 bg-white/80 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-two/45 hover:text-two"
            >
              {ext}
            </span>
          ))}
        </div>
        <Link
          href="/docs/extensions/overview"
          className="mt-8 inline-flex items-center gap-2 font-medium text-two hover:underline"
        >
          Explore all extensions
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-[1320px] gap-4 sm:grid-cols-3">
          <div className="smooth-surface rounded-2xl p-5 text-left">
            <div className="mb-3 inline-flex rounded-lg bg-two/10 p-2 text-two">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-slate-900">Docs-Ready Components</h3>
            <p className="mt-1.5 text-sm text-slate-600">Clear setup, composable APIs, and docs-first examples.</p>
          </div>
          <div className="smooth-surface rounded-2xl p-5 text-left">
            <div className="mb-3 inline-flex rounded-lg bg-two/10 p-2 text-two">
              <Code2 className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-slate-900">Developer Experience</h3>
            <p className="mt-1.5 text-sm text-slate-600">Predictable extension model with full TypeScript support.</p>
          </div>
          <div className="smooth-surface rounded-2xl p-5 text-left">
            <div className="mb-3 inline-flex rounded-lg bg-two/10 p-2 text-two">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-slate-900">Polished UI Foundation</h3>
            <p className="mt-1.5 text-sm text-slate-600">Glassmorphism surfaces and smooth interactions out of the box.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-8 text-center">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-two/20 bg-white px-4 py-1 text-sm text-two">
              <Sparkles className="h-4 w-4" />
              Interactive FAQ
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Answers before you build</h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((item, idx) => (
              <details
                key={item.question}
                className="smooth-surface group rounded-2xl p-5 open:shadow-md"
                open={idx === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-lg font-semibold text-slate-900">
                  {item.question}
                  <ChevronDown className="h-5 w-5 text-slate-500 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[1320px] rounded-3xl bg-gradient-to-br from-[#6f65ff] via-[#665cff] to-[#746de6] px-8 py-14 text-center text-white">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1 text-xs uppercase tracking-[0.18em] text-white/80">
            <Sparkles className="h-3.5 w-3.5" />
            Ship Faster
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Turn rich text into a product feature</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Read the docs for setup and architecture, then use the playground to test workflows and interactions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-two transition-all hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/playground"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-white/35 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Try Playground
              <Code2 className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">
            Developed by{" "}
            <Link className="font-medium text-white underline-offset-4 hover:underline" href="https://siamahnaf.com">
              Siam Ahnaf
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
