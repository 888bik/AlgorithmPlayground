import { ArrayStack } from "./stack-implement";

const stack = new ArrayStack();

function decimalToBinary(decimal: number) {
  while (decimal > 0) {
    const remainder = decimal % 2; //除以2得到的余数入栈
    stack.push(remainder);
    decimal = Math.floor(decimal / 2);
  }
  //取出栈中的所有值
  let binary = "";
  while (!stack.isEmpty()) {
    binary += stack.pop();
  }
  // console.log(binary);
}
decimalToBinary(35);
decimalToBinary(102);
export {};
