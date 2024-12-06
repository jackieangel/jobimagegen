import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface Pill {
  id: number;
  text: string;
  font: string;
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
}

const fontOptions = ["Playfair Display", "Inter", "Arial", "Georgia", "Times New Roman"];
const sizeOptions = ["3xl", "4xl", "5xl", "6xl", "7xl"];

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
}: ControlsProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPill = () => {
    setPills([...pills, { id: Date.now(), text: "New Tag", font: "Inter" }]);
  };

  const removePill = (id: number) => {
    setPills(pills.filter(pill => pill.id !== id));
  };

  const updatePill = (id: number, text: string) => {
    setPills(pills.map(pill => 
      pill.id === id ? { ...pill, text } : pill
    ));
  };

  const updatePillFont = (id: number, font: string) => {
    setPills(pills.map(pill => 
      pill.id === id ? { ...pill, font } : pill
    ));
  };

  return (
    <Card className="p-4 sm:p-6 space-y-6 h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="background">Background Color</Label>
          <div className="flex gap-2">
            <Input
              id="background"
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-12 h-12 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="font-mono"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter job title"
          />
        </div>

        <div className="space-y-2">
          <Label>Job Title Font</Label>
          <Select value={jobTitleFont} onValueChange={setJobTitleFont}>
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map(font => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Job Title Size</Label>
          <Select value={jobTitleSize} onValueChange={setJobTitleSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map(size => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Tags</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPill}
              className="h-8"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Tag
            </Button>
          </div>
          <div className="space-y-3">
            {pills.map((pill) => (
              <div key={pill.id} className="flex gap-2">
                <Input
                  value={pill.text}
                  onChange={(e) => updatePill(pill.id, e.target.value)}
                  placeholder="Enter tag text"
                />
                <Select value={pill.font} onValueChange={(font) => updatePillFont(pill.id, font)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map(font => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removePill(pill.id)}
                  className="h-10 w-10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Company Logo</Label>
          <Input
            id="logo"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
}