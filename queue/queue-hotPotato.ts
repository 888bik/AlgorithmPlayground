import { ArrayQueue } from "./queue-implement";

const queue = new ArrayQueue<string>();

function hotPotato(names: string[], count: number) {
  //将所有人传入到队列中
  for (const element of names) {
    queue.enqueue(element);
  }

  //开始数数
  while (queue.size() > 1) {
    for (let index = 1; index < count; index++) {
      queue.enqueue(queue.dequeue()!);
    }
    //淘汰
    queue.dequeue();
  }
  //最后一个
  const lastName = queue.dequeue()!;
  const index = names.indexOf(lastName);
  return index;
}
const names = ["rust", "go", "python", "c++", "java"];
console.log(hotPotato(names, 4));
console.log(hotPotato(names, 5));
console.log(hotPotato(names, 7));
