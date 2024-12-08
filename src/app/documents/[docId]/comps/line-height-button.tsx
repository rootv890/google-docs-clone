import React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const LineHeightDropdown = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
    { label: "Tertiary", value: "2.5" },
  ];

  const currentLineHeight =
    editor?.getAttributes("lineHeight")?.lineHeight || "normal";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className=" shrink-0">
          {lineHeights.find((lh) => lh.value === currentLineHeight)?.label ||
            "Line Height"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        {lineHeights.map((lh) => (
          <DropdownMenuItem
            key={lh.value}
            onClick={() =>
              editor?.chain().focus().setLineHeight(lh.value).run()
            }
            className={cn(
              "cursor-pointer",
              currentLineHeight === lh.value &&
                "bg-toolbar-active text-toolbar-foreground"
            )}
          >
            {lh.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LineHeightDropdown;
