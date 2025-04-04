class CirNode<T> {
  value: T;
  next: CirNode<T> | null;
  prev: CirNode<T> | null;
  constructor(value: T, next?: CirNode<T> | null, prev?: CirNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
    this.prev = prev === undefined ? null : prev;
  }
}

class CircularLinkedList<T> {
  private head: CirNode<T> | null = null;
  private tail: CirNode<T> | null = null;
  private size: number = 0;

  append(value: T) {
    const newNode = new CirNode<T>(value);
    //空链表处理
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      newNode.next = this.head;
      this.head.prev = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  /**
   *
   * @param node 传入节点进行删除
   * @returns
   */
  remove(node: CirNode<T>): void {
    if (this.size === 0) return;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      const prevNode = node.prev!;
      const nextNode = node.next!;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      //处理特殊情况:如果是删除头节点或者尾节点
      if (node === this.head) {
        this.head = nextNode;
      }
      if (node === this.tail) {
        this.tail = prevNode;
      }
      this.size--;
    }
  }
  removeByValue(value: T): boolean {
    let current = this.head;
    let nodeToRemove: CirNode<T> | null = null;
    do {
      if (current?.value === value) {
        nodeToRemove = current;
        break;
      }
      current = current?.next!;
    } while (current && current !== this.head);
    if (nodeToRemove) {
      this.remove(nodeToRemove);
      return true;
    }
    return false;
  }
  removeByIndex(position: number): T | null {
    //判断position是否越界
    if (position < 0 || position >= this.size) {
      throw "参数不合法";
    }
    let index = 0;
    let current = this.head;
    while (index < position && current) {
      current = current.next;
      index++;
    }
    //此时index === position
    this.remove(current!);

    return current?.value ?? null;
  }
  traverse() {
    let current = this.head;
    const res: T[] = [];
    if (!current) return;
    do {
      // console.log(current.value);
      res.push(current.value);
      current = current.next;
    } while (current && current !== this.head);
    res.push(this.head!.value);
    console.log(res.join("->"));
  }

  get length() {
    return this.size;
  }
}
const linkedList = new CircularLinkedList();
linkedList.append("aaa");
linkedList.append("bbb");
linkedList.append("ccc");
linkedList.append("ddd");
linkedList.append("abc");
linkedList.traverse();
// linkedList.append("xxx");
// linkedList.removeByIndex(1);
// linkedList.traverse();
// console.log(linkedList.length);
// linkedList.removeByIndex(4);
// linkedList.traverse();
// console.log(linkedList.length);
linkedList.removeByValue("abc");
linkedList.removeByValue("aaa");
linkedList.traverse()
export {};
