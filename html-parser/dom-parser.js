/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-11-26 14:28:49
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-11-26 15:03:15
*/
// input: ele innerhtml
// output: { tag: 'div', prop: [
//                             class: 'red',
//                             id: 'test'
//                         ],
//           children: [node]
//           txt: '123'}
console.log('dom-parser');
class VNode {
    constructor(tag, prop, childrens, txt) {
        this.tag = tag;
        this.prop = prop;
        this.childrens = childrens;
        this.txt = txt;
        this.ele = '';
    }
}

class Parser {
    constructor(ele) {
        this.ele = ele;
        
    }

    parserObjectHtml(ele) {
        const tag = ele.tagName;
        const prop = ele.attributes;
        const childrens = ele.childNodes;
        const txt = ele.textContent;
        if (childrens.length > 0) {
            const childrenss = [];
            for (let i = 0; i < childrens.length; i += 1) {
                if (childrens[i].nodeType !== 3) {
                    const node = parser.parserObjectHtml(childrens[i]);
                    childrenss.push(node);
                }
            }
            return new VNode(tag, prop, childrenss, txt);
        } else {
            return new VNode(tag, prop, '', txt);
        }
    }

    parserStringHtml() {
        
    }
}