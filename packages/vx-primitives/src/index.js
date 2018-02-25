let base = {
  Svg: "svg",
  Circle: "circle",
  Ellipse: "ellipse",
  G: "g",
  LinearGradient: "linearGradient",
  RadialGradient: "radialGradient",
  Line: "line",
  Path: "path",
  Polygon: "polygon",
  Polyline: "polyline",
  Rect: "rect",
  Symbol: "symbol",
  Text: "text",
  Use: "use",
  Defs: "defs",
  Stop: "stop",
  TSpan: "tspan",
  TextPath: "textpath",
  Pattern: "pattern",
  ClipPath: "clipPath",
};

export const inject = primitives => (base = primitives);
export const buildInject = primitive => {
  let injectBase = {};
  Object.keys(base).map(key => {
    injectBase[key] = primitive[key];
  });
  inject(injectBase);
};
export const getPrimitives = () => base;
