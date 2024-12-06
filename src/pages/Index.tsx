import { useState } from "react";
import { ImageEditor } from "@/components/ImageEditor";
import { Controls } from "@/components/Controls";
import { templates } from "@/lib/templates";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

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
  const aspectRatio = `${template.width}:${template.height}`;

  return (
    <Card className="min-h-[1000px] max-h-[1000px] max-w-[1400px] mx-auto bg-card">
      <div className="container h-full px-2 sm:px-4 py-4 sm:py-6 md:py-8">
        <header className="text-center space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-playfair font-medium tracking-tight">
            Job Post Image Generator
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto px-2">
            Create beautiful job posting images for social media in seconds. Choose your template,
            customize your design, and export your image.
          </p>
        </header>

        <div className="grid md:grid-cols-[320px,1fr] lg:grid-cols-[380px,1fr] gap-4 md:gap-6 lg:gap-8 h-[calc(100%-100px)] sm:h-[calc(100%-120px)]">
          <div className="h-[300px] md:h-full">
            <ScrollArea className="h-full">
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
            </ScrollArea>
          </div>

          <Card className="p-3 sm:p-4 md:p-6 bg-accent">
            <div className="sticky top-6 h-full">
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Template Aspect Ratio: {aspectRatio}
                </p>
                <div 
                  className="relative w-full max-w-[600px] transition-all duration-300 bg-card shadow-sm mx-auto"
                  style={{
                    aspectRatio: template.width / template.height,
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
          </Card>
        </div>
      </div>
    </Card>
  );
}