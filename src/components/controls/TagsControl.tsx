import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface Pill {
  id: number;
  text: string;
  font: string;
  background: string;
}

interface TagsControlProps {
  pills: Pill[];
  setPills: (pills: Pill[]) => void;
}

const fontOptions = ["Playfair Display", "Inter", "Arial", "Georgia", "Times New Roman"];
const backgroundOptions = [
  { label: "Light Gray", value: "#f3f4f6" },
  { label: "Light Blue", value: "#e0f2fe" },
  { label: "Light Green", value: "#dcfce7" },
  { label: "Light Purple", value: "#f3e8ff" },
  { label: "Light Pink", value: "#fce7f3" },
];

export function TagsControl({ pills, setPills }: TagsControlProps) {
  const addPill = () => {
    setPills([...pills, { id: Date.now(), text: "New Tag", font: "Inter", background: "#f3f4f6" }]);
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

  const updatePillBackground = (id: number, background: string) => {
    setPills(pills.map(pill => 
      pill.id === id ? { ...pill, background } : pill
    ));
  };

  return (
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
          <div key={pill.id} className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={pill.text}
                onChange={(e) => updatePill(pill.id, e.target.value)}
                placeholder="Enter tag text"
              />
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
            <div className="grid grid-cols-2 gap-2">
              <Select value={pill.font} onValueChange={(font) => updatePillFont(pill.id, font)}>
                <SelectTrigger>
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
              <Select 
                value={pill.background} 
                onValueChange={(bg) => updatePillBackground(pill.id, bg)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Background" />
                </SelectTrigger>
                <SelectContent>
                  {backgroundOptions.map(bg => (
                    <SelectItem key={bg.value} value={bg.value}>
                      {bg.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}