/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-11-25 12:50:39
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-11-25 13:01:55
 */
class VNode {
    constructor(tag, prop, childrens, txt) {
        this.tag = tag;
        this.prop = prop;
        this.childrens = childrens;
        this.txt = txt;
        this.ele = '';
    }

    render() {
        const parentEle = document.createElement(this.tag);
        for (let attr in this.prop) {
            !!attr ? parentEle.setAttribute(attr, this.prop[attr]) : '';
        }
        if (this.txt) {
            const txt = document.createTextNode(this.txt);
            parentEle.appendChild(txt);
        }
        for (let i = 0; i < this.childrens.length; i += 1) {
            const node = this.childrens[i];
            parentEle.appendChild(node.render());
        }
        this.ele = parentEle;
        return parentEle;
    }
}