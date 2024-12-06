import { useRef } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, Share2, Instagram, Linkedin } from "lucide-react";
import type { Template } from "@/lib/templates";

interface ImageActionsProps {
  editorRef: React.RefObject<HTMLDivElement>;
  template: Template;
}

export function ImageActions({ editorRef, template }: ImageActionsProps) {
  const handleExport = async () => {
    if (!editorRef.current) return;

    try {
      const dataUrl = await toPng(editorRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });
      
      const link = document.createElement("a");
      link.download = `job-post-${template.name.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success("Image downloaded successfully!");
    } catch (err) {
      toast.error("Failed to export image. Please try again.");
    }
  };

  const handleShare = async () => {
    if (!editorRef.current) return;

    try {
      const dataUrl = await toPng(editorRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });

      // Convert base64 to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      if (template.name === "Instagram Story") {
        // Check if Instagram sharing is available
        if (navigator.share) {
          await navigator.share({
            files: [new File([blob], 'story.png', { type: 'image/png' })],
          });
        } else {
          toast.error("Instagram sharing is not supported on this device");
        }
      } else if (template.name === "LinkedIn Post") {
        window.open('https://www.linkedin.com/sharing/share-offsite/', '_blank');
      } else {
        // Default sharing
        if (navigator.share) {
          await navigator.share({
            files: [new File([blob], 'image.png', { type: 'image/png' })],
          });
        } else {
          toast.error("Sharing is not supported on this device");
        }
      }
    } catch (err) {
      toast.error("Failed to share image. Please try again.");
    }
  };

  return (
    <>
      <Button 
        onClick={handleExport} 
        className="rounded-full bg-primary/90 hover:bg-primary/95 text-primary-foreground shadow-sm px-3"
        size="sm"
      >
        <Download className="w-4 h-4 mr-1.5" />
        Export
      </Button>

      {template.name === 'instagram-story' ? (
        <Button
          onClick={handleShare}
          className="rounded-full bg-primary/90 hover:bg-primary/95 text-primary-foreground shadow-sm px-3"
          size="sm"
        >
          <Instagram className="w-4 h-4 mr-1.5" />
          Post on Instagram
        </Button>
      ) : template.name === 'linkedin-post' ? (
        <Button
          onClick={handleShare}
          className="rounded-full bg-primary/90 hover:bg-primary/95 text-primary-foreground shadow-sm px-3"
          size="sm"
        >
          <Linkedin className="w-4 h-4 mr-1.5" />
          Post on LinkedIn
        </Button>
      ) : (
        <Button
          onClick={handleShare}
          className="rounded-full bg-primary/90 hover:bg-primary/95 text-primary-foreground shadow-sm px-3"
          size="sm"
        >
          <Share2 className="w-4 h-4 mr-1.5" />
          Share
        </Button>
      )}
    </>
  );
}