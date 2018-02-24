import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPrimitives } from '@vx/primitives';

RadialGradient.propTypes = {
  id: PropTypes.string.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
  fromOffset: PropTypes.string,
  fromOpacity: PropTypes.number,
  toOffset: PropTypes.string,
  toOpacity: PropTypes.number,
  rotate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transform: PropTypes.string,
};

export default function RadialGradient({
  children,
  id,
  from,
  to,
  fromOffset = '0%',
  fromOpacity = 1,
  toOffset = '100%',
  toOpacity = 1,
  rotate,
  transform,
  ...restProps
}) {
  const { Defs, Stop, RadialGradient: RadialGrad } = getPrimitives();

  const stops = (
    <Fragment>
      <Stop offset={fromOffset} stopColor={from} stopOpacity={fromOpacity} />
      <Stop offset={toOffset} stopColor={to} stopOpacity={toOpacity} />
    </Fragment>
  );

  return (
    <Defs>
      <RadialGrad
        id={id}
        gradientTransform={rotate ? `rotate(${rotate})` : transform}
        {...restProps}
      >
        {children ? children : stops}
      </RadialGrad>
    </Defs>
  );
}
