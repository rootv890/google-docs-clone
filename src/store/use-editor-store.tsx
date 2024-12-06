import { type Editor } from "@tiptap/react";
import { create } from "zustand";

interface EditorStoreProps {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorStoreProps>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
