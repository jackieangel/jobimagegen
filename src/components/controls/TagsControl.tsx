import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface Pill {
  id: number;
  text: string;
  font: string;
}

interface TagsControlProps {
  pills: Pill[];
  setPills: (pills: Pill[]) => void;
}

const fontOptions = ["Playfair Display", "Inter", "Arial", "Georgia", "Times New Roman"];

export function TagsControl({ pills, setPills }: TagsControlProps) {
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
  );
}