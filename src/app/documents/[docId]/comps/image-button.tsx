import { useEditorStore } from "@/store/use-editor-store";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageIcon, LinkIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src: src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        onChange(URL.createObjectURL(file));
      }
    };
    input.click();
  };

  // handle image url submit - close dialog and apply image
  const handleImageUrlSubmit = () => {
    onChange(imageUrl || "");
    setImageUrl(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center gap-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 flex flex-col items-stretch  gap-1 ">
            <ImageIcon className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex items-center justify-center gap-3">
          <DropdownMenuItem onClick={onUpload}>
            <Button>
              <UploadIcon className="w-4 h-4" />
              Upload
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <Button variant="outline">
              <SearchIcon className="w-4 h-4" />
              Insert URL
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>Insert Image</DialogHeader>
          <DialogDescription>
            Insert an image from your local machine or by URL.
          </DialogDescription>
          <Input
            value={imageUrl || ""}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleImageUrlSubmit();
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageButton;
