import RichEditor from "@/components/RichEditor";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-20">
      <Image src="/logo-beta.png" width={579} height={499} alt="Logo" className="w-[220px] mx-auto" />
      <p className="text-center">Developed by <Link className="text-teal-500" href="https://siamahnaf.com">Siam Ahnaf</Link></p>
      <p className="text-center mb-10 mt-2 w-[70%] mx-auto bg-gray-100 py-4 px-4 rounded-xl">Ritext is a modern WYSIWYG rich text editor built with Tailwind CSS, powered by Tiptap. It offers a customizable UI and functional layer that lets you design your own editor controls and toolbars with clean, composable React components—no heavy UI, no extra dependencies beyond Tiptap.</p>
      <RichEditor />
      <h4 className="text-center  mt-4 text-3xl font-semibold">Coming <span className="text-teal-500">Soon!</span></h4>
    </div>
  );
};

export default Page;