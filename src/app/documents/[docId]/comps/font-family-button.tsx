import { useEditorStore } from "@/store/use-editor-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";
import { cn } from "@/lib/utils";

const FontFamilyButton = () => {
  const Fonts: { label: string; value: string }[] = [
    {
      label: "Helvetica",
      value: "Helvetica",
    },
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Calibri",
      value: "Calibri",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
    {
      label: "Roboto",
      value: "Roboto",
    },
    {
      label: "Open Sans",
      value: "Open Sans",
    },
    {
      label: "Lato",
      value: "Lato",
    },
    {
      label: "Montserrat",
      value: "Montserrat",
    },
    {
      label: "Source Sans Pro",
      value: "Source Sans Pro",
    },
  ];
  const { editor } = useEditorStore();
  return (
    <div className="flex items-center gap-2 w-32 max-w-32">
      <Select
        // set helvetica as default
        defaultValue={Fonts[0].value}
        onValueChange={(value) => {
          editor?.chain().focus().setFontFamily(value).run();
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
          {Fonts.map((font) => (
            <SelectItem
              onFocus={() => {
                editor?.chain().focus().setFontFamily(font.value).run();
              }}
              className={cn(
                "transition-all ",
                // background color to active style
                editor?.getAttributes("fontFamily").value === font.value
                  ? "bg-primary text-primary-foreground"
                  : ""
              )}
              key={font.value}
              value={font.value}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontFamilyButton;
