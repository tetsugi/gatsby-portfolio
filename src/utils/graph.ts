import { GraphData } from "react-force-graph-3d"

export const getRandomTree = (n: number, reverse = false): GraphData => {
  const keys = [...Array(n).keys()]

  return {
    nodes: keys.map((id) => ({ id })),
    links: keys.filter((id) => id).map(id => ({
      [reverse ? "target" : "source"]: id,
      [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
    })),
  }
}
