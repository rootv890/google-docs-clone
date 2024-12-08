"use client";

/* Document Editor for the document */
import {
  useEditor,
  EditorContent,
  type Editor as EditorType,
} from "@tiptap/react";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ResizeImage from "tiptap-extension-resize-image";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

// import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import { useEditorStore } from "@/store/use-editor-store";
import { useCallback } from "react";
import { debounce } from "lodash";
import { FontSize } from "@/extensions/FontSize";
import { LineHeight } from "@/extensions/LineHeight";

const Editor = ({ docId }: { docId: string }) => {
  const { setEditor } = useEditorStore();

  /* Handle editor update */
  const handleEditorUpdate = useCallback(
    ({ editor }: { editor: EditorType }) => {
      // calculate seconds since last update
      console.log("Updated!");
      setEditor(editor);
    },
    [setEditor]
  );

  const editor = useEditor({
    onCreate: handleEditorUpdate,
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: debounce(handleEditorUpdate, 2000),
    onSelectionUpdate: debounce(handleEditorUpdate, 2000),
    onTransaction: debounce(handleEditorUpdate, 2000),
    onBlur: debounce(handleEditorUpdate, 2000),
    onFocus: debounce(handleEditorUpdate, 2000),
    onContentError: debounce(handleEditorUpdate, 2000),

    editable: true,

    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none bg-document-background  print:bg-white print:border-none px-4 print:p-0 overflow-x-auto print:overflow-visible selection:bg-primary   selection:text-primary-foreground min-h-[1054px] w-[816px] py-10 pr-14 border border-muted",
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
      Underline,
      TextStyle,
      FontFamily,
      Heading,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "list"],
        alignments: ["left", "center", "right", "justify"],
      }),
      FontSize,
      LineHeight.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
    ],
    content: /* html */ `

      ${docId}
      <p>hello</p>
      <p>world</p>
      <p>test</p>



      `,
  });
  return (
    <section className="size-full bg-background print:bg-white print:border-none px-4 print:p-0 overflow-x-auto print:overflow-visible">
      <div className="min-w-max bg-inherit  w-[800px] py-4 print:py-0 print:w-full mx-auto flex flex-col items-center justify-center print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </section>
  );
};

export default Editor;
