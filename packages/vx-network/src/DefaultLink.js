import React from 'react';
import { getPrimitives } from '@vx/primitives';

export default function DefaultLink({ link }) {
  const { Line } = getPrimitives();

  return (
    <Line
      x1={link.source.x}
      y1={link.source.y}
      x2={link.target.x}
      y2={link.target.y}
      strokeWidth={2}
      stroke="#999"
      strokeOpacity={0.6}
    />
  );
}
