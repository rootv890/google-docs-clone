import { useEditorStore } from "@/store/use-editor-store";
import { CirclePicker, type ColorResult } from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import { HighlighterIcon } from "lucide-react";

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  const value = editor?.getAttributes("highlight").color || "inherit";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-1 flex flex-col items-stretch  gap-1 "
          aria-label="Text Color"
        >
          <span
            className=" p-1 rounded-sm flex items-center justify-center"
            style={{ backgroundColor: value }}
          >
            <HighlighterIcon className="w-4 h-4" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <CirclePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TextColorButton;
