/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-11-23 11:42:28
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-11-23 13:11:40
*/

class Direction {
    constructor() {

    }
}

class Text {
    constructor(node) {
        this.node = node;
    }
    update(newV) {
        this.node.textContent = newV;
    }
}

class TX {
    constructor(opt) {
        this.data = opt.data;
        this.key = ["text", "show", "click"];
        this.direction = [];
        this.key.forEach((value) => {
           this.direction.push(`t-${value}`);
        });
        this.binds = {};
        for (let key in this.data) {
            this.binds[key] = [];
        }
        this.direction.forEach((key) => {
            document.querySelectorAll(`[${key}]`).forEach((node) => {
             this.bindingNode(node);
            });
        });
    }

    bindingNode(node) {
        for (let i = 0; i < node.attributes.length; i += 1) {
            const { name, value } = node.attributes[i];
            if (name.includes('t-')) {
                this.bindingDirectToData(name, value, node);
            }
        }
    }

    bindingDirectToData(name, value, node) {
        let direct = null;
        if (name === 't-text') {
            direct = new Text(node);
            this.binds[value].push(direct);   
        }
    }
}