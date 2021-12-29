import React from 'react'
import { remap } from '../utils/numberUtils';

interface FunctionDiagramProps {
  calculateY: (x: number) => number,
  progress?: number | number[],
  showProgressCircle?: boolean,
  pointCount?: number,
  styles?: {
    circleColor?: string,
    circleRadius?: number,
    graphColor?: string,
    graphStrokeWidth?: number
  }
}

export const FunctionDiagram = ({
  calculateY,
  progress = 0.5,
  pointCount = 50,
  showProgressCircle = true,
  styles = {
    circleColor: "white",
    circleRadius: 8,
    graphColor: "white",
    graphStrokeWidth: 2
  }
}: FunctionDiagramProps) => {
  const points: [number, number][] = [];

  for (let x = 0; x < pointCount; x++) {
    const actualX = remap(0, pointCount - 1, 0, 1, x);
    points.push([actualX, calculateY(actualX)])
  }

  const lines = points.slice(0, -1).map((point, i) => {
    return [
      point,
      points[i + 1]
    ]
  })

  return (
    <svg style={{ width: "100%", height: "100%" }}>
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
          }}></line>
      })}
      {showProgressCircle && (typeof (progress) === "number" ? [progress] : [...progress]).map(p => <circle key={p} cx={`${p * 100}%`} cy={`${calculateY(p) * 100}%`} r={styles.circleRadius} style={{ fill: styles.circleColor }} />)}
    </svg >
  )
}
