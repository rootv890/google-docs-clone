"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface ToolbarButtonProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick: () => void;
}

const ToolbarButton = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: ToolbarButtonProps) => {
  return (
    <Button
      className={cn(
        "text-sm h-7 min-w-7 aspect-square flex items-center  justify-center rounded-md p-4 bg-transparen shadow-none  hover:bg-toolbar-hover ",
        isActive && "bg-toolbar-active text-toolbar-foreground"
      )}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      <Icon
        className={cn(
          "!size-5 m-1 text-toolbar-foreground font-extrabold ",
          isActive && ""
        )}
      />
    </Button>
  );
};

export default ToolbarButton;
