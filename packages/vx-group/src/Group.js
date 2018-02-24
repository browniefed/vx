import React from 'react';
import cx from 'classnames';
import { getPrimitives } from '@vx/primitives';

export default function Group({
  top = 0,
  left = 0,
  transform,
  className,
  children,
  ...restProps,
}) {
  const { G } = getPrimitives();
  return (
    <G
      className={cx('cx-group', className)}
      transform={transform || `translate(${left}, ${top})`}
      {...restProps}
    >
      {children}
    </G>
  );
}
