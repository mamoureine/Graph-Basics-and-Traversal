class Graph {
  constructor(isDirected = false) {
    // Create a graph. Use a Map for adjacency list storage.
    // If isDirected=false, the graph is undirected.
    this.isDirected = isDirected;
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    // Add a new vertex to the adjacency list if it is not already present.
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(source, destination) {
    // Ensure both vertices exist in the graph.
    this.addVertex(source);
    this.addVertex(destination);

    // Add the edge from source to destination.
    this.adjacencyList.get(source).push(destination);

    // For undirected graphs, also add the reverse edge.
    if (!this.isDirected) {
      this.adjacencyList.get(destination).push(source);
    }
  }

  removeEdge(source, destination) {
    // Remove the edge from source to destination if source exists.
    if (!this.adjacencyList.has(source)) return;

    this.adjacencyList.set(
      source,
      this.adjacencyList
        .get(source)
        .filter((neighbor) => neighbor !== destination)
    );

    // If the graph is undirected, also remove the reverse edge.
    if (!this.isDirected && this.adjacencyList.has(destination)) {
      this.adjacencyList.set(
        destination,
        this.adjacencyList
          .get(destination)
          .filter((neighbor) => neighbor !== source)
      );
    }
  }

  hasEdge(source, destination) {
    // Check if the source vertex has destination in its adjacency list.
    return (
      this.adjacencyList.has(source) &&
      this.adjacencyList.get(source).includes(destination)
    );
  }

  printGraph() {
    // Print each vertex and its list of adjacent vertices.
    for (const [vertex, neighbors] of this.adjacencyList.entries()) {
      console.log(`${vertex} -> ${neighbors.join(', ')}`);
    }
  }

  dfs(start) {
    // Depth-first search using recursion.
    const visited = new Set();
    const order = [];

    const explore = (vertex) => {
      // Stop if the vertex does not exist or has already been visited.
      if (!this.adjacencyList.has(vertex) || visited.has(vertex)) return;

      // Mark the vertex as visited and record it.
      visited.add(vertex);
      order.push(vertex);

      // Visit all neighbors recursively.
      for (const neighbor of this.adjacencyList.get(vertex)) {
        explore(neighbor);
      }
    };

    // Start DFS from the given start vertex.
    explore(start);
    console.log(`DFS order from ${start}: ${order.join(' -> ')}`);
    return order;
  }

  bfs(start) {
    // Breadth-first search using a queue.
    if (!this.adjacencyList.has(start)) {
      console.log(`BFS order from ${start}: `);
      return [];
    }

    const visited = new Set([start]);
    const queue = [start];
    const order = [];

    while (queue.length > 0) {
      // Remove the next vertex from the queue.
      const vertex = queue.shift();
      order.push(vertex);

      // Visit each neighbor if it has not been visited yet.
      for (const neighbor of this.adjacencyList.get(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    console.log(`BFS order from ${start}: ${order.join(' -> ')}`);
    return order;
  }
}

// Example usage and basic validation
const graph = new Graph(false);

// Build an undirected graph with at least 3 vertices.
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');

console.log('Graph adjacency list:');
graph.printGraph();

console.log('\nEdge checks:');
console.log('A -> B exists?', graph.hasEdge('A', 'B'));
console.log('B -> A exists?', graph.hasEdge('B', 'A'));

graph.removeEdge('A', 'B');
console.log('After removing edge A-B:');
console.log('A -> B exists?', graph.hasEdge('A', 'B'));
console.log('B -> A exists?', graph.hasEdge('B', 'A'));

console.log('\nTraversals:');
graph.dfs('A');
graph.bfs('A');

// Directed graph example to show directed traversal behavior.
const directedGraph = new Graph(true);
directedGraph.addEdge('1', '2');
directedGraph.addEdge('1', '3');
directedGraph.addEdge('2', '4');

console.log('\nDirected graph adjacency list:');
directedGraph.printGraph();
console.log('\nDirected graph traversals:');
directedGraph.dfs('1');
directedGraph.bfs('1');
