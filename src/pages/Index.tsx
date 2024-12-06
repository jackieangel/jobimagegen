import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageEditor } from "@/components/ImageEditor";
import { Controls } from "@/components/Controls";
import { templates } from "@/lib/templates";

export default function Index() {
  const [activeTemplate, setActiveTemplate] = useState("instagram-post");
  const [background, setBackground] = useState("#E5F0FF");
  const [jobTitle, setJobTitle] = useState("Design Chief of Staff");
  const [location, setLocation] = useState("PARIS / REMOTE");
  const [category, setCategory] = useState("UX/UI DESIGN");
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-playfair font-semibold text-slate-800">
            Job Post Image Generator
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Create beautiful job posting images for social media in seconds. Choose your template,
            customize your design, and export your image.
          </p>
        </header>

        <Tabs defaultValue="instagram-post" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-auto p-1">
            {Object.entries(templates).map(([key, template]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="py-2 data-[state=active]:bg-white"
                onClick={() => setActiveTemplate(key)}
              >
                {template.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid md:grid-cols-[1fr,400px] gap-8">
            <Card className="p-6 flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <ImageEditor
                template={templates[activeTemplate]}
                background={background}
                jobTitle={jobTitle}
                location={location}
                category={category}
                logo={logo}
              />
            </Card>

            <Controls
              background={background}
              setBackground={setBackground}
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              location={location}
              setLocation={setLocation}
              category={category}
              setCategory={setCategory}
              setLogo={setLogo}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
}