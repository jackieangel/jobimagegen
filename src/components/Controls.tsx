import { Card } from "@/components/ui/card";
import { BackgroundControl } from "./controls/BackgroundControl";
import { TemplateControl } from "./controls/TemplateControl";
import { JobTitleControl } from "./controls/JobTitleControl";
import { TagsControl } from "./controls/TagsControl";
import { LogoControl } from "./controls/LogoControl";
import { Separator } from "@/components/ui/separator";

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
  jobPosition: { x: number; y: number };
  setJobPosition: (position: { x: number; y: number }) => void;
  pills: Pill[];
  setPills: (pills: Pill[]) => void;
  pillsPosition: { x: number; y: number };
  setPillsPosition: (position: { x: number; y: number }) => void;
  setLogo: (value: string | null) => void;
  logoPosition: { x: number; y: number };
  setLogoPosition: (position: { x: number; y: number }) => void;
  logoColor: string;
  setLogoColor: (color: string) => void;
  logoScale: number;
  setLogoScale: (scale: number) => void;
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
  jobPosition,
  setJobPosition,
  pills,
  setPills,
  pillsPosition,
  setPillsPosition,
  setLogo,
  logoPosition,
  setLogoPosition,
  logoColor,
  setLogoColor,
  logoScale,
  setLogoScale,
  activeTemplate,
  setActiveTemplate,
}: ControlsProps) {
  const handleThemeChange = (isDark: boolean) => {
    setPills(pills.map(pill => ({
      ...pill,
      background: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(243, 244, 246, 0.8)"
    })));
  };

  return (
    <Card className="p-6 space-y-6 h-[calc(100vh-12rem)] overflow-y-auto rounded-none border-border/50">
      <div className="space-y-8">
        <TemplateControl
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />
        
        <Separator />

        <BackgroundControl
          background={background}
          setBackground={setBackground}
          onThemeChange={handleThemeChange}
        />
        
        <Separator />

        <LogoControl
          setLogo={setLogo}
          logoPosition={logoPosition}
          setLogoPosition={setLogoPosition}
          logoColor={logoColor}
          setLogoColor={setLogoColor}
          logoScale={logoScale}
          setLogoScale={setLogoScale}
        />
        
        <Separator />

        <JobTitleControl
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          jobTitleFont={jobTitleFont}
          setJobTitleFont={setJobTitleFont}
          jobTitleSize={jobTitleSize}
          setJobTitleSize={setJobTitleSize}
          jobPosition={jobPosition}
          setJobPosition={setJobPosition}
        />
        
        <Separator />

        <TagsControl
          pills={pills}
          setPills={setPills}
          background={background}
          pillsPosition={pillsPosition}
          setPillsPosition={setPillsPosition}
        />
      </div>
    </Card>
  );
}