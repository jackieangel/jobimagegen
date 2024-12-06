import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

export function LicenseButton() {
  return (
    <Button
      onClick={() => window.open('https://lovable.lemonsqueezy.com/checkout', '_blank')}
      className="rounded-full bg-black hover:bg-black/90 text-white shadow-sm px-3"
      size="sm"
    >
      <Key className="w-4 h-4 mr-1.5" />
      Get License
    </Button>
  );
}