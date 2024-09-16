import BinarySearchTree from "./bst.js";

let arr = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let bst = new BinarySearchTree(arr);
bst.prettyPrint(bst.getRoot());

bst.deleteItem(8);
bst.prettyPrint(bst.getRoot());
console.log(`is balanced ${bst.isBalanced()}`);

bst.deleteItem(4);
bst.prettyPrint(bst.getRoot());
console.log(`is balanced ${bst.isBalanced()}`);

bst.deleteItem(5);
bst.prettyPrint(bst.getRoot());
console.log(`is balanced ${bst.isBalanced()}`);

bst.deleteItem(6);
bst.prettyPrint(bst.getRoot());
console.log(`is balanced ${bst.isBalanced()}`);

console.log(bst.height(bst.getRoot().left));

bst.deleteItem(14);
bst.prettyPrint(bst.getRoot());
console.log(`is balanced ${bst.isBalanced()}`);

bst.rebalance();
bst.prettyPrint(bst.getRoot());
console.log(`is balanced ${bst.isBalanced()}`);

bst.deleteItem(15);
bst.prettyPrint(bst.getRoot());
console.log(`is balanced ${bst.isBalanced()}`);

bst.rebalance();
bst.prettyPrint(bst.getRoot());
console.log(`is balanced ${bst.isBalanced()}`);

bst.levelOrder(console.log);
bst.preOrder(console.log);
bst.inOrder(console.log);
bst.postOrder(console.log);
console.log(bst.find(3));
