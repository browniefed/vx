import React from 'react';
import { getPrimitives } from '@vx/primitives';

export default function DefaultNode() {
  const { Circle } = getPrimitives();


  return <Circle r={15} fill="#21D4FD" />;
}
