import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const buttonClass =
  "size-7 flex items-center justify-center rounded-sm hover:bg-toolbar-hover shrink-0 ";

const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const [fontSize, setFontSize] = useState("16");
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const updateFontSizeFromEditor = () => {
      const newFontSize = editor.getAttributes("textStyle")?.fontSize || "16px";
      setFontSize(newFontSize.replace("px", ""));
    };

    editor.on("transaction", updateFontSizeFromEditor);
    return () => editor.off("transaction", updateFontSizeFromEditor);
  }, [editor]);

  const handleIncrement = () => {
    const newSize = parseInt(inputValue) + 1;
    setInputValue(newSize.toString());
    updateFontSize(newSize.toString());
  };

  const handleDecrement = () => {
    const newSize = parseInt(inputValue) - 1;
    if (newSize > 0) {
      setInputValue(newSize.toString());
      updateFontSize(newSize.toString());
    }
  };

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateFontSize(inputValue);
      setIsEditing(false);
      setInputValue(fontSize);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center">
      <button onClick={handleDecrement} className={buttonClass}>
        <MinusIcon />
      </button>
      {isEditing ? (
        <Input
          className="w-14"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => updateFontSize(inputValue)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setInputValue(fontSize);
          }}
          className="text-sm w-14 bg-transparent"
        >
          {fontSize}
        </button>
      )}
      <button onClick={handleIncrement} className={buttonClass}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default FontSizeButton;
