import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LogoControlProps {
  setLogo: (value: string | null) => void;
}

export function LogoControl({ setLogo }: LogoControlProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="logo">Company Logo</Label>
      <Input
        id="logo"
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="cursor-pointer"
      />
    </div>
  );
}