import { remap } from "../utils/numberUtils";

interface FunctionDiagramProps {
  calculateY: (x: number) => number,
  progress?: number | number[],
  showProgressCircle?: boolean,
  pointCount?: number,
  showHorizontalLine?: boolean,
  horizontalLineY?: number
  styles?: {
    circleColor?: string,
    circleRadius?: number | string,
    graphColor?: string,
    graphStrokeWidth?: number | string,
    horizontalLineColor?: string,
    horizontalLineThickness?: number | string
  }
}

export const FunctionDiagram = ({
  calculateY,
  progress = 0.5,
  pointCount = 50,
  showProgressCircle = true,
  showHorizontalLine = false,
  horizontalLineY = 0.5,
  styles = {
    circleColor: "white",
    circleRadius: 8,
    graphColor: "white",
    graphStrokeWidth: 2,
    horizontalLineColor: "white",
    horizontalLineThickness: 2
  },
  ...props
}: FunctionDiagramProps & React.SVGProps<SVGSVGElement>) => {
  const points: [number, number][] = [];

  for (let x = 0; x < pointCount; x++) {
    const actualX = remap(0, pointCount - 1, 0, 1, x);
    points.push([actualX, 1 - calculateY(actualX)]);
  }

  const lines = points.slice(0, -1).map((point, i) => {
    return [
      point,
      points[i + 1]
    ];
  });

  return (
    <svg style={{ width: "100%", height: "100%" }} {...props}>
      {lines.map(line => {
        return <line
          key={`${line[0][0]},${line[0][1]},${line[1][0]},${line[1][1]}`}
          x1={`${line[0][0] * 100}%`}
          y1={`${line[0][1] * 100}%`}
          x2={`${line[1][0] * 100}%`}
          y2={`${line[1][1] * 100}%`}
          style={{
            stroke: styles.graphColor,
            strokeWidth: styles.graphStrokeWidth
          }}></line>;
      })}
      {showHorizontalLine && <line x1="0%" y1={`${100 - horizontalLineY * 100}%`} x2="100%" y2={`${100 - horizontalLineY * 100}%`} style={{ stroke: styles.horizontalLineColor, strokeWidth: styles.horizontalLineThickness }}></line>}
      {showProgressCircle && (typeof (progress) === "number" ? [progress] : [...progress]).map(p => <circle key={p} cx={`${p * 100}%`} cy={`${(1 - calculateY(p)) * 100}%`} r={styles.circleRadius} style={{ fill: styles.circleColor }} />)}
    </svg >
  );
};
