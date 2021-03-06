import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkVertical } from 'd3-shape';
import additionalProps from '../../../util/additionalProps';
import { getPrimitives } from '@vx/primitives';

LinkVertical.propTypes = {
  innerRef: PropTypes.func,
};

export default function LinkVertical({
  className,
  innerRef,
  data,
  x = d => d.x,
  y = d => d.y,
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {
  const { Path } = getPrimitives();

  const link = linkVertical();
  link.x(x);
  link.y(y);
  link.source(source);
  link.target(target);

  return (
    <Path
      ref={innerRef}
      className={cx('vx-link-vertical', className)}
      d={link(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
