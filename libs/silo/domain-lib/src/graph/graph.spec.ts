import { Graph } from './graph';

describe('Graph', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    graph = new Graph<number>();
  });

  it('should create graph', () => {
    expect(graph).toBeTruthy();
    expect(graph.isDirected).toBeFalsy();
  });

  it('addNode() should add node with unique key', () => {
    // arrange
    graph.addNode('a', 1);
    // throw error if key is not unique
    expect(() => graph.addNode('a', 2)).toThrowError();
    // assert
    const nodeA = graph.findNode('a');
    expect(nodeA).toBeTruthy();
    expect(nodeA.key).toBe('a');
    expect(nodeA.value).toBe(1);
  });

  it('getNode() should find node with unique key', () => {
    // arrange
    graph.addNode('a', 1);
    const nodeA = graph.getNode('a');
    // throw error if key does not exist
    expect(() => graph.getNode('b')).toThrowError();
    // assert
    expect(nodeA).toBeTruthy();
    expect(nodeA.key).toBe('a');
    expect(nodeA.value).toBe(1);
  });

  it('findNode() should find node with unique key', () => {
    // arrange
    graph.addNode('a', 1);
    const nodeA = graph.findNode('a');
    // return undefined if key does not exist
    expect(graph.findNode('b')).toBeUndefined();
    // assert
    expect(nodeA).toBeTruthy();
    expect(nodeA.key).toBe('a');
    expect(nodeA.value).toBe(1);
  });

  it('removeNode() should remove node and all of its edges', () => {
    // arrange
    graph.addNode('a', 1);
    graph.addNode('b', 2);
    graph.addNode('c', 3);
    graph.addEdge('a', 'b');
    graph.addEdge('b', 'c');
    expect(graph.findNode('b')).toBeTruthy();
    expect(graph.hasEdge('a', 'b')).toBeTruthy();
    expect(graph.hasEdge('b', 'c')).toBeTruthy();
    graph.removeNode('b');
    // throw error if node doesn't exist
    expect(() => graph.removeNode('d')).toThrowError();
    // assert
    expect(graph.findNode('b')).toBeUndefined();
    expect(graph.hasEdge('a', 'b')).toBeFalsy();
    expect(graph.hasEdge('b', 'c')).toBeFalsy();
  });

  it('setNodeValue() should set the node with new value', () => {
    // arrange
    graph.addNode('a', 1);
    expect(graph.getNodeValue('a')).toBe(1);
    graph.setNodeValue('a', 2);
    // throw error if node doesn't exist
    expect(() => graph.setNodeValue('b', 2)).toThrowError();
    // assert
    expect(graph.getNodeValue('a')).toBe(2);
  });

  it('getNodeValue() should get the node value for specify node key', () => {
    // arrange
    graph.addNode('a', 1);
    // throw error if node doesn't exist
    expect(() => graph.getNodeValue('b')).toThrowError();
    // assert
    expect(graph.getNodeValue('a')).toBe(1);
  });

  it('findAdjacentNodes() should return all adjacent nodes', () => {
    // arrange
    graph.addNode('a', 1);
    graph.addNode('b', 2);
    graph.addNode('c', 3);
    graph.addEdge('a', 'b');
    graph.addEdge('b', 'c');
    // assert
    const adjacents = graph.findAdjacentNodes('b');
    expect(adjacents.length).toBe(2);
    expect(adjacents.find((x) => x.key === 'a')).toBeTruthy();
    expect(adjacents.find((x) => x.key === 'c')).toBeTruthy();
  });

  it('addEdge() should add edge between 2 nodes ', () => {
    // arrange
    graph.addNode('a', 1);
    graph.addNode('b', 2);
    graph.addEdge('a', 'b', 5);
    // throw error if edge already exist
    expect(() => graph.addEdge('a', 'b', 10)).toThrowError();
    // assert
    expect(graph.hasEdge('a', 'b')).toBeTruthy();
    expect(graph.hasEdge('b', 'a')).toBeTruthy();
  });

  it('hasEdge() should return true if 2 nodes has edge', () => {
    // arrange
    graph.addNode('a', 1);
    graph.addNode('b', 2);
    graph.addEdge('a', 'b', 5);
    // return false if 2 nodes doesn't have edge
    expect(graph.hasEdge('a', 'c')).toBeFalsy();
    // assert
    expect(graph.hasEdge('a', 'b')).toBeTruthy();
    expect(graph.hasEdge('b', 'a')).toBeTruthy();
  });
});
