class BinarySearchTree {
  #Node = class {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  };

  #root;
  constructor(arr) {
    this.buildTree(arr);
  }

  buildTree(arr) {
    this.#root = null;
    let uniq = [...new Set(arr)];
    uniq.sort((a, b) => a - b);
    this.#buildTreeH(uniq, 0, uniq.length);
  }

  #buildTreeH(arr, pl, pr) {
    if (pl >= pr) return;
    if (pl == pr - 1) {
      this.add(arr[pl]);
      return;
    }

    let mid = Math.floor((pl + pr) / 2);
    this.add(arr[mid]);

    this.#buildTreeH(arr, pl, mid);
    this.#buildTreeH(arr, mid + 1, pr);
  }

  add(value, loc = this.#root) {
    if (this.#root == null) {
      this.#root = new this.#Node(value);
      return;
    }
    if (loc == null) return new this.#Node(value);
    if (value < loc.value) {
      loc.left = this.add(value, loc.left);
      return loc;
    } else {
      loc.right = this.add(value, loc.right);
      return loc;
    }
  }

  deleteItem(value, loc = this.#root) {
    if (loc == null) return null;
    if (value == loc.value) {
      if (loc.left == null && loc.right == null) return null;
      if (loc.left == null) return loc.right;
      if (loc.right == null) return loc.left;
      let successor = this.#getSuccessor(value, loc);
      this.deleteItem(successor.value, loc);
      successor.left = loc.left;
      successor.right = loc.right;
      if (loc === this.#root) {
        this.#root = successor;
      }
      return successor;
    }
    if (value < loc.value) {
      loc.left = this.deleteItem(value, loc.left);
      return loc;
    } else {
      loc.right = this.deleteItem(value, loc.right);
      return loc;
    }
  }

  find(value, loc = this.#root) {
    if (loc == null) return null;
    if (value == loc.value) return loc;
    if (value < loc.value) return this.find(value, loc.left);
    if (value > loc.value) return this.find(value, loc.right);
  }

  levelOrder(callback, nextList = [this.#root]) {
    if (callback == null) throw "no callback provided";
    let node = nextList.shift();
    if (node == null) return;
    callback(node);
    if (node.left != null) nextList.push(node.left);
    if (node.right != null) nextList.push(node.right);
    this.levelOrder(callback, nextList);
  }

  inOrder(callback, curr = this.#root) {
    if (callback == null) throw "no callback provided";
    if (curr == null) return;
    this.inOrder(callback, curr.left);
    callback(curr);
    this.inOrder(callback, curr.right);
  }

  preOrder(callback, curr = this.#root) {
    if (callback == null) throw "no callback provided";
    if (curr == null) return;
    callback(curr);
    this.preOrder(callback, curr.left);
    this.preOrder(callback, curr.right);
  }

  postOrder(callback, curr = this.#root) {
    if (callback == null) throw "no callback provided";
    if (curr == null) return;
    this.postOrder(callback, curr.left);
    this.postOrder(callback, curr.right);
    callback(curr);
  }

  height(node = this.#root) {
    if (node == null) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node, curr = this.#root) {
    if (node == null) throw "node doesn't exist";
    if (node.value == curr.value) return 0;
    if (node.value < curr.value) return this.depth(node, curr.left) + 1;
    if (node.value > curr.value) return this.depth(node, curr.right) + 1;
  }

  isBalanced() {
    return this.#isBalancedH(this.#root)[0];
  }

  rebalance() {
    let arr = [];
    this.inOrder((node) => {
      arr.push(node.value);
    });
    this.buildTree(arr);
  }

  getRoot() {
    return this.#root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  #isBalancedH(curr) {
    if (curr == null) return [true, -1];
    let [leftBal, leftHeight] = this.#isBalancedH(curr.left);
    let [rightBal, rightHeight] = this.#isBalancedH(curr.right);
    if (!leftBal || !rightBal) return [false, -1];
    if (Math.abs(leftHeight - rightHeight) > 1) return [false, -1];
    return [true, Math.max(leftHeight, rightHeight) + 1];
  }

  #getSuccessor(value, loc) {
    if (loc == null) return null;
    let temp = null;
    if (value < loc.value) {
      temp = this.#getSuccessor(value, loc.left);
    } else if (value >= loc.value) {
      temp = this.#getSuccessor(value, loc.right);
    }
    if (temp == null) return loc;
    return temp;
  }
}

export default BinarySearchTree;
