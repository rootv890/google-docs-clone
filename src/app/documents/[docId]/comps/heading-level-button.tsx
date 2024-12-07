import { useEditorStore } from "@/store/use-editor-store";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type Level } from "@tiptap/extension-heading";

const TextStyleButton = () => {
  const { editor } = useEditorStore();

  const textStyles: { label: string; value: string; fontSize: string }[] = [
    { label: "Normal", value: "0", fontSize: "16px" },
    { label: "Caption", value: "caption", fontSize: "14px" },
    { label: "Heading 1", value: "1", fontSize: "24px" },
    { label: "Heading 2", value: "2", fontSize: "20px" },
    { label: "Heading 3", value: "3", fontSize: "18px" },
    { label: "Heading 4", value: "4", fontSize: "16px" },
    { label: "Heading 5", value: "5", fontSize: "14px" },
    { label: "Heading 6", value: "6", fontSize: "12px" },
  ];

  return (
    <div className="flex items-center gap-2 max-w-32 w-32">
      <Select
        onValueChange={(value) => {
          if (value === "0") {
            editor?.chain().focus().setParagraph().run();
          } else if (value === "caption") {
            // editor?.chain().focus().setNode("caption").run(); // Ensure "caption" is a defined node in your editor.
          } else {
            editor
              ?.chain()
              .focus()
              .toggleHeading({ level: Number(value) as Level })
              .run();
          }
        }}
        defaultValue={textStyles[0].value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Heading Level" />
        </SelectTrigger>
        <SelectContent>
          {textStyles.map((style) => (
            <SelectItem
              key={style.value}
              value={style.value}
              className={cn(
                "transition-all",
                editor?.isActive("heading", {
                  level: parseInt(style.value, 10),
                })
                  ? "bg-primary text-primary-foreground"
                  : ""
              )}
              style={{ fontSize: style.fontSize }}
            >
              {style.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TextStyleButton;
