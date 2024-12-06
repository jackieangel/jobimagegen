import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { checkExportLimit } from "@/lib/rateLimit";
import GIF from 'gif.js';
import type { Template } from "@/lib/templates";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportButtonProps {
  editorRef: React.RefObject<HTMLDivElement>;
  template: Template;
  onRateLimit: () => void;
  hasMotion: boolean;
}

export function ExportButton({ editorRef, template, onRateLimit, hasMotion }: ExportButtonProps) {
  const handleExport = async (type: 'png' | 'gif') => {
    if (!editorRef.current) return;

    try {
      const canExport = await checkExportLimit();
      if (!canExport) {
        onRateLimit();
        toast.error("You've reached your export limit.");
        return;
      }

      if (type === 'gif') {
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

  if (hasMotion) {
    return (
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
    );
  }

  return (
    <Button 
      onClick={() => handleExport('png')} 
      className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
      size="sm"
    >
      <Download className="w-4 h-4 mr-1.5" />
      Export .PNG
    </Button>
  );
}