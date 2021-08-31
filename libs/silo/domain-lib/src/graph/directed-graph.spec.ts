import { DirectedGraph } from './directed-graph';

describe('DirectedGraph', () => {
  let directedGraph = new DirectedGraph();
  it('should create directed graph', () => {
    expect(directedGraph).toBeTruthy();
    expect(directedGraph.isDirected).toBeTruthy();
  });
});
