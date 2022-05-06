import React, { useState } from "react";
import { Text } from "react-native";

type TextProps = {
  fontSize: number;
  text: string;
  styles: {};
  numberOfLines: number;
};

/**
 * @component
 * @param fontSize number of the font size
 * @param text string text to be displayed
 * @param styles object containing additional css styles for the component
 * @param numberOfLines number of lines that text should be displayed on
 * @description Custom text component for automaticly sizing the text to fit
 */
export const ScalableText: React.FC<TextProps> = ({
  fontSize,
  text,
  styles,
  numberOfLines,
}) => {
  const [currentFont, setCurrentFont] = useState(fontSize);

  return (
    <Text
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit
      style={[styles, { fontSize: currentFont }]}
      onTextLayout={(e) => {
        const { lines } = e.nativeEvent;
        if (lines.length > numberOfLines) {
          setCurrentFont(currentFont - 1);
        }
      }}
    >
      {text}
    </Text>
  );
};
