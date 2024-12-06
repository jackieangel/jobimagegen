import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface JobItemProps {
  jobTitle: string;
  setJobTitle: (value: string) => void;
  jobTitleFont: string;
  setJobTitleFont: (value: string) => void;
  jobTitleSize: string;
  setJobTitleSize: (value: string) => void;
}

export function JobItem({
  jobTitle,
  setJobTitle,
  jobTitleFont,
  setJobTitleFont,
  jobTitleSize,
  setJobTitleSize,
}: JobItemProps) {
  return (
    <div className="space-y-3 rounded-lg border p-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title..."
        />
      </div>

      <div className="space-y-2">
        <Label>Font Style</Label>
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
      </div>

      <div className="space-y-2">
        <Label>Font Size</Label>
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
      </div>
    </div>
  );
}