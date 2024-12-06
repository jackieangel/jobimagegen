import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobTitleControlProps {
  jobTitle: string;
  setJobTitle: (value: string) => void;
  jobTitleFont: string;
  setJobTitleFont: (value: string) => void;
  jobTitleSize: string;
  setJobTitleSize: (value: string) => void;
}

const fontOptions = ["Playfair Display", "Inter", "Arial", "Georgia", "Times New Roman"];
const sizeOptions = ["3xl", "4xl", "5xl", "6xl", "7xl"];

export function JobTitleControl({
  jobTitle,
  setJobTitle,
  jobTitleFont,
  setJobTitleFont,
  jobTitleSize,
  setJobTitleSize,
}: JobTitleControlProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          id="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title"
        />
      </div>

      <div className="space-y-2">
        <Label>Job Title Font</Label>
        <Select value={jobTitleFont} onValueChange={setJobTitleFont}>
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map(font => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Job Title Size</Label>
        <Select value={jobTitleSize} onValueChange={setJobTitleSize}>
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {sizeOptions.map(size => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}