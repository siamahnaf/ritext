import RichEditor from "@/components/home-page/RichEditor";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
    return (
        <div className="p-10">
            <Image src="/logos.png" width={469} height={167} alt="Logo" className="w-[220px] mx-auto" />
            <p className="text-center">Developed by <Link className="text-one" href="https://siamahnaf.com">Siam Ahnaf</Link></p>
            <div className="mt-6">
                <RichEditor />
            </div>
            <div className="mt-8 text-center">
                <Link href="/" target="_blank" className="bg-one text-white px-3 py-1.5 rounded-md">
                    Back to Home Page
                </Link>
            </div>
        </div>
    );
};

export default Page;