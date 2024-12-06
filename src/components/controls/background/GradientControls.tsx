import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Shuffle, RotateCcw } from "lucide-react";
import { useEffect } from "react";

interface GradientControlsProps {
  background: string;
  setBackground: (value: string) => void;
  gradientAngle: string;
  setGradientAngle: (value: string) => void;
  gradientMotion: boolean;
  setGradientMotion: (value: boolean) => void;
}

export function GradientControls({
  background,
  setBackground,
  gradientAngle,
  setGradientAngle,
  gradientMotion,
  setGradientMotion,
}: GradientControlsProps) {
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

  useEffect(() => {
    const editorElement = document.querySelector('[data-gradient-motion]');
    if (editorElement) {
      if (gradientMotion) {
        editorElement.classList.add('gradient-motion');
      } else {
        editorElement.classList.remove('gradient-motion');
      }
    }
  }, [gradientMotion]);

  return (
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
  );
}