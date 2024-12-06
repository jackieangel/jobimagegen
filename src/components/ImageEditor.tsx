import { forwardRef, type ForwardedRef } from "react";
import { cn } from "@/lib/utils";
import Draggable from "react-draggable";

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
  logoPosition: { x: number; y: number };
  logoColor: string;
  setLogoPosition?: (position: { x: number; y: number }) => void;
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
      setLogoPosition,
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

    const handleDrag = (_: any, data: { x: number; y: number }) => {
      if (setLogoPosition && ref && 'current' in ref && ref.current) {
        const containerRect = ref.current.getBoundingClientRect();
        if (containerRect) {
          const x = (data.x / containerRect.width) * 100;
          const y = (data.y / containerRect.height) * 100;
          setLogoPosition({ x, y });
        }
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
            <Draggable
              position={{
                x: (logoPosition.x / 100) * ((ref && 'current' in ref && ref.current?.clientWidth) || 0),
                y: (logoPosition.y / 100) * ((ref && 'current' in ref && ref.current?.clientHeight) || 0),
              }}
              onDrag={handleDrag}
              bounds="parent"
            >
              <div 
                className="absolute cursor-move transition-transform duration-200 hover:scale-105"
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <img 
                  src={logo} 
                  alt="Company logo" 
                  className="object-contain transition-transform duration-200"
                  style={{
                    height: '28px',
                    maxWidth: '100px',
                    filter: logo.endsWith('.svg') ? `brightness(0) saturate(100%) ${logoColor === '#FFFFFF' ? 'invert(1)' : ''}` : 'none',
                    color: logoColor,
                    willChange: 'transform',
                    touchAction: 'none',
                    userSelect: 'none',
                  }}
                />
              </div>
            </Draggable>
          )}
          
          <div 
            className="absolute transition-all duration-200 flex flex-col items-center gap-4"
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