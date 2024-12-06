import { Label } from "@/components/ui/label";
import { JobItem } from "./job/JobItem";

interface JobTitleControlProps {
  jobTitle: string;
  setJobTitle: (value: string) => void;
  jobTitleFont: string;
  setJobTitleFont: (value: string) => void;
  jobTitleSize: string;
  setJobTitleSize: (value: string) => void;
  jobPosition: { x: number; y: number };
  setJobPosition: (position: { x: number; y: number }) => void;
}

export function JobTitleControl({
  jobTitle,
  setJobTitle,
  jobTitleFont,
  setJobTitleFont,
  jobTitleSize,
  setJobTitleSize,
  jobPosition,
  setJobPosition,
}: JobTitleControlProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          Job
        </Label>
      </div>

      <JobItem
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        jobTitleFont={jobTitleFont}
        setJobTitleFont={setJobTitleFont}
        jobTitleSize={jobTitleSize}
        setJobTitleSize={setJobTitleSize}
        jobPosition={jobPosition}
        setJobPosition={setJobPosition}
      />
    </div>
  );
}