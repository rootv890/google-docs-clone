import { useEditorStore } from "@/store/use-editor-store";
import {
  type ColorResult,
  CirclePicker,
  CompactPicker,
  SketchPicker,
} from "react-color";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").color || "inherit";
  const onChange = (color: ColorResult) => {
    editor?.commands.setColor(color.hex);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-1 flex flex-col items-stretch  gap-1 w"
          aria-label="Text Color"
        >
          <span className="w-4 h-4 ">Aa</span>
          <div className="h-1 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TextColorButton;
