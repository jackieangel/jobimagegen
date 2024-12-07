import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

export function LicenseButton() {
  return (
    <Button
      onClick={() => window.open('https://lovable.lemonsqueezy.com/checkout', '_blank')}
      className="rounded-full bg-white hover:bg-white/90 text-black shadow-sm px-3"
      size="sm"
    >
      <Key className="w-4 h-4 mr-1.5" />
      Get License
    </Button>
  );
}