import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import React from "react";

const AlignButton = () => {
  const { editor } = useEditorStore();
  const alignments: {
    label: string;
    value: "left" | "center" | "right" | "justify";
    icon: React.ReactNode;
  }[] = [
    {
      label: "Left",
      icon: <AlignLeftIcon className="text-black" />,
      value: "left",
    },
    {
      label: "Center",
      icon: <AlignCenterIcon className="text-black" />,
      value: "center",
    },
    {
      label: "Right",
      icon: <AlignRightIcon className="text-black" />,
      value: "right",
    },
    {
      label: "Justify",
      icon: <AlignJustifyIcon className="text-black" />,
      value: "justify",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {alignments.map((alignment) => (
        <Button
          variant={"ghost"}
          className={cn(
            "toolbar-button",
            editor?.isActive({
              textAlign: alignment.value,
            }) && "bg-toolbar-active text-toolbar-foreground"
          )}
          key={alignment.value}
          onClick={() =>
            editor?.chain().focus().setTextAlign(alignment.value).run()
          }
        >
          <span className="sr-only">{alignment.label}</span>
          <span className="text-background">{alignment.icon}</span>
        </Button>
      ))}
    </div>
  );
};

export default AlignButton;
