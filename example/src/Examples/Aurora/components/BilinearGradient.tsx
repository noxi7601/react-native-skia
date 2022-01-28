import React from "react";
import type { ColorProp, IRect } from "@shopify/react-native-skia";
import {
  processColorAsUnitArray,
  Shader,
  vec,
  Skia,
} from "@shopify/react-native-skia";

const source = Skia.RuntimeEffect.Make(`
uniform vec2 size;
uniform vec4 color0;
uniform vec4 color1;
uniform vec4 color2;
uniform vec4 color3;

vec4 main(vec2 pos) {
  vec2 uv = pos/size;
  vec4 colorA = mix(color0, color1, uv.x);
  vec4 colorB = mix(color2, color3, uv.x);
  return mix(colorA, colorB, uv.y);
}`)!;

interface BilinearGradientProps {
  rect: IRect;
  colors: ColorProp[];
}

export const BilinearGradient = ({
  rect: { width, height },
  colors,
}: BilinearGradientProps) => {
  const [color0, color1, color2, color3] = colors.map((cl) =>
    processColorAsUnitArray(cl, 1)
  );
  console.log([color0, color1, color2, color3]);
  return (
    <Shader
      source={source}
      uniforms={{ size: vec(width, height), color0, color1, color2, color3 }}
    />
  );
};