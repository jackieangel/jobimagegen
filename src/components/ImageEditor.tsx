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
    const isDarkTheme = 
      background.includes("Cedar") || 
      background.includes("Nightshade") ||
      background.toLowerCase().includes("linear-gradient") && (
        background.includes("hsl(25, 50%, 20%)") || // Cedar
        background.includes("hsl(250, 25%, 10%)") // Nightshade
      );

    const getTextColor = (bgColor: string) => {
      if (
        bgColor.includes("rgba(30, 58, 138, 0.9)") || // Dark blue
        bgColor.includes("rgba(88, 28, 135, 0.9)") // Dark purple
      ) {
        return "hsl(0 0% 98%)";
      }
      return isDarkTheme ? "hsl(0 0% 98%)" : "hsl(240 5.9% 10%)";
    };

    return (
      <div
        ref={ref}
        data-gradient-motion
        className={cn(
          "w-full h-full relative",
          isDarkTheme && "dark"
        )}
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
              isDarkTheme ? "text-white" : "text-gray-900",
              "tracking-tight"
            )}
            style={{
              fontFamily: jobTitleFont
            }}
          >
            {jobTitle}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {pills.map((pill) => (
              <div
                key={pill.id}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm transition-colors duration-200 hover:bg-opacity-90 font-inter"
                )}
                style={{
                  background: pill.background,
                  color: getTextColor(pill.background)
                }}
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