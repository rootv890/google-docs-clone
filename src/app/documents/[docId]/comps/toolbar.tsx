"use client";
import {
  BoldIcon,
  Italic,
  ListTodoIcon,
  LucideBold,
  LucideIcon,
  MessageCircleIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheck2Icon,
  Strikethrough,
  Underline,
  Undo2Icon,
} from "lucide-react";
import React from "react";
import ToolbarButton from "./toolbar-button";
import { Bold } from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";

const Toolbar = () => {
  const { editor } = useEditorStore();

  const toolSections: {
    label: string;
    icon: LucideIcon;
    isActive?: boolean;
    onClick: () => void;
  }[][] = [
    // Actions
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => {
          editor?.chain().focus().undo().run();
        },
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => {
          editor?.chain().focus().redo().run();
        },
      },

      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => {
          window.print();
        },
      },
      {
        label: "Spell Check",
        icon: SpellCheck2Icon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellCheck");

          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
      },
    ],
    // Formatting
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        icon: Italic,
        isActive: editor?.isActive("italic"),
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "Underline",
        icon: Underline,
        isActive: editor?.isActive("underline"),
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
      {
        label: "Strikethrough",
        icon: Strikethrough,
        isActive: editor?.isActive("strike"),
        onClick: () => {
          editor?.chain().focus().toggleStrike().run();
        },
      },

      {
        label: "Comment",
        icon: MessageCircleIcon,
        onClick: () => {
          console.log("Comment");
        },
      },

      {
        label: "Todo List",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => {
          editor?.chain().focus().toggleTaskList().run();
        },
      },

      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => {
          editor?.chain().focus().unsetAllMarks().run();
        },
      },
    ],
  ];

  return (
    <div
      className="flex items-center  min-h-10 overflow-x-auto p-3 py-0.5 rounded-full bg-toolbar-background w-full  gap-4
    "
    >
      {/* Actions */}
      {toolSections[0].map((tool) => (
        <ToolbarButton key={tool.label} {...tool} />
      ))}

      <Separator />

      {/* Formatting */}
      {toolSections[1].map((tool) => (
        <ToolbarButton key={tool.label} {...tool} />
      ))}
    </div>
  );
};

export default Toolbar;
