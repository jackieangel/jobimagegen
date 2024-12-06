import { useRef } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, Share2, Instagram, Linkedin } from "lucide-react";
import type { Template } from "@/lib/templates";
import GIF from 'gif.js';
import { checkExportLimit } from "@/lib/rateLimit";

interface ImageActionsProps {
  editorRef: React.RefObject<HTMLDivElement>;
  template: Template;
}

export function ImageActions({ editorRef, template }: ImageActionsProps) {
  const handleExport = async () => {
    if (!editorRef.current) return;

    try {
      // Check export limit
      const canExport = await checkExportLimit();
      if (!canExport) {
        toast.error("You've reached your export limit. Please upgrade your license to continue.");
        return;
      }

      // Check if the element has the gradient-motion class
      const hasMotion = editorRef.current.querySelector('.gradient-motion');
      
      if (hasMotion) {
        // Create GIF
        const gif = new GIF({
          workers: 2,
          quality: 10,
          width: template.width,
          height: template.height,
        });

        // Capture frames over 2 seconds
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

        gif.on('finished', (blob: Blob) => {
          const link = document.createElement("a");
          link.download = `job-post-${template.name.toLowerCase()}.gif`;
          link.href = URL.createObjectURL(blob);
          link.click();
          toast.success("GIF downloaded successfully!");
        });

        gif.render();
      } else {
        const dataUrl = await toPng(editorRef.current, {
          quality: 1.0,
          pixelRatio: 2,
        });
        
        const link = document.createElement("a");
        link.download = `job-post-${template.name.toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
        
        toast.success("Image downloaded successfully!");
      }
    } catch (err) {
      toast.error("Failed to export image. Please try again.");
    }
  };

  const handleShare = async () => {
    if (!editorRef.current) return;

    try {
      // Check export limit
      const canExport = await checkExportLimit();
      if (!canExport) {
        toast.error("You've reached your sharing limit. Please upgrade your license to continue.");
        return;
      }

      const hasMotion = editorRef.current.querySelector('.gradient-motion');
      let blob: Blob;

      if (hasMotion) {
        // Create video for platforms that support it
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
