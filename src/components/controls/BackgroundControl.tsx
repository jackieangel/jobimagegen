import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shuffle } from "lucide-react";

interface BackgroundControlProps {
  background: string;
  setBackground: (value: string) => void;
}

export function BackgroundControl({ background, setBackground }: BackgroundControlProps) {
  const gradients = [
    { name: "None (Solid Color)", value: "none" },
    { name: "Ocean", value: "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)" },
    { name: "Sage", value: "linear-gradient(90deg, #E3E6E3 0%, #CBD5CD 100%)" },
    { name: "Dusk", value: "linear-gradient(90deg, #F6F4F8 0%, #E2DDE7 100%)" },
    { name: "Sand", value: "linear-gradient(90deg, #F5F3F0 0%, #E8E2D9 100%)" },
    { name: "Mist", value: "linear-gradient(90deg, #EFF1F3 0%, #E2E6EA 100%)" },
  ];

  const randomizeGradientDirection = () => {
    if (background === "none" || !background.includes("linear-gradient")) return;

    const currentGradient = gradients.find(g => g.value === background);
    if (!currentGradient) return;

    const angle = Math.floor(Math.random() * 360);
    const newGradient = currentGradient.value.replace(/\d+deg/, `${angle}deg`);
    setBackground(newGradient);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Background Style</Label>
        <div className="flex gap-2">
          <Select 
            value={background === "" ? "none" : background} 
            onValueChange={setBackground}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a background style..." />
            </SelectTrigger>
            <SelectContent>
              {gradients.map((gradient) => (
                <SelectItem key={gradient.name} value={gradient.value}>
                  {gradient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {background !== "none" && background.includes("linear-gradient") && (
            <Button
              variant="outline"
              size="icon"
              onClick={randomizeGradientDirection}
              title="Randomize gradient direction"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          )}
        </div>
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