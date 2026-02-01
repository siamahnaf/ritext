"use client"
import { useEffect, useState, useRef } from "react";
import type { Editor } from "@tiptap/react";
import type { Mark } from '@tiptap/pm/model';
import InputComponent from "./InputComponent";
import CheckboxComponent from "./CheckboxComponent";

//Interface
interface Props {
    editor: Editor;
    open?: boolean;
    onClose?: () => void;
}
const LinkComponent = ({ editor, onClose, open }: Props) => {
    //State
    const [form, setForm] = useState<{ text: string, link: string, target: string }>({
        text: "",
        link: "",
        target: "_self"
    });

    const textInputRef = useRef<HTMLInputElement>(null);
    const linkInputRef = useRef<HTMLInputElement>(null);

    //Handler
    const onApply = () => {
        const { link, text, target } = form;
        if (!link) {
            editor.chain().extendMarkRange("link").unsetLink().run();
            return;
        }

        if (editor.isActive("link")) {
            editor.chain().extendMarkRange("link").run();
        }

        const { from } = editor.state.selection;
        const insertedLength = text.length;

        editor
            .chain()
            .insertContent({
                type: "text",
                text,
                marks: [
                    {
                        type: "link",
                        attrs: {
                            href: /^https?:\/\//i.test(link) ? link : `https://${link}`,
                            target: target
                        },
                    },
                ],
            })
            .setLink({ href: link })
            .setTextSelection({ from, to: from + insertedLength })
            .focus()
            .run();
        onClose?.();
    }

    //Effects
    useEffect(() => {
        const updateForm = () => {
            const { from, to, empty } = editor.state.selection;

            let text = "";
            let link = "";
            let target = "_self";

            const node = editor.state.doc.nodeAt(from);

            if (node) {
                const linkMark = node.marks.find((mark: Mark) => mark.type.name === 'link');
                if (linkMark) {
                    link = linkMark.attrs.href || '';
                    target = linkMark.attrs.target;
                    if (empty) {
                        text = node.text || '';
                    } else {
                        text = editor.state.doc.textBetween(from, to, ' ');
                    }
                } else {
                    text = editor.state.doc.textBetween(from, to, ' ');
                }
            }
            if (!node) {
                text = editor.state.doc.textBetween(from, to, ' ');
            }

            setForm({ link, text, target });

            if (open) {
                if (text === '') {
                    textInputRef.current?.focus();
                } else {
                    linkInputRef.current?.focus();
                }
            }
        };

        updateForm();

        editor.on('selectionUpdate', updateForm);

        return () => {
            editor.off('selectionUpdate', updateForm);
        };
    }, [editor, open]);

    return (
        <div>
            <InputComponent
                id="text"
                label="Text"
                value={form.text}
                onChange={(e) => setForm(prev => ({ ...prev, text: e.target.value }))}
                ref={textInputRef}
            />
            <InputComponent
                id="link"
                label="Link"
                value={form.link}
                onChange={(e) => setForm(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://yourlink.com"
                ref={linkInputRef}
                containerClassName="mt-3 mb-2.5"
            />
            <CheckboxComponent
                id="openNewTab"
                checked={form.target === "_blank"}
                onChange={() => setForm(prev => ({ ...prev, target: prev.target === "_self" ? "_blank" : "_self" }))}
                label="Open in a new tab?"
                bottomSpace={false}
            />
            <button type="button" className="bg-gray-800 text-white w-full py-1.5 rounded-lg mt-5" onClick={onApply}>
                Apply Now
            </button>
        </div>
    );
};

export default LinkComponent;