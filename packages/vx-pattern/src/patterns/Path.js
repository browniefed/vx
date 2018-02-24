import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Pattern from './Pattern';
import { getPrimitives } from '@vx/primitives';

export default function PatternPath({
  id,
  width,
  height,
  path,
  fill = 'transparent',
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap = 'square',
  shapeRendering = 'auto',
  background,
  className,
}) {
  const { Path, Rect } = getPrimitives();

  return (
    <Pattern
      id={id}
      width={width}
      height={height}
    >
      {!!background &&
        <Rect
          width={width}
          height={height}
          fill={background}
        />
      }
      <Path
        className={cx('vx-pattern-path', className)}
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap={strokeLinecap}
        shapeRendering={shapeRendering}
      />
    </Pattern>
  );
}

PatternPath.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,
}
