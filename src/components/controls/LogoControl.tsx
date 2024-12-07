import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LogoControlProps {
  setLogo: (value: string | null) => void;
  logoColor: string;
  setLogoColor: (color: string) => void;
  logoPosition: "top" | "bottom" | "above-title";
  setLogoPosition: (position: "top" | "bottom" | "above-title") => void;
}

export function LogoControl({ 
  setLogo, 
  logoColor,
  setLogoColor,
  logoPosition,
  setLogoPosition,
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

      <div className="space-y-2">
        <Label>Logo Position</Label>
        <RadioGroup value={logoPosition} onValueChange={(value: "top" | "bottom" | "above-title") => setLogoPosition(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="top" id="top" />
            <Label htmlFor="top">Top</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bottom" id="bottom" />
            <Label htmlFor="bottom">Bottom</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="above-title" id="above-title" />
            <Label htmlFor="above-title">Above Title</Label>
          </div>
        </RadioGroup>
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
              <SelectItem value="#F5F5F5">Off-white</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </Card>
  );
}