const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const primary_main = "#4e24f2";
export const secondary_main = "#24f25e";

export const warning_main = "#ffc120";
export const info_main = "#21f396";

export const success_main = "#1bde51";
export const error_main = "#ff4b2f";

export const text_ligth_primary = "#0c0c14";
export const text_ligth_secondary = "#181828";

export const text_dark_primary = "#ffffff";
export const text_dark_secondary = "#e1e1fc";
export const text_disabled = "#8d8da8";

export const ColorSchema = {
  light: {
    text: text_ligth_primary,
    background: "#fff",
    tint: primary_main,
    tabIconDefault: "#ccc",
    tabIconSelected: primary_main,
  },
  dark: {
    text: text_dark_primary,
    background: text_ligth_primary,
    tint: text_dark_secondary,
    tabIconDefault: "#ccc",
    tabIconSelected: text_dark_secondary,
  },
};
