// Problem 2: LRU Cache(https://leetcode.com/problems/lru-cache/)

// TC:
// put: O(1)
// get: O(1)

// SC:
// O(N), N is the capacity

// Did this code successfully run on Leetcode : Yes
// Any problem you faced while coding this : No


// Your code here along with comments explaining your approach

class LRUNode {
    constructor(key, value) {
        this.key = (key === undefined ? -1 : key);
        this.value = (value === undefined ? -1 : value);
        this.next = null;
        this.prev = null;
    }
}

/**
 * @param {number} capacity
 */
class LRUCache {
    constructor(capacity) {
        // Initialise the capacity, map, head and tail
        // Map stores the key and address of the node
        this.capacity = capacity;
        this.map = new Map();
        this.head = new LRUNode(-1, -1);
        this.tail = new LRUNode(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    removeNode = function (node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    addToHead = function (node, head) {
        node.next = head.next;
        head.next = node;
        node.next.prev = node;
        node.prev = head;
    }

    /** 
     * @param {number} key
     * @return {number}
     */
    get = function (key) {
        // If it does not exist, return -1
        if (!this.map.has(key)) {
            return -1;
        }

        // Get the node address and move it to front(as it is used). Then set the updated value
        let node = this.map.get(key);
        this.removeNode(node);
        this.addToHead(node, this.head);
        return node.value;
    };

    /** 
     * @param {number} key 
     * @param {number} value
     * @return {void}
     */
    put = function (key, value) {
        // If it has key, get the node address and move it to front(as it is used). Then set the updated value
        if (this.map.has(key)) {
            let node = this.map.get(key);
            this.removeNode(node);
            this.addToHead(node, this.head);
            node.value = value;
            return;
        }
        // If new node needs to be added and capacity is full, remove the node from linked list and map
        if (this.capacity === this.map.size) {
            let tailPrev = this.tail.prev;
            this.removeNode(tailPrev);
            this.map.delete(tailPrev.key);
        }
        // Add the new node in the map and at the head
        let newNode = new LRUNode(key, value);
        this.map.set(key, newNode);
        this.addToHead(newNode, this.head);
    };

};


/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */