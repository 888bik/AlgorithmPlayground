import IStack from "./stackType";

class ArrayStack<T> implements IStack<T> {
  private data: T[] = [];
  push(element: T): void {
    this.data.push(element);
  }
  pop(): T | undefined {
    return this.data.pop();
  }
  peek(): T | undefined {
    return this.data[this.data.length - 1];
  }
  isEmpty(): boolean {
    return this.data.length === 0;
  }
  size(): number {
    return this.data.length;
  }
}
// const stack1 = new ArrayStack<String>();
// stack1.push("aaa");
// stack1.push("bbb");
// stack1.push("ccc");
// console.log(stack1.size());
// stack1.pop();
// stack1.pop();
// console.log(stack1.peek());
// stack1.pop();
// console.log(stack1.isEmpty());

export { ArrayStack };
