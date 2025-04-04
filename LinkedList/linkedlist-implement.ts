//定义节点类
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  constructor(value: T, next?: ListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next; //下一个引用
  }
}

class LinkedList<T> {
  private headNode: ListNode<T> | null = null;
  private size: number = 0;

  get length(): number {
    return this.size;
  }
  //尾部追加节点
  append(value: T) {
    const newNode = new ListNode<T>(value);
    if (!this.headNode) {
      this.headNode = newNode;
    } else {
      // 遍历链表找到尾部节点，将新节点链接到尾部
      let current = this.headNode;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  //遍历链表
  traverse() {
    const value: T[] = [];
    let current = this.headNode;
    while (current) {
      value.push(current.value);
      current = current.next;
    }
    console.log(value.join("->"));
  }
  //在指定位置后面插入节点
  insert(value: T, position: number) {
    //判断越界
    if (position < 0 || position > this.size) return false;

    const newNode = new ListNode(value);
    //插入头部
    if (position === 0) {
      newNode.next = this.headNode;
      this.headNode = newNode;
    } else {
      //插入中间或者尾部
      let index = 0;
      let current = this.headNode;
      let prev: ListNode<T> | null = null;
      while (index < position && current) {
        prev = current;
        current = current?.next;
        index++;
      }
      //index === position
      prev!.next = newNode;
      newNode.next = current;
    }
    this.size++;
    return true;
  }
  //将指定位置的节点删除
  removeAt(position: number) {
    if (position < 0 || position >= this.size) return null;
    let index = 0;
    let prev: ListNode<T> | null = null;
    let current = this.headNode;
    if (position === 0) {
      this.headNode = current?.next ?? null;
    } else {
      while (index < position && current) {
        //先保存前一个节点
        prev = current;
        //移动节点
        current = current.next;
        index++;
      }
      //index === position
      //将前一个节点的next指向当前要删除节点的next
      prev!.next = current?.next ?? null;
    }
    this.size--;
    return current?.value ?? null;
  }
  //获取指定位置的节点的值
  get(position: number): T | null {
    if (position < 0 || position >= this.size) return null;
    let index = 0;
    let current = this.headNode;
    while (index < position && current) {
      current = current.next;
      index++;
    }
    //index === position
    return current?.value ?? null;
  }
  //更新指定位置节点的值
  update(value: T, position: number): boolean {
    if (position < 0 || position >= this.size) return false;
    let index = 0;
    let current = this.headNode;
    while (index < position && current) {
      current = current.next;
      index++;
    }
    //index === position
    current!.value = value;
    return true;
  }
  //根据值,查询对应位置的索引
  indexOf(value: T) {
    let index = 0;
    let current = this.headNode;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  isEmpty() {
    return this.size === 0;
  }
}
const linkedList = new LinkedList<string>();
linkedList.append("aaa");
linkedList.append("bbb");
linkedList.append("ccc");
linkedList.append("abc");
// linkedList.traverse();

linkedList.insert("cba", 2);
linkedList.traverse();

console.log(linkedList.removeAt(1));
console.log(linkedList.removeAt(1));
linkedList.traverse();

// console.log(linkedList.get(3));

linkedList.update("xxx", 0);
// linkedList.traverse();
linkedList.update("yyy", 3);
// linkedList.traverse();

// console.log(linkedList.indexOf("yyy"));
// console.log(linkedList.indexOf("xxx"));
// console.log(linkedList.indexOf("ddddd"));
export { LinkedList };
