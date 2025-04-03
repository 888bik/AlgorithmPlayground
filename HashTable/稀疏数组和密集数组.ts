//稀疏数组
const sparseArray = new Array(6);
sparseArray.push(4);
console.log(sparseArray);

//密集数组
const denseArray = Array.apply(null, Array(6));
denseArray.push(5);
console.log(denseArray);
