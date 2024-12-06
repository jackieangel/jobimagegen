import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { TagItem } from "./tags/TagItem";

interface Pill {
  id: number;
  text: string;
  font: string;
  background: string;
}

interface TagsControlProps {
  pills: Pill[];
  setPills: (pills: Pill[]) => void;
  background: string;
  pillsPosition: { x: number; y: number };
  setPillsPosition: (position: { x: number; y: number }) => void;
}

export function TagsControl({ 
  pills, 
  setPills, 
  background,
  pillsPosition,
  setPillsPosition
}: TagsControlProps) {
  const isDarkTheme = 
    background.includes("Cedar") || 
    background.includes("Nightshade") ||
    background.toLowerCase().includes("linear-gradient") && (
      background.includes("hsl(25, 50%, 20%)") || // Cedar
      background.includes("hsl(250, 25%, 10%)") // Nightshade
    );

  const addPill = () => {
    if (pills.length >= 4) {
      toast.error("Maximum of 4 tags allowed");
      return;
    }
    setPills([
      ...pills, 
      { 
        id: Date.now(), 
        text: "New Tag", 
        font: "Inter", 
        background: isDarkTheme ? "rgba(255, 255, 255, 0.15)" : "rgba(243, 244, 246, 0.8)"
      }
    ]);
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

  const removePill = (id: number) => {
    setPills(pills.filter(pill => pill.id !== id));
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
          <TagItem
            key={pill.id}
            id={pill.id}
            text={pill.text}
            background={pill.background}
            isDarkTheme={isDarkTheme}
            onUpdate={updatePill}
            onUpdateBackground={updatePillBackground}
            onRemove={removePill}
          />
        ))}
      </div>

      <div className="space-y-2 pt-4">
        <Label>Tags Horizontal Position</Label>
        <Slider
          value={[pillsPosition.x]}
          onValueChange={([value]) => setPillsPosition({ ...pillsPosition, x: value })}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags Vertical Position</Label>
        <Slider
          value={[pillsPosition.y]}
          onValueChange={([value]) => setPillsPosition({ ...pillsPosition, y: value })}
          min={0}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
}