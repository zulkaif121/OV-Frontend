export const colorSchemes = ["teal", "gold", "bronze"] as const;

export type ColorScheme = (typeof colorSchemes)[number];

// Change one line here to switch the global accent palette.
export const activeColorScheme: ColorScheme = "teal";
