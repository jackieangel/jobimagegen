import { useState } from "react";
import { ImageEditor } from "@/components/ImageEditor";
import { Controls } from "@/components/Controls";
import { templates } from "@/lib/templates";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-[1400px] animate-fade-in">
        <header className="text-center space-y-4 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-playfair font-medium tracking-tight text-foreground">
            Job Post Image Generator
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Create beautiful job posting images for social media in seconds. Choose your template,
            customize your design, and export your image.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6 md:gap-12">
          <div className="order-2 lg:order-1">
            <div className="sticky top-6">
              <div className="h-[500px] md:h-[600px] flex items-center justify-center bg-card/50 backdrop-blur-sm border border-border/50">
                <div 
                  className="transition-all duration-300"
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

          <div className="order-1 lg:order-2">
            <ScrollArea className="h-[calc(100vh-12rem)]">
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
        </div>
      </div>
    </div>
  );
}