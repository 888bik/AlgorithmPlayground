import IQueue from "./queueType";

class ArrayQueue<T> implements IQueue<T> {
  private data: T[] = [];
  enqueue(element: T): void {
    this.data.push(element);
  }
  dequeue(): T | undefined {
    return this.data.shift();
  }
  peek(): T | undefined {
    return this.data[0];
  }
  isEmpty(): boolean {
    return this.data.length === 0;
  }
  size(): number {
    return this.data.length;
  }
}
const queue = new ArrayQueue<string>();
queue.enqueue("aaa");
queue.enqueue("bbb");
queue.enqueue("ccc");
console.log(queue.size());
console.log(queue.dequeue());
console.log(queue.peek());
console.log(queue.isEmpty());
export { ArrayQueue };
