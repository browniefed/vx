import React from 'react';
import cx from 'classnames';
import { G } from 'react-primitives-svg';

export default function Group({
  top = 0,
  left = 0,
  transform,
  className,
  children,
  ...restProps,
}) {
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
