export interface Template {
  name: string;
  width: number;
  height: number;
}

export const templates: Record<string, Template> = {
  "instagram-post": {
    name: "Instagram Post",
    width: 1080,
    height: 1080,
  },
  "instagram-story": {
    name: "Instagram Story",
    width: 1080,
    height: 1920,
  },
  "linkedin-post": {
    name: "LinkedIn Post",
    width: 1200,
    height: 627,
  },
};