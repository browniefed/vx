import React from "react";
import { getPrimitives } from "@vx/primitives";

export default function Clip({ id, children, ...restProps }) {
  const { ClipPath, Defs } = getPrimitives();
  return (
    <Defs>
      <ClipPath id={id} {...restProps}>
        {children}
      </ClipPath>
    </Defs>
  );
}
