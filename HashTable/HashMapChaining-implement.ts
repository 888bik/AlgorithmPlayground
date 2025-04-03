class Pair<T> {
  public key: number;
  public value: T;
  constructor(key: number, value: T) {
    this.key = key;
    this.value = value;
  }
}
class HashMapChaining<T> {
  private size: number;
  private capacity: number;
  private loadThres: number; //触发扩容的负载因子阈值
  private extendRatio: number; // 扩容倍数
  private buckets: Pair<T>[][]; // 桶数组
  //初始化
  constructor() {
    this.size = 0;
    this.capacity = 4;
    this.loadThres = 2.0 / 3.0;
    this.extendRatio = 2;
    this.buckets = new Array(this.capacity).fill(null).map((item) => []);
  }
  //哈希函数
  hashFunc(key: number) {
    return key % this.capacity;
  }
  //负载因子
  loadFactor(): number {
    return this.size / this.capacity;
  }
  //扩容哈希表
  extend() {
    //将之前的哈希表暂时保存
    const bucketsTmp = this.buckets;
    this.capacity = this.extendRatio * this.capacity;
    //创建更大的哈希表
    this.buckets = new Array(this.capacity).fill(null).map((item) => []);
    this.size = 0;
    //搬运哈希表
    for (const bucket of bucketsTmp) {
      for (const pair of bucket) {
        this.put(pair.key, pair.value);
      }
    }
  }
  //插入操作
  put(key: number, value: T) {
    // 当负载因子超过阈值时，执行扩容
    if (this.loadFactor() > this.loadThres) {
      this.extend();
    }
    const index = this.hashFunc(key);
    const bucket = this.buckets[index];
    //遍历桶,如果key相同则更新值,并返回
    for (const pair of bucket) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }
    //不存在则创建新的键值对并添加到数组尾部
    const newPair = new Pair(key, value);
    bucket.push(newPair);
    this.size++;
  }

  //查询操作
  get(key: number) {
    const index = this.hashFunc(key);
    const bucket = this.buckets[index]; //找到桶
    //遍历桶中的键值对,找到返回对应的value
    for (const pair of bucket) {
      if (pair.key === key) return pair.value;
    }
    //找不到则返回null
    return null;
  }
  //删除操作
  remove(key: number) {
    const index = this.hashFunc(key);
    const bucket = this.buckets[index];
    for (let index = 0; index < bucket.length; index++) {
      const pair = bucket[index];
      if (pair.key === key) {
        bucket.splice(index, 1);
        this.size--;
        break;
      }
    }
  }
  //打印哈希表
  print() {
    for (const bucket of this.buckets) {
      let res = [];
      for (const pair of bucket) {
        res.push(pair.key + "->" + pair.value);
      }
      console.log(res);
    }
  }
}
const hashmap = new HashMapChaining();
hashmap.put(123, "java");
hashmap.put(124, "c++");
hashmap.put(125, "javaScript");
hashmap.put(126, "typeScript");
hashmap.put(127, "rust");
hashmap.put(128, "python");
hashmap.print();

// console.log(hashmap.get(123));
// console.log(hashmap.get(124));
// hashmap.remove(124);
// console.log(hashmap.get(124));
export {};
