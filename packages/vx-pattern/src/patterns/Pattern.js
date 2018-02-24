import React from 'react';
import PropTypes from 'prop-types';
import { getPrimitives } from '@vx/primitives';

export default function Pattern({
  id,
  width,
  height,
  children,
}) {
  const { Defs, Pattern } = getPrimitives();

  return (
    <Defs>
      <Pattern
        id={id}
        width={width}
        height={height}
        patternUnits="userSpaceOnUse"
      >
        {children}
      </Pattern>
    </Defs>
  );
}

Pattern.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired
}
