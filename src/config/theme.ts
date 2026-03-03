export const colorSchemes = ["teal", "gold", "bronze"] as const;

export type ColorScheme = (typeof colorSchemes)[number];

// Change one line here to switch the global accent palette.
export const activeColorScheme: ColorScheme = "teal";

export const appThemes = ["light", "dark", "cyan"] as const;

export type AppTheme = (typeof appThemes)[number];

export const appThemeOptions: ReadonlyArray<{ label: string; value: AppTheme }> = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Cyan", value: "cyan" },
];

export const defaultAppTheme: AppTheme = "light";

export const isAppTheme = (theme: string): theme is AppTheme =>
  appThemes.includes(theme as AppTheme);

export const sonnerThemeByAppTheme: Record<AppTheme, "light" | "dark"> = {
  light: "light",
  dark: "dark",
  cyan: "light",
};
