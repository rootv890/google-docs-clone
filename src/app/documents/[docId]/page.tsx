import React from "react";
import Editor from "./editor";

interface EditorPageProps {
  params: Promise<{
    docId: string;
  }>;
}

const EditorPage = async ({ params }: EditorPageProps) => {
  const { docId } = await params;

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-4 print:p-0 overflow-x-auto print:overflow-visible print:bg-white">
      <Editor docId={docId} />
    </div>
  );
};

export default EditorPage;