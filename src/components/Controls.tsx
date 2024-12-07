import { Card } from "@/components/ui/card";
import { BackgroundControl } from "./controls/BackgroundControl";
import { TemplateControl } from "./controls/TemplateControl";
import { JobTitleControl } from "./controls/JobTitleControl";
import { TagsControl } from "./controls/TagsControl";
import { LogoControl } from "./controls/LogoControl";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { toast } from "sonner";

interface Pill {
  id: number;
  text: string;
  font: string;
  background: string;
}

interface ControlsProps {
  background: string;
  setBackground: (value: string) => void;
  jobTitle: string;
  setJobTitle: (value: string) => void;
  jobTitleFont: string;
  setJobTitleFont: (value: string) => void;
  jobTitleSize: string;
  setJobTitleSize: (value: string) => void;
  pills: Pill[];
  setPills: (pills: Pill[]) => void;
  setLogo: (value: string | null) => void;
  logoColor: string;
  setLogoColor: (color: string) => void;
  logoPosition: "top" | "bottom" | "above-title";
  setLogoPosition: (position: "top" | "bottom" | "above-title") => void;
  activeTemplate: string;
  setActiveTemplate: (value: string) => void;
}

export function Controls({
  background,
  setBackground,
  jobTitle,
  setJobTitle,
  jobTitleFont,
  setJobTitleFont,
  jobTitleSize,
  setJobTitleSize,
  pills,
  setPills,
  setLogo,
  logoColor,
  setLogoColor,
  logoPosition,
  setLogoPosition,
  activeTemplate,
  setActiveTemplate,
}: ControlsProps) {
  const handleThemeChange = (isDark: boolean) => {
    setPills(pills.map(pill => ({
      ...pill,
      background: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(243, 244, 246, 0.8)"
    })));
  };

  const randomizeStyles = () => {
    // Predefined gradients from BackgroundControl
    const gradients = [
      "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)",
      "linear-gradient(90deg, #E3E6E3 0%, #CBD5CD 100%)",
      "linear-gradient(90deg, #F6F4F8 0%, #E2DDE7 100%)",
      "linear-gradient(90deg, #F5F3F0 0%, #E8E2D9 100%)",
      "linear-gradient(90deg, #EFF1F3 0%, #E2E6EA 100%)",
      "linear-gradient(90deg, hsl(25, 50%, 30%) 0%, hsl(25, 50%, 20%) 100%)",
      "linear-gradient(90deg, hsl(250, 25%, 10%) 0%, hsl(250, 25%, 13%) 100%)",
    ];

    const fonts = ["Playfair Display", "Archivo", "Inter"];
    const sizes = ["sm", "base", "lg", "xl"];
    const positions: ("top" | "bottom" | "above-title")[] = ["top", "bottom", "above-title"];
    const logoColors = ["#000000", "#FFFFFF", "#F5F5F5"];

    // Randomly select values
    const randomBackground = gradients[Math.floor(Math.random() * gradients.length)];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    const randomLogoColor = logoColors[Math.floor(Math.random() * logoColors.length)];

    // Apply random values
    setBackground(randomBackground);
    setJobTitleFont(randomFont);
    setJobTitleSize(randomSize);
    setLogoPosition(randomPosition);
    setLogoColor(randomLogoColor);

    // Handle theme-dependent pill colors
    const isDarkTheme = 
      randomBackground.includes("Cedar") || 
      randomBackground.includes("Nightshade") ||
      randomBackground.toLowerCase().includes("linear-gradient") && (
        randomBackground.includes("hsl(25, 50%, 20%)") || // Cedar
        randomBackground.includes("hsl(250, 25%, 10%)") // Nightshade
      );

    handleThemeChange(isDarkTheme);

    toast.success("Styles randomized!");
  };

  return (
    <Card className="p-6 space-y-6 h-[calc(100vh-12rem)] overflow-y-auto rounded-none border-border/50">
      <div className="space-y-8">
        <div className="space-y-4">
          <TemplateControl
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
          />
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={randomizeStyles}
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Randomize Styles
          </Button>
        </div>
        
        <Separator />

        <BackgroundControl
          background={background}
          setBackground={setBackground}
          onThemeChange={handleThemeChange}
        />
        
        <Separator />

        <LogoControl
          setLogo={setLogo}
          logoColor={logoColor}
          setLogoColor={setLogoColor}
          logoPosition={logoPosition}
          setLogoPosition={setLogoPosition}
        />
        
        <Separator />

        <JobTitleControl
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          jobTitleFont={jobTitleFont}
          setJobTitleFont={setJobTitleFont}
          jobTitleSize={jobTitleSize}
          setJobTitleSize={setJobTitleSize}
        />
        
        <Separator />

        <TagsControl
          pills={pills}
          setPills={setPills}
          background={background}
        />
      </div>
    </Card>
  );
}