import { RouteGraph, RouteParser, RouterT, RouteInfo } from 'react-native-navigation-hybrid'

export interface DeckGraph extends RouteGraph {
  layout: 'deck'
  children: [RouteGraph, RouteGraph]
}

export function isDeckGraph(graph: RouteGraph): graph is DeckGraph {
  return graph.layout === 'deck'
}

export const deckParser: RouteParser = {
  navigateTo(router: RouterT, graph: RouteGraph, route: RouteInfo) {
    if (!isDeckGraph(graph)) {
      return false
    }
    return router.navigateTo(graph.children[1], route)
  },
}
