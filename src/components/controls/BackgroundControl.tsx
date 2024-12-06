import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { GradientControls } from "./background/GradientControls";
import { SolidColorControls } from "./background/SolidColorControls";
import { Card } from "@/components/ui/card";

interface BackgroundControlProps {
  background: string;
  setBackground: (value: string) => void;
  onThemeChange?: (isDark: boolean) => void;
}

export function BackgroundControl({ background, setBackground, onThemeChange }: BackgroundControlProps) {
  const [gradientAngle, setGradientAngle] = useState("90");
  const [gradientMotion, setGradientMotion] = useState(false);
  
  const gradients = [
    { name: "Ocean", value: "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)" },
    { name: "Sage", value: "linear-gradient(90deg, #E3E6E3 0%, #CBD5CD 100%)" },
    { name: "Dusk", value: "linear-gradient(90deg, #F6F4F8 0%, #E2DDE7 100%)" },
    { name: "Sand", value: "linear-gradient(90deg, #F5F3F0 0%, #E8E2D9 100%)" },
    { name: "Mist", value: "linear-gradient(90deg, #EFF1F3 0%, #E2E6EA 100%)" },
    { name: "Cedar", value: "linear-gradient(90deg, hsl(25, 50%, 30%) 0%, hsl(25, 50%, 20%) 100%)" },
    { name: "Nightshade", value: "linear-gradient(90deg, hsl(250, 25%, 10%) 0%, hsl(250, 25%, 13%) 100%)" },
  ];

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

  const handleBackgroundChange = (value: string) => {
    setBackground(value);
    const isDarkTheme = 
      value.includes("Cedar") || 
      value.includes("Nightshade") ||
      value.toLowerCase().includes("linear-gradient") && (
        value.includes("hsl(25, 50%, 20%)") || // Cedar
        value.includes("hsl(250, 25%, 10%)") // Nightshade
      );
    onThemeChange?.(isDarkTheme);
  };

  useEffect(() => {
    if (background.includes("gradient")) {
      const match = background.match(/\d+deg/);
      if (match) {
        setGradientAngle(match[0].replace("deg", ""));
      }
    }
  }, [background]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          Background
        </Label>
      </div>

      <Select 
        value={background}
        onValueChange={handleBackgroundChange}
      >
        <SelectTrigger>
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

      {background.includes("gradient") ? (
        <GradientControls
          background={background}
          setBackground={setBackground}
          gradientAngle={gradientAngle}
          setGradientAngle={setGradientAngle}
          gradientMotion={gradientMotion}
          setGradientMotion={setGradientMotion}
        />
      ) : (
        <SolidColorControls
          background={background}
          handleColorChange={handleColorChange}
        />
      )}
    </div>
  );
}