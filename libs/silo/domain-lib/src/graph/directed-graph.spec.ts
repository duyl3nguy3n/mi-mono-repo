import { DirectedGraph } from './directed-graph';

describe('DirectedGraph', () => {
  let directedGraph: DirectedGraph<number>;

  beforeEach(() => {
    directedGraph = new DirectedGraph<number>();
  });

  it('should create directed graph', () => {
    expect(directedGraph).toBeTruthy();
    expect(directedGraph.isDirected).toBeTruthy();
  });

  it('addEdge() should add directed edge from start node to end node', () => {
    // arrange
    directedGraph.addNode('a', 1);
    directedGraph.addNode('b', 2);
    directedGraph.addEdge('a', 'b');
    // assert
    expect(directedGraph.hasEdge('a', 'b')).toBeTruthy();
    expect(directedGraph.hasEdge('b', 'a')).toBeFalsy();
  });

  it('removeEdge() should remove directed edge from start node to end node', () => {
    // arrange
    directedGraph.addNode('a', 1);
    directedGraph.addNode('b', 2);
    directedGraph.addEdge('a', 'b');
    expect(directedGraph.hasEdge('a', 'b')).toBeTruthy();
    directedGraph.removeEdge('a', 'b');
    // assert
    expect(directedGraph.hasEdge('a', 'b')).toBeFalsy();
  });

  it('removeEdge() should remove directed edge from start node to end node', () => {
    // arrange
    directedGraph.addNode('a', 1);
    directedGraph.addNode('b', 2);
    directedGraph.addEdge('a', 'b', 5);
    expect(directedGraph.getEdgeWeight('a', 'b')).toBe(5);
    directedGraph.setEdgeWeight('a', 'b', 10);
    // assert
    expect(directedGraph.getEdgeWeight('a', 'b')).toBe(10);
  });
});
