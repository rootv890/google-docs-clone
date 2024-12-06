"use client";

/* Document Editor for the document */
import { useEditor, EditorContent } from "@tiptap/react";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ResizeImage from "tiptap-extension-resize-image";
// import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";

const Editor = ({ docId }: { docId: string }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none bg-background  print:bg-white print:border-none px-4 print:p-0 overflow-x-auto print:overflow-visible selection:bg-primary selection:text-primary-foreground min-h-[1054px] w-[816px] py-10 pr-14 border border-muted",
      },
    },
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Image,
      ResizeImage,
    ],
    content: /* html */ `

      <p>${docId}</p>
      <img src="https://placehold.co/800x400/6A00F5/white" />


      `,
  });
  return (
    <section className="size-full bg-card print:bg-white print:border-none px-4 print:p-0 overflow-x-auto print:overflow-visible">
      <div className="min-w-max w-[800px] py-4 print:py-0 print:w-full mx-auto flex flex-col items-center justify-center print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </section>
  );
};

export default Editor;
