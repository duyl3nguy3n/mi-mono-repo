import { DuplicatedRecordError } from '../errors/duplicated-record-error';
import { NoRecordFoundError } from '../errors/no-record-found-error';

export interface GraphNode<T = unknown> {
  key: string;
  value: T;
}

export interface GraphEdge {
  startNodeKey: string;
  endNodeKey: string;
  weight: number;
}

/**
 * Non-directed graph consists of a set of nodes or vertices
 * and a set of edges (which can be assigned a numeric weight)
 * that represent connections between those nodes.
 */
export class Graph<T = unknown> {
  protected _nodes = new Map<string, T>();
  protected _edges = new Map<string, GraphEdge>();

  protected _isDirected = false;
  get isDirected() {
    return this._isDirected;
  }

  /**
   * Adds a new node with the specified key and value
   */
  addNode(nodeKey: string, nodeValue: T): void {
    if (this._nodes.has(nodeKey)) {
      throw new DuplicatedRecordError(nodeKey);
    }

    this._nodes.set(nodeKey, nodeValue);
  }

  /**
   * Gets node with specified key
   */
  getNode(nodeKey: string): GraphNode<T> {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    return {
      key: nodeKey,
      value: this._nodes.get(nodeKey),
    };
  }

  /**
   * Finds node with specified key
   */
  findNode(nodeKey: string): GraphNode<T> | undefined {
    if (!this._nodes.has(nodeKey)) {
      return undefined;
    }

    return {
      key: nodeKey,
      value: this._nodes.get(nodeKey),
    };
  }

  /**
   * Removes node with specified key
   */
  removeNode(nodeKey: string): void {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    this._nodes.delete(nodeKey);
    for (let { startNodeKey, endNodeKey } of this._edges.values()) {
      if (startNodeKey === nodeKey || endNodeKey === nodeKey) {
        this._edges.delete(JSON.stringify([startNodeKey, endNodeKey]));
      }
    }
  }

  /**
   * Set the node value for specified node key
   */
  setNodeValue(nodeKey: string, nodeValue: T): void {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    this._nodes.set(nodeKey, nodeValue);
  }

  /**
   * Get the node value for specified node key
   */
  getNodeValue(nodeKey: string): T {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    return this._nodes.get(nodeKey);
  }

  /**
   * Gets all adjacent nodes for given node key
   */
  getAdjacentNodes(nodeKey: string): Array<GraphNode<T>> {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    return [...this._edges.values()].reduce(
      (adjacents, { startNodeKey, endNodeKey }) => {
        if (startNodeKey === nodeKey) {
          adjacents.push(this.getNode(endNodeKey));
        }

        return adjacents;
      },
      [],
    );
  }

  /**
   * Gets total number of edges that go into a given node key
   */
  getNodeIndegree(nodeKey: string): number {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    return [...this._edges.values()].reduce((indegree, { endNodeKey }) => {
      if (endNodeKey === nodeKey) {
        indegree += 1;
      }
      return indegree;
    }, 0);
  }

  /**
   * Gets total number of edges that go out from given node key
   */
  getNodeOutdegree(nodeKey: string): number {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    return [...this._edges.values()].reduce((outdegree, { startNodeKey }) => {
      if (startNodeKey === nodeKey) {
        outdegree += 1;
      }
      return outdegree;
    }, 0);
  }

  /**
   * Adds an edge between 2 given nodes, optionally setting its weight
   */
  addEdge(startNodeKey: string, endNodeKey: string, weight = 0): void {
    this._addEdge(startNodeKey, endNodeKey, weight);
    if (!this._isDirected) {
      this._addEdge(endNodeKey, startNodeKey, weight);
    }
  }

  /**
   * Checks if graph has an edge between 2 given nodes
   */
  hasEdge(startNodeKey: string, endNodeKey: string): boolean {
    return this._edges.has(JSON.stringify([startNodeKey, endNodeKey]));
  }

  /**
   * Removes the edge between 2 given nodes
   */
  removeEdge(startNodeKey: string, endNodeKey: string): void {
    this._edges.delete(JSON.stringify([startNodeKey, endNodeKey]));
    if (!this._isDirected) {
      this._edges.delete(JSON.stringify([endNodeKey, startNodeKey]));
    }
  }

  /**
   * Gets the weight of given edge
   */
  getEdgeWeight(startNodeKey: string, endNodeKey: string): number {
    const edgeKey = JSON.stringify([startNodeKey, endNodeKey]);
    if (!this._edges.has(edgeKey)) {
      throw new NoRecordFoundError(edgeKey);
    }

    return this._edges.get(edgeKey).weight;
  }

  /**
   * Sets the weight of given edge
   */
  setEdgeWeight(
    startNodeKey: string,
    endNodeKey: string,
    weight: number,
  ): void {
    this._setEdge(startNodeKey, endNodeKey, weight);
    if (!this._isDirected) {
      this._setEdge(endNodeKey, startNodeKey, weight);
    }
  }

  /**
   * Adds edge and its weight between 2 given nodes if it does not exist
   */
  private _addEdge(startNodeKey: string, endNodeKey: string, weight: number) {
    const edgeKey = JSON.stringify([startNodeKey, endNodeKey]);
    if (this._edges.has(edgeKey)) {
      throw new DuplicatedRecordError(edgeKey);
    }

    this._edges.set(edgeKey, { startNodeKey, endNodeKey, weight });
  }

  /**
   * Sets edge and its weight between 2 given nodes if it exists
   */
  private _setEdge(startNodeKey: string, endNodeKey: string, weight: number) {
    const edgeKey = JSON.stringify([startNodeKey, endNodeKey]);
    if (!this._edges.has(edgeKey)) {
      throw new NoRecordFoundError(edgeKey);
    }

    this._edges.set(edgeKey, { startNodeKey, endNodeKey, weight });
  }
}
