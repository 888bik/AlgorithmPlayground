import { ArrayStack } from "./stack-implement";

const stack = new ArrayStack<string>();

//{()}[] => true , [{)} => false ()[]{} => true (){}[ =>false
function validBracket(s: string): boolean {
  for (let i = 0; i < s.length; i++) {
    const bracket = s[i];
    switch (bracket) {
      case "(":
        stack.push(")");
        break;
      case "{":
        stack.push("}");
        break;
      case "[":
        stack.push("]");
        break;
      default:
        if (bracket !== stack.pop()) {
          return false;
        }
        break;
    }
  }
  // (){}[ 这种情况也是false的,所以有效的括号的栈是空的
  return stack.isEmpty();
}

console.log(validBracket("{{}}()"));
console.log(validBracket("[(])"));
console.log(validBracket("[])"));
console.log(validBracket("{[]}"));
