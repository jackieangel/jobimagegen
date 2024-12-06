import { useRef } from "react";
import Draggable from "react-draggable";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { toast } from "sonner";
import type { Template } from "@/lib/templates";

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

  const getBackgroundStyle = () => {
    if (background.startsWith('linear-gradient')) {
      return { backgroundImage: background };
    }
    return { backgroundColor: background };
  };

  return (
    <div className="space-y-4 w-full">
      <div
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
                style={{ fontFamily: jobTitleFont }}
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
      </div>

      <Button
        onClick={handleExport}
        className="w-full sm:w-auto"
        size="lg"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Image
      </Button>
    </div>
  );
}