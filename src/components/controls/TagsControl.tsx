import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

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

const backgroundOptions = [
  { label: "Light Gray", value: "rgba(243, 244, 246, 0.8)" },
  { label: "Light Blue", value: "rgba(224, 242, 254, 0.8)" },
  { label: "Light Green", value: "rgba(220, 252, 231, 0.8)" },
  { label: "Light Purple", value: "rgba(243, 232, 255, 0.8)" },
  { label: "Light Pink", value: "rgba(252, 231, 243, 0.8)" },
];

export function TagsControl({ pills, setPills }: TagsControlProps) {
  const addPill = () => {
    if (pills.length >= 4) {
      toast.error("Maximum of 4 tags allowed");
      return;
    }
    setPills([...pills, { 
      id: Date.now(), 
      text: "New Tag", 
      font: "Inter", 
      background: backgroundOptions[0].value 
    }]);
  };

  const removePill = (id: number) => {
    setPills(pills.filter(pill => pill.id !== id));
  };

  const updatePill = (id: number, text: string) => {
    setPills(pills.map(pill => 
      pill.id === id ? { ...pill, text } : pill
    ));
  };

  const updatePillBackground = (id: number, background: string) => {
    setPills(pills.map(pill => 
      pill.id === id ? { ...pill, background } : pill
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          Tags
          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
            {pills.length} of 4
          </span>
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addPill}
          className="h-8"
          disabled={pills.length >= 4}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Tag
        </Button>
      </div>

      <div className="space-y-3">
        {pills.map((pill) => (
          <Card key={pill.id} className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  value={pill.text}
                  onChange={(e) => updatePill(pill.id, e.target.value)}
                  placeholder="Enter tag text"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePill(pill.id)}
                className="h-10 w-10 shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div>
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
          </Card>
        ))}
      </div>
    </div>
  );
}