import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ListCheckIcon, ListIcon, ListOrderedIcon } from "lucide-react";
import React from "react";

const ListButton = () => {
  const { editor } = useEditorStore();
  const lists: {
    label: string;
    value: "bullet" | "ordered" | "task";
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
  }[] = [
    {
      label: "Bullet",
      value: "bullet",
      icon: <ListIcon className="text-black" />,
      isActive: editor?.isActive("bulletList") ?? false,
      onClick: () => {
        editor?.chain().focus().toggleBulletList().run();
      },
    },
    {
      label: "Ordered",
      value: "ordered",
      icon: <ListOrderedIcon className="text-black" />,
      isActive: editor?.isActive("orderedList") ?? false,
      onClick: () => {
        editor?.chain().focus().toggleOrderedList().run();
      },
    },
    {
      label: "Task",
      value: "task",
      icon: <ListCheckIcon className="text-black" />,
      isActive: editor?.isActive("taskList") ?? false,
      onClick: () => {
        editor?.chain().focus().toggleTaskList().run();
      },
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {lists.map((list) => (
        <Button
          variant={"ghost"}
          className={cn(
            "toolbar-button",
            list.isActive && "bg-toolbar-active text-toolbar-foreground"
          )}
          key={list.value}
          onClick={list.onClick}
        >
          <span className="sr-only">{list.label}</span>
          <span className="text-background">{list.icon}</span>
        </Button>
      ))}
    </div>
  );
};

export default ListButton;
