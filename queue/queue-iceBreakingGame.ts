import { ArrayQueue } from "./queue-implement";

function iceBreakingGame1(num: number, target: number): number {
  const queue = new ArrayQueue<number>();
  //将所有数字添加到队列中
  for (let i = 0; i < num; i++) {
    queue.enqueue(i);
  }

  while (queue.size() > 1) {
    for (let i = 1; i < target; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    //淘汰
    queue.dequeue();
  }
  return queue.dequeue()!;
}


function iceBreakingGame2(n: number, m: number) {
  let position = 0;

  for (let i = 2; i <= n; i++) {
      position = (position + m) % i;
  }

  return position;
}
