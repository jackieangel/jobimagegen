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
  activeTemplate,
  setActiveTemplate,
}: ControlsProps) {
  return (
    <Card className="p-6 space-y-6 h-[calc(100vh-12rem)] overflow-y-auto rounded-none border-border/50">
      <div className="sticky top-0 bg-card z-10 pb-4 -mt-2 -mx-2 px-2 pt-2">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-archivo font-medium tracking-tight lowercase">
          generate a job post
        </h1>
      </div>

      <div className="space-y-8">
        <TemplateControl
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />
        
        <Separator />

        <BackgroundControl
          background={background}
          setBackground={setBackground}
        />
        
        <Separator />

        <LogoControl
          setLogo={setLogo}
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
        />
      </div>
    </Card>
  );
}