import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkRadial } from 'd3-shape';
import additionalProps from '../../../util/additionalProps';
import { Path } from 'react-primitives-svg';

LinkRadial.propTypes = {
  innerRef: PropTypes.func,
};

export default function LinkRadial({
  className,
  innerRef,
  data,
  angle = d => d.x,
  radius = d => d.y,
  source = d => d.source,
  target = d => d.target, 
  ...restProps
}) {
  const link = linkRadial()
  link.angle(angle);
  link.radius(radius);
  link.source(source);
  link.target(target);

  return (
    <Path
      ref={innerRef}
      className={cx('vx-link-radius', className)}
      d={link(data)}
      {...additionalProps(restProps, data)}
    />
  );
}