import React from "react";
import { getPrimitives } from '@vx/primitives';

export default function HierarchyDefaultNode({ node }) {
  const { Circle } = getPrimitives();

  return <Circle cx={node.x} cy={node.y} r={15} fill="#21D4FD" />;
}
