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
    { name: "Ocean", value: "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)" },
    { name: "Sage", value: "linear-gradient(90deg, #E3E6E3 0%, #CBD5CD 100%)" },
    { name: "Dusk", value: "linear-gradient(90deg, #F6F4F8 0%, #E2DDE7 100%)" },
    { name: "Sand", value: "linear-gradient(90deg, #F5F3F0 0%, #E8E2D9 100%)" },
    { name: "Mist", value: "linear-gradient(90deg, #EFF1F3 0%, #E2E6EA 100%)" },
  ];

  const updateGradientAngle = (angle: string) => {
    if (!background.includes("gradient")) return;
    
    const newAngle = parseInt(angle);
    if (isNaN(newAngle) || newAngle < 0 || newAngle > 360) return;
    
    setGradientAngle(angle);
    const currentGradient = background.replace(/\d+deg/, `${newAngle}deg`);
    setBackground(currentGradient);
  };

  const randomizeGradientAngle = () => {
    if (!background.includes("gradient")) return;
    
    const angle = Math.floor(Math.random() * 360);
    setGradientAngle(angle.toString());
    const currentGradient = background.replace(/\d+deg/, `${angle}deg`);
    setBackground(currentGradient);
  };

  const isValidHexColor = (color: string) => {
    return /^#([A-Fa-f0-9]{3}){1,2}$/.test(color);
  };

  const handleColorChange = (value: string) => {
    if (value.startsWith('#')) {
      if (isValidHexColor(value)) {
        setBackground(value);
      }
    } else if (value.startsWith('#')) {
      if (value.length <= 7) {
        setBackground(value);
      }
    } else {
      setBackground('#' + value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6));
    }
  };

  return (
    <div className="space-y-4 dark">
      <div className="space-y-2">
        <Label>Background Color</Label>
        <div className="flex gap-2">
          <Select 
            value={background}
            onValueChange={setBackground}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a background color..." />
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

      {background.includes("gradient") && (
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
                  onClick={randomizeGradientAngle}
                  title="Randomize gradient angle"
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

      {!background.includes("gradient") && (
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
      )}
    </div>
  );
}