"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Text } from "@tiptap/extension-text";
import { useEffect, useState } from "react";
import EditorMenubar from "./EditorMenubar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import TagInput from "./TagInput";
import { useLocalStorage } from "usehooks-ts";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import AIComposeButton from "./AIComposeButton";
import { readStreamableValue } from "ai/rsc";
import { generate } from "./action";
type EmailEditorProps = {
  toValues: { label: string; value: string }[];
  ccValues: { label: string; value: string }[];

  subject: string;
  setSubject: (subject: string) => void;
  to: string[];
  handleSend: (value: string) => void;
  isSending: boolean;

  onToChange: (values: { label: string; value: string }[]) => void;
  onCcChange: (values: { label: string; value: string }[]) => void;

  defaultToolbarExpand?: boolean;
};
const EmailEditor = ({
  toValues,
  ccValues,
  subject,
  setSubject,
  to,
  handleSend,
  isSending,
  onToChange,
  onCcChange,
  defaultToolbarExpand,
}: EmailEditorProps) => {
  const [accountId] = useLocalStorage("accountId", "");
  const { data: suggestions } = api.account.getEmailSuggestions.useQuery(
    { accountId: accountId, query: "" },
    { enabled: !!accountId },
  );

  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [generation, setGeneration] = useState("");

  const aiGenerate = async (prompt: string) => {
    const { output } = await generate(prompt);

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setGeneration(delta);
      }
    }
  };
  const CustomText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Meta-j": () => {
          aiGenerate(this.editor.getText());
          return true;
        },
      };
    },
  });
  const editor = useEditor({
    autofocus: false,
    extensions: [StarterKit, CustomText],
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
  });

  const onGenerate = (token: string) => {
    console.log(token);
    editor?.commands?.insertContent(token);
  };
  useEffect(() => {
    if (!generation || !editor) return;
    editor.commands.insertContent(generation);
  }, [generation, editor]);

  if (!editor) return null;
  return (
    <div className="h-full">
      <div className="flex border-b p-4 py-2">
        <EditorMenubar editor={editor} />
      </div>

      <div className="prose w-full px-4">
        {expanded && (
          <>
            <TagInput
              suggestions={suggestions?.map((s) => s.address) || []}
              value={toValues}
              placeholder="Add tags"
              label="To"
              onChange={onToChange}
            />
            <TagInput
              suggestions={suggestions?.map((s) => s.address) || []}
              value={ccValues}
              placeholder="Add tags"
              label="Cc"
              onChange={onCcChange}
            />
            <Input
              id="subject"
              className="w-full"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </>
        )}
        <div className="my-2 flex items-center gap-2">
          <div
            className="cursor-pointer"
            onClick={() => setExpanded((e) => !e)}
          >
            <span className="font-medium text-green-600">Draft </span>
            <span>to {to.join(", ")}</span>
          </div>
          <AIComposeButton isComposing={false} onGenerate={onGenerate} />
        </div>
        <EditorContent className="border p-2" editor={editor} value={value} />
      </div>
      <Separator />
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm">
          Tip: Press{" "}
          <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800">
            Cmd + J
          </kbd>{" "}
          for AI autocomplete
        </span>
        <Button
          onClick={async () => {
            editor?.commands.clearContent();
            await handleSend(value);
          }}
          disabled={isSending}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default EmailEditor;
