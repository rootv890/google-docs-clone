import { useEditorStore } from "@/store/use-editor-store";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HighlighterIcon, LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState<string | null>(null);

  const onChange = (url: string) => {
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <div className="flex items-center gap-2 ">
      <DropdownMenu
        onOpenChange={(open) => {
          if (!open) {
            setValue(null);
          }
          setValue(editor?.getAttributes("link").href || null);
        }}
      >
        <DropdownMenuTrigger asChild>
          <button className="p-1 flex flex-col items-stretch  gap-1 ">
            <LinkIcon className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex items-center justify-center">
          <Input
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onChange(value || "");
            }}
          />
          <Button variant="outline" onClick={() => onChange(value || "")}>
            Apply
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LinkButton;
