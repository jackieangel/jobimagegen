import { forwardRef } from "react";
import Draggable from "react-draggable";
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

export const ImageEditor = forwardRef<HTMLDivElement, ImageEditorProps>(({
  template,
  background,
  jobTitle,
  jobTitleFont,
  jobTitleSize,
  pills,
  logo,
}, ref) => {
  const getBackgroundStyle = () => {
    if (background.startsWith('linear-gradient')) {
      return { backgroundImage: background };
    }
    return { backgroundColor: background };
  };

  return (
    <Card
      ref={ref}
      data-gradient-motion
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
  );
});

ImageEditor.displayName = "ImageEditor";