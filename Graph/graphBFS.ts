class Vertex<T> {
  value: T;

  constructor(val: T) {
    this.value = val;
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return `Vertex(${this.value})`;
  }
}
class GraphAdjList<T> {
  // 邻接表，key：顶点，value：该顶点的所有邻接顶点
  private adjList: Map<Vertex<T>, Vertex<T>[]> = new Map();

  /**
   *
   * @returns 返回大小
   */
  size() {
    return this.adjList.size;
  }
  /**
   * 添加顶点
   * @param vet
   * @returns
   */
  addVertex(vet: Vertex<T>) {
    //判断是否已经存在
    if (this.adjList.has(vet)) return;

    this.adjList.set(vet, []);
  }
  /**
   * 添加边
   * @param vet1
   * @param vet2
   */
  addEdge(vet1: Vertex<T>, vet2: Vertex<T>) {
    if (!this.adjList.get(vet1) || !this.adjList.get(vet2) || vet1 === vet2) {
      throw "参数不合法";
    }
    this.adjList.get(vet1)?.push(vet2);
    this.adjList.get(vet2)?.push(vet1);
  }
  /**
   * 删除顶点
   * @param vet
   */
  removeVertex(vet: Vertex<T>) {
    //查看顶点是否存在
    if (!this.adjList.has(vet)) {
      throw "参数不合法";
    }
    //将顶点删除
    this.adjList.delete(vet);
    //遍历其他顶点中的邻接表是否存在要删除的顶点
    for (const set of this.adjList.values()) {
      const index = set.indexOf(vet);
      if (index > -1) {
        set.splice(index, 1);
      }
    }
  }

  /**
   * 删除边
   * @param vet1
   * @param vet2
   */
  removeEdge(vet1: Vertex<T>, vet2: Vertex<T>) {
    if (!this.adjList.has(vet1) || !this.adjList.has(vet2) || vet1 === vet2) {
      throw "参数不合法";
    }

    //要删除边的索引
    const delEdgeIndex1 = this.adjList.get(vet1)?.indexOf(vet2);
    if (delEdgeIndex1 !== undefined) {
      this.adjList.get(vet1)?.splice(delEdgeIndex1, 1);
    }
    const delEdgeIndex2 = this.adjList.get(vet2)?.indexOf(vet1);
    if (delEdgeIndex2 !== undefined) {
      this.adjList.get(vet2)?.splice(delEdgeIndex2, 1);
    }
    console.log(delEdgeIndex1, delEdgeIndex2);
  }

  /**
   * 打印邻接表
   */
  print() {
    for (const [key, value] of this.adjList.entries()) {
      const temp = [];
      for (const vertex of value) {
        temp.push(vertex.value);
      }
      console.log(key.value + ": " + temp.join());
    }
  }

  // BFS： 基于队列，入队列的顶点先被探索。
  graphBFS(startVet: Vertex<T>) {
    //判断是否有顶点
    if (!this.adjList.size) return;

    //创建一个队列访问每一个顶点
    const queue: Vertex<T>[] = [];
    queue.push(startVet);

    //创建一个Set,记录被访问过的顶点
    const visited = new Set<Vertex<T>>();
    visited.add(startVet);

    //遍历队列中的顶点
    while (queue.length) {
      const vertex = queue.shift()!;
      console.log(vertex.value);

      //将顶点中的相连顶点加入到队列中
      for (const adjVet of this.adjList.get(vertex) ?? []) {
        //跳过已被访问过的顶点
        if (visited.has(adjVet)) continue;
        queue.push(adjVet);
        visited.add(adjVet);
      }
    }
  }
}
const graph = new GraphAdjList<string>();
const vet1 = new Vertex<string>("A");
const vet2 = new Vertex<string>("B");
const vet3 = new Vertex<string>("C");
const vet4 = new Vertex<string>("D");
const vet5 = new Vertex<string>("E");
const vet6 = new Vertex<string>("F");
const vet7 = new Vertex<string>("G");
const vet8 = new Vertex<string>("H");
const vet9 = new Vertex<string>("I");
graph.addVertex(vet1);
graph.addVertex(vet2);
graph.addVertex(vet3);
graph.addVertex(vet4);
graph.addVertex(vet5);
graph.addVertex(vet6);
graph.addVertex(vet7);
graph.addVertex(vet8);
graph.addVertex(vet9);
graph.addEdge(vet1, vet2);
graph.addEdge(vet1, vet3);
graph.addEdge(vet1, vet4);
graph.addEdge(vet3, vet4);
graph.addEdge(vet3, vet7);
graph.addEdge(vet4, vet7);
graph.addEdge(vet4, vet8);
graph.addEdge(vet2, vet5);
graph.addEdge(vet2, vet6);
graph.addEdge(vet5, vet9);

// console.log(graph.size());
// graph.print();

console.log("---------------------------------");
graph.graphBFS(vet1);
// graph.removeVertex(vet1);
// graph.removeEdge(vet1, vet3);
// graph.print();
export {};
