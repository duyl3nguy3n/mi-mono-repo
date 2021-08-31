import { DuplicatedRecordError } from '../errors/duplicated-record-error';
import { NoRecordFoundError } from '../errors/no-record-found-error';
import { NotImplementError } from '../errors/not-implement-error';

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
   * Adds a new node with the specify key and value
   */
  addNode(nodeKey: string, nodeValue: T): void {
    if (this._nodes.has(nodeKey)) {
      throw new DuplicatedRecordError(nodeKey);
    }

    this._nodes.set(nodeKey, nodeValue);
  }

  /**
   * Finds node with specify key
   */
  findNode(nodeKey: string): GraphNode | undefined {
    if (!this._nodes.has(nodeKey)) {
      return undefined;
    }

    return {
      key: nodeKey,
      value: this._nodes.get(nodeKey),
    };
  }

  /**
   * Removes node with specify key
   */
  removeNode(nodeKey: string): void {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    this._nodes.delete(nodeKey);
    for (let edge of this._edges.values()) {
      if (edge.startNodeKey === nodeKey || edge.endNodeKey === nodeKey) {
        this._edges.delete(
          JSON.stringify([edge.startNodeKey, edge.endNodeKey]),
        );
      }
    }
  }

  /**
   * Set the node value for specify node key
   */
  setNodeValue(nodeKey: string, nodeValue: T): void {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    this._nodes.set(nodeKey, nodeValue);
  }

  /**
   * Get the node value for specify node key
   */
  getNodeValue(nodeKey: string): T {
    if (!this._nodes.has(nodeKey)) {
      throw new NoRecordFoundError(nodeKey);
    }

    return this._nodes.get(nodeKey);
  }

  /**
   * Finds all adjacent nodes for given node key
   */
  findAdjacentNodes(nodeKey: string): Array<GraphNode> {
    throw new NotImplementError();
  }

  /**
   * Gets total number of edges that go into a given node key
   * @param nodeKey Get
   */
  getNodeIndegree(nodeKey: string): number {
    throw new NotImplementError();
  }

  /**
   * Gets total number of edges that go out from given node key
   * @param nodeKey Get
   */
  getNodeOutdegree(nodeKey: string): number {
    throw new NotImplementError();
  }

  /**
   * Adds an edge between 2 given nodes, optionally setting its weight
   */
  addEdge(startNodeKey: string, endNodeKey: string, weight = 0): void {
    const edgeKey = JSON.stringify([startNodeKey, endNodeKey]);
    if (this._edges.has(edgeKey)) {
      throw new DuplicatedRecordError(edgeKey);
    }

    this._edges.set(edgeKey, {
      startNodeKey,
      endNodeKey,
      weight,
    });

    if (!this._isDirected) {
      this._edges.set(JSON.stringify([endNodeKey, startNodeKey]), {
        startNodeKey: endNodeKey,
        endNodeKey: startNodeKey,
        weight,
      });
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
    throw new NotImplementError();
  }

  /**
   * Sets the weight of given edge
   */
  setEdgeWeight(startNodeKey: string, endNodeKey: string, weight = 0): void {
    throw new NotImplementError();
  }

  /**
   * Gets the weight of given edge
   */
  getEdgeWeight(startNodeKey: string, endNodeKey: string, weight = 0): number {
    throw new NotImplementError();
  }
}
