import { useState } from "react";
import { ImageEditor } from "@/components/ImageEditor";
import { Controls } from "@/components/Controls";
import { templates } from "@/lib/templates";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Instagram, Linkedin } from "lucide-react";

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

  const handleExport = async () => {
    if (!editorRef.current) return;

    try {
      const dataUrl = await toPng(editorRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });
      
      const link = document.createElement("a");
      link.download = `job-post-${template.name.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success("Image downloaded successfully!");
    } catch (err) {
      toast.error("Failed to export image. Please try again.");
    }
  };

  const handleShare = async () => {
    if (!editorRef.current) return;

    try {
      const dataUrl = await toPng(editorRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });

      // Convert base64 to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      if (template.name === "Instagram Story") {
        // Check if Instagram sharing is available
        if (navigator.share) {
          await navigator.share({
            files: [new File([blob], 'story.png', { type: 'image/png' })],
          });
        } else {
          toast.error("Instagram sharing is not supported on this device");
        }
      } else if (template.name === "LinkedIn Post") {
        window.open('https://www.linkedin.com/sharing/share-offsite/', '_blank');
      } else {
        // Default sharing
        if (navigator.share) {
          await navigator.share({
            files: [new File([blob], 'image.png', { type: 'image/png' })],
          });
        } else {
          toast.error("Sharing is not supported on this device");
        }
      }
    } catch (err) {
      toast.error("Failed to share image. Please try again.");
    }
  };

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

          <div className="flex flex-col">
            <Card className="p-3 sm:p-4 md:p-6 bg-accent flex-grow">
              <div className="sticky top-0">
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    Template Aspect Ratio: {aspectRatio}
                  </p>
                  <div className="w-full flex items-center justify-center">
                    <div className="relative w-[600px] h-[600px] bg-card shadow-sm flex items-center justify-center">
                      <div 
                        className="absolute"
                        style={{
                          width: template.width > template.height 
                            ? '600px' 
                            : `${(template.width / template.height) * 600}px`,
                          height: template.height > template.width 
                            ? '600px' 
                            : `${(template.height / template.width) * 600}px`,
                          top: activeTemplate === 'linkedin-post' ? '0' : '50%',
                          left: '50%',
                          transform: activeTemplate === 'linkedin-post' 
                            ? 'translateX(-50%)' 
                            : 'translate(-50%, -50%)',
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
              </div>
            </Card>

            <div className="sticky bottom-0 mt-4 p-4 bg-background border-t flex justify-center gap-4">
              <Button
                onClick={handleExport}
                className="w-full sm:w-auto"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Image
              </Button>

              {activeTemplate === 'instagram-story' ? (
                <Button
                  onClick={handleShare}
                  className="w-full sm:w-auto"
                  size="lg"
                  variant="outline"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Share to Instagram Story
                </Button>
              ) : activeTemplate === 'linkedin-post' ? (
                <Button
                  onClick={handleShare}
                  className="w-full sm:w-auto"
                  size="lg"
                  variant="outline"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Share to LinkedIn
                </Button>
              ) : (
                <Button
                  onClick={handleShare}
                  className="w-full sm:w-auto"
                  size="lg"
                  variant="outline"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Image
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
