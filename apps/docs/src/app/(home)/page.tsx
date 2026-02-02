import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <div className="p-20">
        <Image src="/logo.png" width={579} height={499} alt="Logo" className="w-[220px] mx-auto" />
        <p className="text-center">Developed by <Link className="text-teal-500" href="https://siamahnaf.com">Siam Ahnaf</Link></p>
        <p className="text-center mt-2 w-[70%] mx-auto bg-gray-100 py-4 px-4 rounded-xl">Ritext is a modern WYSIWYG rich text editor built with Tailwind CSS, powered by Tiptap. It offers a customizable UI and functional layer that lets you design your own editor controls and toolbars with clean, composable React components—no heavy UI, no extra dependencies beyond Tiptap.</p>
        <div className="mb-10 mt-5 space-x-5">
          <Link href="/docs" className="bg-teal-500 text-white px-3 py-1.5 rounded-md">
            Documentation
          </Link>
          <Link href="/playground" target="_blank" className="bg-teal-500 text-white px-3 py-1.5 rounded-md">
            Playground
          </Link>
        </div>
      </div>
    </div>
  );
}
