/* @flow */

export type chart$Reduce = (
  (p: Object, v: Object) => Object,
  (p: Object, v: Object) => Object,
  () => Object
) => Object;

export type chart$ReduceSum = ((p: Object) => number) => Object;

export type Margin = {
  margins: ({
    top: number,
    right: number,
    bottom: number,
    left: number
  }) => Margin
}

export type chart$Dimension = (void | (value: Array<string|number>) => Array<string | number>) => Object;

export type chart$Group = (f: Reduce | ReduceSum) => Object;

export type chart$Color = {
  colors: (value: string) => Color,
  colorDomain: (value: Array<string>) => Color,
  colorAccessor: ((p: Object) => string) => Color
}

export type chart$CoordinateGrid = {
  xUnits(value?: () => Array<number>): Array<number> | CoordinateGrid,
  round(value?: () => number): number | CoordinateGrid,
  elasticX(value?: bool): bool | CoordinateGrid,
  elasticY(value?: bool): bool | CoordinateGrid,
  xAxisPadding(value: number): CoordinateGrid,
  yAxisPadding(value: number): CoordinateGrid,
  x: (() => Array<number>) => CoordinateGrid,
  y: (() => Array<number>) => CoordinateGrid,
  renderHorizontalGridLines: (value?: bool) => bool | CoordinateGrid
}

export type chart$BaseChart = Margin & Color & CoordinateGrid & {
  width: (value: number) => BaseChart,
  height: (value: number) => BaseChart,
  dimension: Dimension,
  group: Group,
  transitionDuration: (value: number) => BaseChart,
  keyAccessor: ((p: Object) => string) => BaseChart,
  valueAccessor: ((p: Object) => number) => BaseChart,   
  label: (p: Object => string | number) => BaseChart,
  renderLabel: (value: bool) => BaseChart,
  renderTitle: (value: bool) => BaseChart,  
  render: () => void
}

export type chart$LineChart = BaseChart & {
  renderArea(value?: bool): bool | LineChart  
}

export type chart$BubbleChart = BaseChart & {
  maxBubbleRelativeSize(value?: number): number | BubbleChart,
  r: (() => Array<number>) => BubbleChart,
  radiusValueAccessor: (value?: (o: Object) => string | number) => Function | BubbleChart
}

export type chart$BarChart = BaseChart & {
  centerBar: (value?: bool) => bool | BarChart
} 

export type chart$Dim = {
  name: string,
  isDate?: bool,
  isOrdinal?: bool,
  xpadding: number,
  type: string,
  ordinalValues?: Array<string>,
  ordinalValuesInverted?: Array<string>,
  extent?: Array<string | number>,
  tickRound?: number,
  dimension?: Dimension,
  group?: Group
};

declare module 'chart' {
  declare var Reduce: chart$Reduce;
  declare var ReduceSum: chart$ReduceSum;
  declare var Dimension: chart$Dimension;
  declare var Group: chart$Group;
  declare var CoordinateGrid: chart$CoordinateGrid;
  declare var BaseChart: chart$BaseChart;
  declare var LineChart: chart$LineChart;
  declare var BarChart: chart$BarChart;
  declare var Dim: chart$Dim;
}
