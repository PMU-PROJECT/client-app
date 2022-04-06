// const tintColorLight = "#2f95dc";
// const tintColorDark = "#fff";

export const primary_main_blue = "#4e24f2";
export const secondary_main = "#24f25e";
export const primary_main_green = "#02b087";

export const warning_main = "#ffc120";
export const info_main = "#21f396";

export const success_main = "#1bde51";
export const error_main = "#ff4b2f";

export const text_light_primary = "#0c0c14";
export const text_light_secondary = "#181828";

export const text_dark_primary = "#ffffff";
export const text_dark_secondary = "#e1e1fc";
export const text_disabled = "#8d8da8";

export const new_green = "#00B761"; //"#53B476";
export const new_black = "#343535";

export const ColorSchema = {
  light: {
    text: text_light_primary,
    background: "#fff",
    tint: primary_main_green,
    tabIconDefault: "#ccc",
    tabIconSelected: primary_main_green,
    formButton: "#02b087",
  },
  dark: {
    text: text_dark_primary,
    background: "#000",
    tint: text_dark_secondary,
    formButton: "#1bde51",
    tabIconDefault: "#ccc",
    tabIconSelected: text_dark_secondary,
  },
  default: {
    dark_green: "#00664e",
    dark_green_alpha: "rgba(0, 102, 78, 0.85)",
    warning: warning_main,
    error: error_main,
    success: secondary_main,
    disabled: text_disabled,
    disabledButton: "rgba(141, 141, 168, 0.25)",
    formButtonAlpha: "rgba(2, 176, 135, 0.85)",
  },
};
