import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SolidColorControlsProps {
  background: string;
  handleColorChange: (value: string) => void;
}

export function SolidColorControls({
  background,
  handleColorChange,
}: SolidColorControlsProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="background">Solid Color</Label>
      <div className="flex gap-2">
        <Input
          id="background"
          type="color"
          value={background}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-12 h-12 p-1 cursor-pointer"
        />
        <Input
          type="text"
          value={background}
          onChange={(e) => handleColorChange(e.target.value)}
          className="font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}