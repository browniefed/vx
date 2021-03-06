import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkHorizontal } from 'd3-shape';
import additionalProps from '../../../util/additionalProps';
import { getPrimitives } from '@vx/primitives';

LinkHorizontal.propTypes = {
  innerRef: PropTypes.func,
};

export default function LinkHorizontal({
  className,
  innerRef,
  data,
  x = d => d.y,
  y = d => d.x,
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {
  const { Path } = getPrimitives();

  const link = linkHorizontal();
  link.x(x);
  link.y(y);
  link.source(source);
  link.target(target);

  return (
    <Path
      ref={innerRef}
      className={cx('vx-link-horizontal', className)}
      d={link(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
