/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-11-23 11:42:28
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-11-23 16:23:58
*/
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
        // data: 构造函数使用的
        // this.data: 外部代理使用实际绑定的是proxy
        // this._data: 真实proxy代理的数据，初始化所有属性值都是{}
        const data = opt.data;
        this._data = {};
        this.key = ["text", "show", "click"];
        this.direction = [];
        this.key.forEach((value) => {
           this.direction.push(`t-${value}`);
        });
        this.binds = {};
        for (let key in data) {
            this._data[key] = {};
            this.binds[key] = [];
        }
        this.direction.forEach((key) => {
            document.querySelectorAll(`[${key}]`).forEach((node) => {
             this.bindingNode(node);
            });
        });
        this.data = this.bindReactive();
        for (let key in data) {
            this.data[key] = data[key];
        }
    }

    bindReactive() {
        const self = this;
        const p = new Proxy(this._data, {
            set(obj, prop, newVal) {
                if (self._data[prop] === newVal) {
                    return false;
                }
                self._data[prop] = newVal;
                self.binds[prop].forEach((direct) => {
                    direct.update(newVal);
                });
                return true;
            },
            get(obj, prop) {
                return true;
            }
        });
        return p;
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