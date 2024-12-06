import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BackgroundControlProps {
  background: string;
  setBackground: (value: string) => void;
}

export function BackgroundControl({ background, setBackground }: BackgroundControlProps) {
  const gradients = [
    { name: "None (Solid Color)", value: "none" },
    { name: "Sunset", value: "linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)" },
    { name: "Ocean", value: "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)" },
    { name: "Forest", value: "linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)" },
    { name: "Lavender", value: "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Background Style</Label>
        <Select value={background === "" ? "none" : background} onValueChange={setBackground}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a background style..." />
          </SelectTrigger>
          <SelectContent>
            {gradients.map((gradient) => (
              <SelectItem key={gradient.name} value={gradient.value}>
                {gradient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {background === "none" && (
        <div className="space-y-2">
          <Label htmlFor="background">Solid Color</Label>
          <div className="flex gap-2">
            <Input
              id="background"
              type="color"
              value={background === "none" ? "#ffffff" : background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-12 h-12 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={background === "none" ? "#ffffff" : background}
              onChange={(e) => setBackground(e.target.value)}
              className="font-mono"
              placeholder="#000000"
            />
          </div>
        </div>
      )}
    </div>
  );
}