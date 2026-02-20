import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ritext | A WYSIWYG Editor",
  description: "Ritext is a modern WYSIWYG rich text editor built with Tailwind CSS, powered by Tiptap."
}

const features = [
  {
    title: "Headless & Composable",
    description: "Design your own toolbar and editor layout using clean React components. No opinions, no forced UI.",
    icon: "🧩",
  },
  {
    title: "Tailwind CSS Powered",
    description: "Every component is built with Tailwind CSS, making customization as simple as adding a class.",
    icon: "🎨",
  },
  {
    title: "Tiptap Foundation",
    description: "Built on Tiptap v3 — the most popular headless rich text editor framework for React.",
    icon: "⚡",
  },
  {
    title: "20+ Extensions",
    description: "Rich set of pre-built extensions covering text formatting, lists, tables, images, and more.",
    icon: "🔌",
  },
  {
    title: "TypeScript First",
    description: "Full TypeScript support with complete type definitions for all components and extensions.",
    icon: "📘",
  },
  {
    title: "Zero Lock-in",
    description: "No heavy UI frameworks. Just React, Tailwind CSS, and Tiptap — nothing more.",
    icon: "🚀",
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

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <Image
          src="/logos.png"
          width={469}
          height={167}
          alt="Ritext"
          className="w-55 mx-auto mb-8"
        />
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
          A Modern <span className="text-one">WYSIWYG</span> Rich Text Editor
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">
          Ritext is a headless, composable rich text editor for React. Built with Tailwind CSS and powered by Tiptap — design your own toolbar and controls, no heavy UI included.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Link
            href="/docs"
            className="bg-two text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <Link
            href="/playground"
            target="_blank"
            className="bg-one text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Playground
          </Link>
          <Link
            href="https://github.com/siamahnaf/ritext"
            target="_blank"
            className="border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            GitHub
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          Developed by{" "}
          <Link className="text-two font-medium hover:underline" href="https://siamahnaf.com">
            Siam Ahnaf
          </Link>
        </p>
      </section>

      {/* Install snippet */}
      <section className="bg-two py-6 text-center">
        <p className="text-white/60 text-xs mb-1 uppercase tracking-wider">Install via npm</p>
        <code className="text-three text-lg font-mono">npm install ritext</code>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Everything you need in a rich text editor
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Powerful features with a simple, composable API
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 border border-gray-100 rounded-xl hover:border-two/30 hover:shadow-sm transition-all bg-white"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section className="px-6 py-16" style={{ background: "#f0edf8" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Simple by design
          </h2>
          <p className="text-gray-500 text-center mb-10">
            A minimal setup gets you a fully featured editor
          </p>
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-400 text-xs ml-2">MyEditor.tsx</span>
            </div>
            <pre className="p-6 text-sm text-gray-300 overflow-x-auto leading-relaxed">
              <code>{`import { Editor, Toolbar, Content } from 'ritext';
import { Document, Text, Paragraph } from 'ritext/extension/base';
import { Bold } from 'ritext/extension/bold';
import { Italic } from 'ritext/extension/italic';
import { Heading } from 'ritext/extension/heading';
import 'ritext/styles.css';

const extensions = [Document, Text, Paragraph, Bold, Italic, Heading];

export default function MyEditor() {
  return (
    <Editor
      extensions={extensions}
      className="border border-gray-200 rounded-xl"
    >
      <Toolbar className="p-2 border-b" />
      <Content />
    </Editor>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Extensions Showcase */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">26+ Built-in Extensions</h2>
        <p className="text-gray-500 mb-8">Pick only what you need — no bloat</p>
        <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
          {allExtensions.map((ext) => (
            <span
              key={ext}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-two/40 hover:text-two transition-colors cursor-default"
            >
              {ext}
            </span>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/docs/extensions/overview"
            className="text-two font-medium hover:underline text-sm"
          >
            View all extensions →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-two text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to build?</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Read the docs to get started, or jump straight into the playground to try it live.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/docs"
            className="bg-white text-two px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Read the Docs
          </Link>
          <Link
            href="/playground"
            target="_blank"
            className="bg-one text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Try Playground
          </Link>
        </div>
      </section>

    </div>
  );
}
