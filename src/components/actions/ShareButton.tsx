import { Button } from "@/components/ui/button";
import { Share2, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { checkExportLimit } from "@/lib/rateLimit";
import GIF from 'gif.js';
import type { Template } from "@/lib/templates";

interface ShareButtonProps {
  editorRef: React.RefObject<HTMLDivElement>;
  template: Template;
  onRateLimit: () => void;
}

export function ShareButton({ editorRef, template, onRateLimit }: ShareButtonProps) {
  const handleShare = async () => {
    if (!editorRef.current) return;

    try {
      const canExport = await checkExportLimit();
      if (!canExport) {
        onRateLimit();
        toast.error("You've reached your sharing limit.");
        return;
      }

      const hasMotion = editorRef.current.querySelector('.gradient-motion');
      let blob: Blob;

      if (hasMotion) {
        const gif = new GIF({
          workers: 2,
          quality: 10,
          width: template.width,
          height: template.height,
        });

        const frames = 20;
        for (let i = 0; i < frames; i++) {
          const dataUrl = await toPng(editorRef.current, {
            quality: 1.0,
            pixelRatio: 2,
          });
          
          const img = new Image();
          img.src = dataUrl;
          await new Promise(resolve => img.onload = resolve);
          gif.addFrame(img, { delay: 100 });
        }

        blob = await new Promise((resolve) => {
          gif.on('finished', resolve);
          gif.render();
        });
      } else {
        const dataUrl = await toPng(editorRef.current, {
          quality: 1.0,
          pixelRatio: 2,
        });
        const response = await fetch(dataUrl);
        blob = await response.blob();
      }
      
      if (template.name === "Instagram Story") {
        if (navigator.share) {
          await navigator.share({
            files: [new File([blob], hasMotion ? 'story.gif' : 'story.png', { 
              type: hasMotion ? 'image/gif' : 'image/png' 
            })],
          });
        } else {
          toast.error("Instagram sharing is not supported on this device");
        }
      } else if (template.name === "LinkedIn Post") {
        window.open('https://www.linkedin.com/sharing/share-offsite/', '_blank');
      } else {
        if (navigator.share) {
          await navigator.share({
            files: [new File([blob], hasMotion ? 'image.gif' : 'image.png', { 
              type: hasMotion ? 'image/gif' : 'image/png' 
            })],
          });
        } else {
          toast.error("Sharing is not supported on this device");
        }
      }
    } catch (err) {
      toast.error("Failed to share image. Please try again.");
    }
  };

  if (template.name === 'instagram-story') {
    return (
      <Button
        onClick={handleShare}
        className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
        size="sm"
      >
        <Instagram className="w-4 h-4 mr-1.5" />
        Post on Instagram
      </Button>
    );
  }

  if (template.name === 'linkedin-post') {
    return (
      <Button
        onClick={handleShare}
        className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
        size="sm"
      >
        <Linkedin className="w-4 h-4 mr-1.5" />
        Post on LinkedIn
      </Button>
    );
  }

  return (
    <Button
      onClick={handleShare}
      className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
      size="sm"
    >
      <Share2 className="w-4 h-4 mr-1.5" />
      Share
    </Button>
  );
}