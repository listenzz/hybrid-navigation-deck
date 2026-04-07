import { RouteGraph, RouteInfo, RouteHandler, isTargetLocateIn } from 'hybrid-navigation'

export interface DeckGraph extends RouteGraph {
  layout: 'deck'
  children: [RouteGraph, RouteGraph]
}

export function isDeckGraph(graph: RouteGraph): graph is DeckGraph {
  return graph.layout === 'deck'
}

export class DeckRouteHandler implements RouteHandler {
  process(graph: RouteGraph, target: RouteInfo): Promise<[boolean, RouteGraph | null]> {
    if (!isDeckGraph(graph)) {
      throw new Error('DeckRouteHandler can only be used with a DeckGraph')
    }

    const { children } = graph
    if (isTargetLocateIn(children[1], target)) {
      return Promise.resolve([true, children[1]])
    }

    return Promise.resolve([false, null])
  }
}
