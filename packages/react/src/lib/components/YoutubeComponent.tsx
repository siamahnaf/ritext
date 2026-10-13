"use client"
import { useState, type FormEvent } from "react";
import type { Editor } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";
import { isValidYoutubeUrl, type YoutubeOptions } from "@tiptap/extension-youtube";
import InputComponent from "./InputComponent";
import CheckboxComponent from "./CheckboxComponent";
import { AlignLeft, AlignCenter, AlignRight } from "../icons";

//Alignments
const alignments = [
    { value: "left", icon: <AlignLeft /> },
    { value: "center", icon: <AlignCenter /> },
    { value: "right", icon: <AlignRight /> },
];

//Interface
interface Props {
    editor: Editor;
    options: Pick<YoutubeOptions, "width" | "height" | "controls" | "autoplay" | "loop">;
    open?: boolean;
    onClose?: () => void;
}

const YoutubeComponent = ({ editor, options, onClose }: Props) => {
    const { width, height, controls, autoplay, loop } = options;

    //Selected Video
    const [node] = useState(() => {
        const { selection } = editor.state;
        return selection instanceof NodeSelection && selection.node.type.name === "youtube" ? selection.node : null;
    });
    const isEdit = !!node;

    //State
    const [form, setForm] = useState({
        url: node?.attrs.src ?? "",
        width: String(node?.attrs.width ?? width),
        height: String(node?.attrs.height ?? height),
        controls: node?.attrs.controls ?? controls,
        autoplay: node?.attrs.autoplay ?? autoplay,
        loop: node?.attrs.loop ?? loop,
        textAlign: node?.attrs.textAlign ?? "left",
    });
    const [error, setError] = useState<string>("");

    //Handler
    const onNumberInput = (e: FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
    };

    const onApply = () => {
        const src = form.url.trim();
        if (!isValidYoutubeUrl(src)) {
            setError("Please enter a valid YouTube URL");
            return;
        }

        const attrs = {
            src,
            width: Math.max(320, parseInt(form.width, 10)) || width,
            height: Math.max(180, parseInt(form.height, 10)) || height,
            controls: form.controls,
            autoplay: form.autoplay,
            loop: form.loop,
            textAlign: form.textAlign,
        };

        if (isEdit) {
            editor.chain().focus().updateAttributes("youtube", attrs).run();
        } else {
            editor.chain().focus().insertContent({ type: "youtube", attrs }).run();
        }
        onClose?.();
    };

    return (
        <div>
            <InputComponent
                id="youtubeUrl"
                label="URL"
                placeholder="https://www.youtube.com/watch?v=..."
                value={form.url}
                onChange={(e) => { setForm(prev => ({ ...prev, url: e.target.value })); setError(""); }}
            />
            {error && <p className="ritext:mt-1 ritext:text-xs ritext:text-red-500">{error}</p>}
            <div className="ritext:grid ritext:grid-cols-2 ritext:gap-2 ritext:mt-3 ritext:mb-3.5">
                <InputComponent
                    id="youtubeWidth"
                    label="Width"
                    inputMode="numeric"
                    value={form.width}
                    onInput={onNumberInput}
                    onChange={(e) => setForm(prev => ({ ...prev, width: e.target.value }))}
                />
                <InputComponent
                    id="youtubeHeight"
                    label="Height"
                    inputMode="numeric"
                    value={form.height}
                    onInput={onNumberInput}
                    onChange={(e) => setForm(prev => ({ ...prev, height: e.target.value }))}
                />
            </div>
            <div className="ritext:mb-3.5">
                <p className="ritext:mb-1 ritext:text-gray-700 ritext:text-base ritext:font-medium">Align</p>
                <div className="ritext:flex ritext:gap-x-1.5">
                    {alignments.map((item) => (
                        <button
                            type="button"
                            key={item.value}
                            onClick={() => setForm(prev => ({ ...prev, textAlign: item.value }))}
                            className={`ritext:flex ritext:flex-1 ritext:justify-center ritext:p-1.5 ritext:rounded-md ritext:border ritext:border-gray-200 ${form.textAlign === item.value ? "ritext:bg-gray-200/60" : "ritext:hover:bg-gray-100"}`}
                        >
                            {item.icon}
                        </button>
                    ))}
                </div>
            </div>
            <div className="ritext:space-y-2">
                <CheckboxComponent
                    id="youtubeControls"
                    checked={form.controls}
                    onChange={(e) => setForm(prev => ({ ...prev, controls: e }))}
                    label="Show controls"
                    bottomSpace={false}
                />
                <CheckboxComponent
                    id="youtubeAutoplay"
                    checked={form.autoplay}
                    onChange={(e) => setForm(prev => ({ ...prev, autoplay: e }))}
                    label="Autoplay"
                    bottomSpace={false}
                />
                <CheckboxComponent
                    id="youtubeLoop"
                    checked={form.loop}
                    onChange={(e) => setForm(prev => ({ ...prev, loop: e }))}
                    label="Loop"
                    bottomSpace={false}
                />
            </div>
            <button type="button" className="ritext:bg-gray-800 ritext:text-white ritext:w-full ritext:py-1.5 ritext:rounded-lg ritext:mt-5" onClick={onApply}>
                {isEdit ? "Update Video" : "Insert Video"}
            </button>
        </div>
    );
};

export default YoutubeComponent;
