import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ritext | A modern WYSIWYG rich text editor",
  description: "Ritext is a modern WYSIWYG rich text editor built with Tailwind CSS, powered by Tiptap. It offers a customizable UI and functional layer that lets you design your own editor controls and toolbars with clean, composable React components—no heavy UI, no extra dependencies beyond Tiptap.",
  keywords: ["ritext", "tiptap", "tiptap-react", "react", "rich-text-editor", "wysiwyg", "headless-editor", "text-editor", "tailwindcss", "tailwind", "editor-kit", "editor-toolbar", "editor-controls", "markdown-editor", "content-editor", "react-editor", "headless-ui", "functional-editor", "customizable-editor", "react-components", "frontend-editor"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
