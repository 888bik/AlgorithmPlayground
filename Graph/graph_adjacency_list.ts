/* 顶点类定义 */
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
  //顶点
  // private vertex: T[] = [];
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
}
const graph = new GraphAdjList<string>();
const vet1 = new Vertex<string>("A");
const vet2 = new Vertex<string>("B");
const vet3 = new Vertex<string>("C");
const vet4 = new Vertex<string>("D");
const vet5 = new Vertex<string>("E");
graph.addVertex(vet1);
graph.addVertex(vet2);
graph.addVertex(vet3);
graph.addVertex(vet4);
graph.addVertex(vet5);
graph.addEdge(vet1, vet2);
graph.addEdge(vet1, vet3);
graph.addEdge(vet3, vet4);
console.log(graph.size());
graph.print();

console.log("---------------------------------");
graph.removeVertex(vet1);
// graph.removeEdge(vet1, vet3);

graph.print();
export {};
