import { useRef } from "react";
import Draggable from "react-draggable";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { Download, Share2, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import type { Template } from "@/lib/templates";
import { Card } from "@/components/ui/card";

interface Pill {
  id: number;
  text: string;
  font: string;
  background: string;
}

interface ImageEditorProps {
  template: Template;
  background: string;
  jobTitle: string;
  jobTitleFont: string;
  jobTitleSize: string;
  pills: Pill[];
  logo: string | null;
}

export function ImageEditor({
  template,
  background,
  jobTitle,
  jobTitleFont,
  jobTitleSize,
  pills,
  logo,
}: ImageEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

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

  const getBackgroundStyle = () => {
    if (background.startsWith('linear-gradient')) {
      return { backgroundImage: background };
    }
    return { backgroundColor: background };
  };

  return (
    <div className="space-y-4 w-full">
      <Card
        ref={editorRef}
        className="relative mx-auto overflow-hidden bg-gradient-to-b from-white/80 to-transparent transition-all duration-300"
        style={{
          width: template.width,
          height: template.height,
          maxWidth: "100%",
          maxHeight: "70vh",
          ...getBackgroundStyle(),
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.03,
            mixBlendMode: 'overlay',
          }}
        />
        <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center">
          {logo && (
            <Draggable bounds="parent">
              <img
                src={logo}
                alt="Company logo"
                className="w-20 h-20 object-contain cursor-move"
              />
            </Draggable>
          )}
          
          <Draggable bounds="parent">
            <div className="cursor-move space-y-6">
              <h1 
                className={`text-${jobTitleSize} font-medium text-slate-800 leading-tight`}
                style={{ 
                  fontFamily: jobTitleFont,
                  fontSize: jobTitleSize === '3xl' ? '1.875rem' : 
                           jobTitleSize === '4xl' ? '2.25rem' : 
                           jobTitleSize === '5xl' ? '3rem' : '3.75rem'
                }}
              >
                {jobTitle}
              </h1>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {pills.map((pill) => (
                  <span
                    key={pill.id}
                    className="px-4 py-1.5 rounded-full backdrop-blur-sm text-sm font-medium text-slate-700"
                    style={{ 
                      fontFamily: pill.font,
                      backgroundColor: pill.background
                    }}
                  >
                    {pill.text}
                  </span>
                ))}
              </div>
            </div>
          </Draggable>
        </div>
      </Card>
    </div>
  );
}