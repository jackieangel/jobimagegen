export const lightThemeColors = [
  { label: "Light Gray", value: "rgba(243, 244, 246, 0.8)" },
  { label: "Light Blue", value: "rgba(224, 242, 254, 0.8)" },
  { label: "Light Green", value: "rgba(220, 252, 231, 0.8)" },
  { label: "Light Purple", value: "rgba(243, 232, 255, 0.8)" },
  { label: "Light Pink", value: "rgba(252, 231, 243, 0.8)" },
];

export const darkThemeColors = [
  { label: "Dark Gray", value: "rgba(255, 255, 255, 0.15)" },
  { label: "Dark Blue", value: "rgba(30, 58, 138, 0.9)" },
  { label: "Dark Purple", value: "rgba(88, 28, 135, 0.9)" },
];

export const getColorLabel = (value: string, isDarkTheme: boolean) => {
  const colors = isDarkTheme ? darkThemeColors : lightThemeColors;
  const color = colors.find(color => color.value === value);
  return color ? color.label : isDarkTheme ? "Dark Gray" : "Light Gray";
};