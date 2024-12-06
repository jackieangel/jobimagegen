import { useState } from "react";
import { ImageEditor } from "@/components/ImageEditor";
import { Controls } from "@/components/Controls";
import { templates } from "@/lib/templates";

export default function Index() {
  const [activeTemplate, setActiveTemplate] = useState("instagram-post");
  const [background, setBackground] = useState("#f5f5f5");
  const [jobTitle, setJobTitle] = useState("Design Chief of Staff");
  const [jobTitleFont, setJobTitleFont] = useState("Playfair Display");
  const [jobTitleSize, setJobTitleSize] = useState("4xl");
  const [pills, setPills] = useState([
    { id: 1, text: "PARIS / REMOTE", font: "Inter", background: "#f3f4f6" },
    { id: 2, text: "UX/UI DESIGN", font: "Inter", background: "#f3f4f6" },
  ]);
  const [logo, setLogo] = useState<string | null>(null);

  const template = templates[activeTemplate];

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-background">
      <div className="max-w-[1400px] mx-auto space-y-12 animate-fade-in">
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-playfair font-medium tracking-tight text-foreground">
            Job Post Image Generator
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Create beautiful job posting images for social media in seconds. Choose your template,
            customize your design, and export your image.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,380px] gap-12">
          <div className="relative">
            <div className="sticky top-6">
              <div className="h-[600px] flex items-center justify-center">
                <div 
                  className="bg-card/50 backdrop-blur-sm rounded-none border border-border/50 transition-all duration-300"
                  style={{
                    width: `${template.width}px`,
                    height: `${template.height}px`,
                    maxWidth: '100%',
                    maxHeight: '70vh',
                  }}
                >
                  <ImageEditor
                    template={template}
                    background={background}
                    jobTitle={jobTitle}
                    jobTitleFont={jobTitleFont}
                    jobTitleSize={jobTitleSize}
                    pills={pills}
                    logo={logo}
                  />
                </div>
              </div>
            </div>
          </div>

          <Controls
            background={background}
            setBackground={setBackground}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            jobTitleFont={jobTitleFont}
            setJobTitleFont={setJobTitleFont}
            jobTitleSize={jobTitleSize}
            setJobTitleSize={setJobTitleSize}
            pills={pills}
            setPills={setPills}
            setLogo={setLogo}
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
          />
        </div>
      </div>
    </div>
  );
}