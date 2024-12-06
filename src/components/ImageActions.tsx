import { useRef } from "react";
import type { Template } from "@/lib/templates";
import { ExportButton } from "./actions/ExportButton";
import { ShareButton } from "./actions/ShareButton";
import { LicenseButton } from "./actions/LicenseButton";

interface ImageActionsProps {
  editorRef: React.RefObject<HTMLDivElement>;
  template: Template;
  onRateLimit: () => void;
}

export function ImageActions({ editorRef, template, onRateLimit }: ImageActionsProps) {
  const hasMotion = editorRef.current?.querySelector('.gradient-motion');

  return (
    <>
      <ExportButton 
        editorRef={editorRef}
        template={template}
        onRateLimit={onRateLimit}
        hasMotion={!!hasMotion}
      />
      <ShareButton 
        editorRef={editorRef}
        template={template}
        onRateLimit={onRateLimit}
      />
      <LicenseButton />
    </>
  );
}