import React, { useState } from "react";
import { Text } from "react-native";

type TextProps = {
  fontSize: number;
  text: string;
  styles: {};
  numberOfLines: number;
};

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
