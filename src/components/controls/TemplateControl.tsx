import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { templates } from "@/lib/templates";

interface TemplateControlProps {
  activeTemplate: string;
  setActiveTemplate: (value: string) => void;
}

export function TemplateControl({ activeTemplate, setActiveTemplate }: TemplateControlProps) {
  return (
    <div className="space-y-2">
      <Label>Template Size</Label>
      <Select value={activeTemplate} onValueChange={setActiveTemplate}>
        <SelectTrigger>
          <SelectValue placeholder="Select template size" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(templates).map(([key, template]) => (
            <SelectItem key={key} value={key}>
              {template.name} ({template.width}x{template.height})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}