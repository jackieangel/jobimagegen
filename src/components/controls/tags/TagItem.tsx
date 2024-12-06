import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { darkThemeColors, lightThemeColors, getColorLabel } from "@/utils/colorUtils";

interface TagItemProps {
  id: number;
  text: string;
  background: string;
  isDarkTheme: boolean;
  onUpdate: (id: number, text: string) => void;
  onUpdateBackground: (id: number, background: string) => void;
  onRemove: (id: number) => void;
}

export function TagItem({
  id,
  text,
  background,
  isDarkTheme,
  onUpdate,
  onUpdateBackground,
  onRemove,
}: TagItemProps) {
  return (
    <Card key={id} className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            value={text}
            onChange={(e) => onUpdate(id, e.target.value)}
            placeholder="Enter tag text"
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(id)}
          className="h-10 w-10 shrink-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div>
        <Select 
          value={background} 
          onValueChange={(bg) => onUpdateBackground(id, bg)}
        >
          <SelectTrigger>
            <SelectValue>
              {getColorLabel(background, isDarkTheme)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {(isDarkTheme ? darkThemeColors : lightThemeColors).map(bg => (
              <SelectItem key={bg.value} value={bg.value}>
                {bg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}