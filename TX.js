/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-11-23 11:42:28
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-11-24 13:19:22
*/

class Direct {
    constructor(node) {
        this.node = node;
    }
    update(node) {

    }
}

class TClass extends Direct {
    constructor(node) {
        super(node);
    }

    update(newVal, oldVal) {
        oldVal ? this.node.classList.remove(oldVal) : '';
        this.node.classList.add(newVal);
    }
}

class Text extends Direct {
    constructor(node) {
        super(node);
    }
    update(newV) {
        this.node.textContent = newV;
    }
}

class Show extends Direct{
    constructor(node) {
        super(node);
    }

    update(flag) {
        // none	此元素不会被显示。
        // block	此元素将显示为块级元素，此元素前后会带有换行符。
        // inline	默认。此元素会被显示为内联元素，元素前后没有换行符。
        // list-item	此元素会作为列表显示。
        // run-in	此元素会根据上下文作为块级元素或内联元素显示。
        // compact	此元素会根据上下文作为块级元素或内联元素显示。
        // marker	
        // table	此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。
        // inline-table	此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。
        // table-row-group	此元素会作为一个或多个行的分组来显示（类似 <tbody>）。
        // table-header-group	此元素会作为一个或多个行的分组来显示（类似 <thead>）。
        // table-footer-group	此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。
        // table-row	此元素会作为一个表格行显示（类似 <tr>）。
        // table-column-group	此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。
        // table-column	此元素会作为一个单元格列显示（类似 <col>）
        // table-cell	此元素会作为一个表格单元格显示（类似 <td> 和 <th>）
        // table-caption	此元素会作为一个表格标题显示（类似 <caption>）
        let display = flag ? 'block' : 'none';
        this.node.style.display = display;
    }
}

class TX {
    constructor(opt) {
        // data: 构造函数使用的
        // this.data: 外部代理使用实际绑定的是proxy
        // this._data: 真实proxy代理的数据，初始化所有属性值都是{}
        const data = opt.data;
        const methods = opt.methods;
        this._data = {};
        this.key = ["text", "show", "class", "click"];
        this.direction = [];
        this.methods = new Map();
        this.key.forEach((value) => {
           this.direction.push(`t-${value}`);
        });
        this.binds = {};
        for (let key in data) {
            this._data[key] = '';
            this.binds[key] = [];
        }
        for (let fun in methods) {
            this.methods.set(fun, methods[fun]);
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
                const oldVal = self._data[prop];
                self._data[prop] = newVal;
                self.binds[prop].forEach((direct) => {
                    direct.update(newVal, oldVal);
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
        } else if (name === 't-show') {
            direct = new Show(node);
            this.binds[value].push(direct);
        } else if (name === 't-class') {
            direct = new TClass(node);
            this.binds[value].push(direct);
        } else if (name === 't-click') {
            const self = this;
            node.addEventListener('click', this.methods.get(value).bind(self))
        }
    }
}