import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Shuffle, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

interface BackgroundControlProps {
  background: string;
  setBackground: (value: string) => void;
}

export function BackgroundControl({ background, setBackground }: BackgroundControlProps) {
  const [gradientAngle, setGradientAngle] = useState("90");
  const [gradientMotion, setGradientMotion] = useState(false);
  
  const gradients = [
    { name: "None (Solid Color)", value: "none" },
    { name: "Ocean", value: "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)" },
    { name: "Sage", value: "linear-gradient(90deg, #E3E6E3 0%, #CBD5CD 100%)" },
    { name: "Dusk", value: "linear-gradient(90deg, #F6F4F8 0%, #E2DDE7 100%)" },
    { name: "Sand", value: "linear-gradient(90deg, #F5F3F0 0%, #E8E2D9 100%)" },
    { name: "Mist", value: "linear-gradient(90deg, #EFF1F3 0%, #E2E6EA 100%)" },
  ];

  const updateGradientAngle = (angle: string) => {
    if (background === "none" || !background.includes("gradient")) return;
    
    const newAngle = parseInt(angle);
    if (isNaN(newAngle)) return;
    
    setGradientAngle(angle);
    const currentGradient = gradients.find(g => g.value.includes(background.split("linear-gradient")[1].split(",")[1]));
    if (!currentGradient) return;
    
    const newGradient = currentGradient.value.replace(
      /linear-gradient\(\d+deg/,
      `linear-gradient(${newAngle}deg`
    );
    setBackground(newGradient);
  };

  const randomizeGradientStyle = () => {
    if (background === "none" || !background.includes("gradient")) return;

    const currentGradient = gradients.find(g => g.value === background);
    if (!currentGradient) return;

    const styles = ["linear", "radial", "conic"];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const angle = Math.floor(Math.random() * 360);
    setGradientAngle(angle.toString());
    
    const colors = currentGradient.value.match(/hsla?\([^)]+\)|#[A-Fa-f0-9]{6}/g) || [];
    
    if (colors.length >= 2) {
      let newGradient = "";
      
      switch (randomStyle) {
        case "linear":
          newGradient = `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
          break;
        case "radial":
          const x = Math.floor(Math.random() * 100);
          const y = Math.floor(Math.random() * 100);
          newGradient = `radial-gradient(circle at ${x}% ${y}%, ${colors[0]} 0%, ${colors[1]} 100%)`;
          break;
        case "conic":
          const rotation = Math.floor(Math.random() * 360);
          newGradient = `conic-gradient(from ${rotation}deg at 50% 50%, ${colors[0]} 0%, ${colors[1]} 100%)`;
          break;
      }
      
      setBackground(newGradient);
    }
  };

  return (
    <div className="space-y-4 dark">
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
        </div>
      </div>

      {background !== "none" && background.includes("gradient") && (
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <Label>Gradient Angle</Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    type="number"
                    min="0"
                    max="360"
                    value={gradientAngle}
                    onChange={(e) => updateGradientAngle(e.target.value)}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    deg
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateGradientAngle("0")}
                  title="Reset angle"
                  className="shrink-0"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={randomizeGradientStyle}
                  title="Randomize gradient style"
                  className="shrink-0"
                >
                  <Shuffle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="gradient-motion"
              checked={gradientMotion}
              onCheckedChange={setGradientMotion}
            />
            <Label htmlFor="gradient-motion">Enable gradient motion</Label>
          </div>
        </Card>
      )}

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