import { RouteGraph } from 'react-native-navigation-hybrid'

export interface DeckGraph extends RouteGraph {
  layout: 'deck'
  children: [RouteGraph, RouteGraph]
}

export function isDeckGraph(graph: RouteGraph): graph is DeckGraph {
  return graph.layout === 'deck'
}
