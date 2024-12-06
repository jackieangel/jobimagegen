import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ImageEditorProps {
  template: {
    width: number;
    height: number;
  };
  background: string;
  jobTitle: string;
  jobTitleFont: string;
  jobTitleSize: string;
  pills: {
    id: number;
    text: string;
    font: string;
    background: string;
  }[];
  logo: string | null;
}

export const ImageEditor = forwardRef<HTMLDivElement, ImageEditorProps>(
  (
    {
      template,
      background,
      jobTitle,
      jobTitleFont,
      jobTitleSize,
      pills,
      logo,
    },
    ref
  ) => {
    const isDarkBackground = background.includes("Nightshade") || 
                           background.startsWith("#") && 
                           (
                             parseInt(background.slice(1), 16) < 0x808080 || 
                             background.length === 4 && parseInt(background.slice(1), 16) < 0x888
                           );

    return (
      <div
        ref={ref}
        data-gradient-motion
        className="w-full h-full relative"
        style={{
          background,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          {logo && (
            <div className="mb-8">
              <img src={logo} alt="Company logo" className="h-12 object-contain" />
            </div>
          )}
          <h1
            className={cn(
              "text-center tracking-tighter",
              jobTitleFont === "Playfair Display" && "font-playfair",
              jobTitleFont === "Archivo" && "font-archivo",
              jobTitleFont === "Inter" && "font-inter",
              jobTitleSize === "sm" && "text-2xl",
              jobTitleSize === "base" && "text-3xl",
              jobTitleSize === "lg" && "text-4xl",
              jobTitleSize === "xl" && "text-5xl",
              isDarkBackground ? "text-white" : "text-gray-900",
              "tracking-tight"
            )}
          >
            {jobTitle}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {pills.map((pill) => (
              <div
                key={pill.id}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm",
                  pill.font === "Playfair Display" && "font-playfair",
                  pill.font === "Archivo" && "font-archivo",
                  pill.font === "Inter" && "font-inter",
                  isDarkBackground ? "text-white bg-white/10" : "text-gray-900 bg-gray-100"
                )}
              >
                {pill.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ImageEditor.displayName = "ImageEditor";