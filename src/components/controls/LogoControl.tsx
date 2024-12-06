import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LogoControlProps {
  setLogo: (value: string | null) => void;
  logoPosition: { x: number; y: number };
  setLogoPosition: (position: { x: number; y: number }) => void;
  logoColor: string;
  setLogoColor: (color: string) => void;
  logoScale: number;
  setLogoScale: (scale: number) => void;
}

export function LogoControl({ 
  setLogo, 
  logoPosition, 
  setLogoPosition,
  logoColor,
  setLogoColor,
  logoScale,
  setLogoScale
}: LogoControlProps) {
  const [fileType, setFileType] = useState<"png" | "svg" | null>(null);

  const checkPNGTransparency = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(false);
          
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const hasTransparency = Array.from(imageData.data).some((value, index) => 
            (index + 1) % 4 === 0 && value < 255
          );
          resolve(hasTransparency);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'png') {
      const hasTransparency = await checkPNGTransparency(file);
      if (!hasTransparency) {
        toast.error('Only PNG files with transparency are allowed');
        return;
      }
      setFileType('png');
    } else if (fileExtension === 'svg') {
      setFileType('svg');
    } else {
      toast.error('Only .png or .svg files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="logo">Logo (.png with transparency or .svg)</Label>
        <Input
          id="logo"
          type="file"
          accept=".png,.svg"
          onChange={handleLogoUpload}
          className="cursor-pointer"
        />
      </div>

      {fileType === 'svg' && (
        <div className="space-y-2">
          <Label>Logo Color</Label>
          <Select value={logoColor} onValueChange={setLogoColor}>
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="#000000">Black</SelectItem>
              <SelectItem value="#FFFFFF">White</SelectItem>
              <SelectItem value="#6E59A5">Purple</SelectItem>
              <SelectItem value="#1EAEDB">Blue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Logo Scale ({Math.round(logoScale * 100)}%)</Label>
        <Slider
          value={[logoScale]}
          onValueChange={([value]) => setLogoScale(value)}
          min={0.1}
          max={2}
          step={0.1}
        />
      </div>

      <div className="space-y-2">
        <Label>Horizontal Position</Label>
        <Slider
          value={[logoPosition.x]}
          onValueChange={([value]) => setLogoPosition({ ...logoPosition, x: value })}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>Vertical Position</Label>
        <Slider
          value={[logoPosition.y]}
          onValueChange={([value]) => setLogoPosition({ ...logoPosition, y: value })}
          min={0}
          max={100}
          step={1}
        />
      </div>
    </Card>
  );
}