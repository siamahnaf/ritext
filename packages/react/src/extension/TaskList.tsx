import { TaskList as TiptapTaskList, type TaskListOptions, TaskItem } from "@tiptap/extension-list";
import type { Node } from "@tiptap/react";
import { TaskListIcon } from "../lib/icons";

//Components
import ButtonComponent from "../lib/components/ButtonComponent";
import type { ExtButtonOptions } from "../lib/types/tiptap-ext.type";

//Types
type ExtTaskListOptions = ExtButtonOptions<TaskListOptions>;

export const TaskList: Node<ExtTaskListOptions> = TiptapTaskList.extend<ExtTaskListOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                class: "task-list",
            },
            itemTypeName: "taskItem",
            component: ({ editor, options, buttonClassName }) => {
                return (
                    <ButtonComponent
                        className={options.className}
                        icon={options.icon}
                        style={options.style}
                        activeClassName={options.activeClassName}
                        tooltip={options.tooltip}
                        tooltipClassName={options.tooltipClassName}
                        tooltipPlacement={options.tooltipPlacement}
                        _internalIcon={<TaskListIcon />}
                        _extName="taskList"
                        _onToggle={() => editor.chain().focus().toggleTaskList().run()}
                        _interShortcut={{ win: "Ctrl + ⇧ +9", mac: "⌘ + ⇧ + 9" }}
                        _tooltipContent="Task List"
                        _buttonClassName={buttonClassName}
                    />
                )
            }
        }
    },
    addExtensions() {
        return [TaskItem]
    }
});