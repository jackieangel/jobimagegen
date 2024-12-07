import { forwardRef, type ForwardedRef } from "react";
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
  jobPosition: { x: number; y: number };
  pills: {
    id: number;
    text: string;
    font: string;
    background: string;
  }[];
  pillsPosition: { x: number; y: number };
  logo: string | null;
  logoPosition: "top" | "bottom" | "above-title";
  logoColor: string;
  gradientMotion?: boolean;
}

export const ImageEditor = forwardRef<HTMLDivElement, ImageEditorProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      template,
      background,
      jobTitle,
      jobTitleFont,
      jobTitleSize,
      jobPosition,
      pills,
      pillsPosition,
      logo,
      logoPosition,
      logoColor,
      gradientMotion = false,
    } = props;

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

    const isGradient = background.toLowerCase().includes("linear-gradient");

    const getLogoPosition = () => {
      switch (logoPosition) {
        case "top":
          return "top-8";
        case "bottom":
          return "bottom-8";
        case "above-title":
          return "top-1/3 -translate-y-full";
        default:
          return "top-8";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-full relative",
          isDarkTheme && "dark",
          isGradient && "preview-gradient-motion",
          isGradient && !gradientMotion && "disabled"
        )}
        style={{
          background,
        }}
      >
        <div className="absolute inset-0">
          {logo && (
            <div 
              className={cn(
                "absolute left-1/2 -translate-x-1/2",
                getLogoPosition()
              )}
            >
              <img 
                src={logo} 
                alt="Company logo" 
                className="object-contain transition-transform duration-200"
                style={{
                  height: '24px',
                  maxWidth: '90px',
                  filter: logo.endsWith('.svg') ? `brightness(0) saturate(100%) ${logoColor === '#FFFFFF' ? 'invert(1)' : logoColor === '#F5F5F5' ? 'invert(0.97)' : ''}` : 'none',
                  color: logoColor,
                  userSelect: 'none',
                }}
              />
            </div>
          )}
          
          <div 
            className="absolute transition-all duration-200 flex flex-col items-center gap-6"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              padding: '0 2rem'
            }}
          >
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

            <div className="flex flex-wrap gap-2 justify-center">
              {pills.map((pill) => (
                <div
                  key={pill.id}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs transition-colors duration-200 hover:bg-opacity-90 font-inter"
                  )}
                  style={{
                    background: pill.background,
                    color: getTextColor(pill.background),
                    opacity: 0.9
                  }}
                >
                  {pill.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ImageEditor.displayName = "ImageEditor";