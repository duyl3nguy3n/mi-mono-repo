import { Graph } from './graph';

/**
 * Directed graph consists of a set of nodes or vertices
 * and a set of edges (which can be assigned a numeric weight)
 * that represent directed connection between those nodes.
 */
export class DirectedGraph<T = unknown> extends Graph<T> {
  constructor() {
    super();
    this._isDirected = true;
    Object.seal(this);
  }
}
