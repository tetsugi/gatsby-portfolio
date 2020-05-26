import { HEADER_HEIGHT } from "@/utils/dimens"
import { getRandomTree } from "@/utils/graph"
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d"
import React, { useEffect, useRef } from "react"
import useWindowSize from "@/hooks/useWindowSize"

type CosmosProps = {
  distance?: number;
}

const data = getRandomTree(200)
const GROUPS = 16

const Cosmos: React.FC<CosmosProps> = ({ distance = 1400 }) => {
  const ref = useRef<ForceGraphMethods>({} as ForceGraphMethods)
  const { height } = useWindowSize()

  useEffect(() => {
    ref.current.cameraPosition({ z: distance })
    
    let angle = 0

    const time = setInterval(() => {
      const radian = (angle * Math.PI) / 180

      ref.current.cameraPosition({
        x: distance * Math.sin(radian),
        z: distance * Math.cos(radian),
      })

      angle += 0.4
      if (angle >= 360) angle = 0
    }, 10)

    return () => clearInterval(time)
  }, [])

  return (
    <ForceGraph3D
      ref={ref}
      height={height - HEADER_HEIGHT - 6}
      graphData={data}
      // @ts-ignore
      nodeAutoColorBy={d => d.id % GROUPS}
      // @ts-ignore
      linkAutoColorBy={d => data.nodes[d.source].id % GROUPS}
      linkWidth={2}
      enableNodeDrag={false}
      enableNavigationControls={false}
      showNavInfo={false}
    />
  )
}

export default Cosmos
