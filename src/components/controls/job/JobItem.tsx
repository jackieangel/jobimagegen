import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface JobItemProps {
  jobTitle: string;
  setJobTitle: (value: string) => void;
  jobTitleFont: string;
  setJobTitleFont: (value: string) => void;
  jobTitleSize: string;
  setJobTitleSize: (value: string) => void;
  jobPosition: { x: number; y: number };
  setJobPosition: (position: { x: number; y: number }) => void;
}

export function JobItem({
  jobTitle,
  setJobTitle,
  jobTitleFont,
  setJobTitleFont,
  jobTitleSize,
  setJobTitleSize,
  jobPosition,
  setJobPosition,
}: JobItemProps) {
  return (
    <Card className="space-y-4 p-4">
      <Input
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Enter job title..."
      />

      <Select value={jobTitleFont} onValueChange={setJobTitleFont}>
        <SelectTrigger>
          <SelectValue placeholder="Select font style..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Playfair Display">Playfair Display</SelectItem>
          <SelectItem value="Archivo">Archivo</SelectItem>
          <SelectItem value="Inter">Inter</SelectItem>
        </SelectContent>
      </Select>

      <Select value={jobTitleSize} onValueChange={setJobTitleSize}>
        <SelectTrigger>
          <SelectValue placeholder="Select font size..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm">Small</SelectItem>
          <SelectItem value="base">Medium</SelectItem>
          <SelectItem value="lg">Large</SelectItem>
          <SelectItem value="xl">Extra Large</SelectItem>
        </SelectContent>
      </Select>

      <div className="space-y-2">
        <Label>Horizontal Position</Label>
        <Slider
          value={[jobPosition.x]}
          onValueChange={([value]) => setJobPosition({ ...jobPosition, x: value })}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>Vertical Position</Label>
        <Slider
          value={[jobPosition.y]}
          onValueChange={([value]) => setJobPosition({ ...jobPosition, y: value })}
          min={0}
          max={100}
          step={1}
        />
      </div>
    </Card>
  );
}