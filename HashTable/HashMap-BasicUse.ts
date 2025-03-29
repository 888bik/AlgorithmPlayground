//初始化哈希表
const hashmap = new Map<number, string>();
hashmap.set(12345, "java");
hashmap.set(12346, "c++");
hashmap.set(12347, "rust");
hashmap.set(12348, "ruby");

console.log(hashmap);

let name = hashmap.get(12345);
console.log(name);

// 删除操作
hashmap.delete(12346);

//遍历操作
for (const [k, v] of hashmap.entries()) {
  console.log("k:" + k, "v:" + v);
}
for (const key of hashmap.keys()) {
  console.log("k:" + key);
}
for (const value of hashmap.values()) {
  console.log("v:" + value);
}
export {};
