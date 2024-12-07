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