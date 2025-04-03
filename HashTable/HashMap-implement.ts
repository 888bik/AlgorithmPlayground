class Pair {
  public key: number;
  public value: string;
  constructor(key: number, value: string) {
    this.key = key;
    this.value = value;
  }
}
class ArrayHashMap {
  public readonly buckets: (Pair | null)[];
  constructor() {
    //初始化数组
    this.buckets = new Array(10).fill(null);
  }

  //哈希函数
  hashFunc(key: number) {
    return key % 100;
  }

  //查询操作
  get(key: number) {
    const index = this.hashFunc(key);
    const pair = this.buckets[index];
    if (!pair) return null;
    return pair.value;
  }
  //添加操作
  set(key: number, value: string) {
    const index = this.hashFunc(key);
    this.buckets[index] = new Pair(key, value);
  }
  //删除操作
  delete(key: number) {
    const index = this.hashFunc(key);
    this.buckets[index] = null;
  }
  //获取所有键
  keys(): (number | undefined)[] {
    const arr: (number | undefined)[] = [];
    for (let index = 0; index < this.buckets.length; index++) {
      if (this.buckets[index]) {
        arr.push(this.buckets[index]?.key);
      }
    }
    return arr;
  }
  //获取所有值
  values(): (string | undefined)[] {
    const arr: (string | undefined)[] = [];
    for (let index = 0; index < this.buckets.length; index++) {
      if (this.buckets[index]) {
        arr.push(this.buckets[index]?.value);
      }
    }
    return arr;
  }
  //获取所有键值对
  entries(): (Pair | null)[] {
    const arr: (Pair | null)[] = [];
    for (let index = 0; index < this.buckets.length; index++) {
      if (this.buckets[index]) {
        arr.push(this.buckets[index]);
      }
    }
    return arr;
  }
  //打印哈希表
  print() {
    const PairSet = this.entries();
    for (const pair of PairSet) {
      console.log(`${pair?.key}->${pair?.value}`);
    }
  }
}

const map = new ArrayHashMap();
map.set(123, "java");
map.set(124, "c++");
map.set(1234, "javaScript");
map.set(125, "rust");
map.set(1236, "typeScript");
map.set(1238, "python");
// map.delete(123);
// console.log(map.keys());
// console.log(map.values());
// console.log(map.entries());
// map.print();
console.log(map.buckets);
export {};
