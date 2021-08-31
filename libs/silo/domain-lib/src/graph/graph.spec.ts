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
    graph.addNode('a', 1);
    // throw error if key is not unique
    expect(() => graph.addNode('a', 2)).toThrowError();
    // assert
    const nodeA = graph.findNode('a');
    expect(nodeA.key).toBe('a');
    expect(nodeA.value).toBe(1);
  });

  it('findNode() should find node with unique key', () => {
    graph.addNode('a', 1);
    const nodeA = graph.findNode('a');
    // return undefined if key does not exist
    expect(graph.findNode('b')).toBeUndefined();
    // assert
    expect(nodeA).toBeTruthy();
    expect(nodeA.key).toBe('a');
    expect(nodeA.value).toBe(1);
  });

  it('addEdge() should add edge between 2 nodes ', () => {
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
