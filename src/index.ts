import { RouteGraph, RouteInfo, RouteHandler } from 'hybrid-navigation'

export interface DeckGraph extends RouteGraph {
  layout: 'deck'
  children: [RouteGraph, RouteGraph]
}

export function isDeckGraph(graph: RouteGraph): graph is DeckGraph {
  return graph.layout === 'deck'
}

export async function deckRouteHandler(graph: RouteGraph, route: RouteInfo, next: RouteHandler) {
  if (!isDeckGraph(graph)) {
    return false
  }
  return await next(graph.children[1], route, next)
}
