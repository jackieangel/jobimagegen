import { useRef } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download, Share2, Instagram, Linkedin, Key } from "lucide-react";
import type { Template } from "@/lib/templates";
import GIF from 'gif.js';
import { checkExportLimit } from "@/lib/rateLimit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ImageActionsProps {
  editorRef: React.RefObject<HTMLDivElement>;
  template: Template;
}

export function ImageActions({ editorRef, template }: ImageActionsProps) {
  const actionsRef = useRef<HTMLDivElement>(null);

  const triggerShake = () => {
    if (actionsRef.current) {
      actionsRef.current.classList.add('shake');
      setTimeout(() => {
        actionsRef.current?.classList.remove('shake');
      }, 500);
    }
  };

  const handleExport = async (type: 'png' | 'gif') => {
    if (!editorRef.current) return;

    try {
      const canExport = await checkExportLimit();
      if (!canExport) {
        triggerShake();
        toast.error("You've reached your export limit.");
        return;
      }

      if (type === 'gif') {
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
      const canExport = await checkExportLimit();
      if (!canExport) {
        triggerShake();
        toast.error("You've reached your sharing limit.");
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

  const hasMotion = editorRef.current?.querySelector('.gradient-motion');

  return (
    <div ref={actionsRef}>
      {hasMotion ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
              size="sm"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export as
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExport('png')}>
              Export .PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('gif')}>
              Export .GIF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          onClick={() => handleExport('png')} 
          className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
          size="sm"
        >
          <Download className="w-4 h-4 mr-1.5" />
          Export .PNG
        </Button>
      )}

      {template.name === 'instagram-story' ? (
        <Button
          onClick={handleShare}
          className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
          size="sm"
        >
          <Instagram className="w-4 h-4 mr-1.5" />
          Post on Instagram
        </Button>
      ) : template.name === 'linkedin-post' ? (
        <Button
          onClick={handleShare}
          className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
          size="sm"
        >
          <Linkedin className="w-4 h-4 mr-1.5" />
          Post on LinkedIn
        </Button>
      ) : (
        <Button
          onClick={handleShare}
          className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
          size="sm"
        >
          <Share2 className="w-4 h-4 mr-1.5" />
          Share
        </Button>
      )}

      <Button
        onClick={() => window.open('https://lovable.dev/pricing', '_blank')}
        className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
        size="sm"
      >
        <Key className="w-4 h-4 mr-1.5" />
        Get License
      </Button>
    </div>
  );
}