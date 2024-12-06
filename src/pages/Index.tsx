import { useState } from "react";
import { ImageEditor } from "@/components/ImageEditor";
import { Controls } from "@/components/Controls";
import { templates } from "@/lib/templates";

export default function Index() {
  const [activeTemplate, setActiveTemplate] = useState("instagram-post");
  const [background, setBackground] = useState("none");
  const [jobTitle, setJobTitle] = useState("Design Chief of Staff");
  const [jobTitleFont, setJobTitleFont] = useState("Playfair Display");
  const [jobTitleSize, setJobTitleSize] = useState("4xl");
  const [pills, setPills] = useState([
    { id: 1, text: "PARIS / REMOTE", font: "Inter" },
    { id: 2, text: "UX/UI DESIGN", font: "Inter" },
  ]);
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in">
        <header className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-playfair font-semibold text-slate-800">
            Job Post Image Generator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Create beautiful job posting images for social media in seconds. Choose your template,
            customize your design, and export your image.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6">
          <div className="relative">
            <div className="sticky top-6">
              <div className="p-4 sm:p-6 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg border border-slate-200/50 shadow-sm transition-all duration-300">
                <ImageEditor
                  template={templates[activeTemplate]}
                  background={background === "none" ? "#ffffff" : background}
                  jobTitle={jobTitle}
                  jobTitleFont={jobTitleFont}
                  jobTitleSize={jobTitleSize}
                  pills={pills}
                  logo={logo}
                />
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