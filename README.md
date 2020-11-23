<!--
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-11-23 11:26:06
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-11-23 16:29:48
-->
# TX
simple mvvm frame, not vdom and diff

## overview  

现在vue和react都采用vdom做法，实际工作中，我们有时候并不需要这么大框架去工作，常常出现"高射炮打蚊子现象"。本框架主要参考vue开始时的设计理念，直接获取dom的引用，不涉及vdom进行更新操作。  

主要特点小，使用方便  

## api  

文本:  

```
<p t-text="xxq"></p>
<p t-show="show">show 是否展示</p>
<p t-click="handleClick">click 点击</p>
<p t-class="red">class</p>
<p t-for="item in arr">
    <span>item</span>
</p>
```

## design  

根据t-*标记选中所有自定义属性标签->建立binds[key] = [Node, Node1];这样映射关系->把第一步中自定义标签根据key的值push到binds中，会形成例如：  

```
binds:
{
    text: [Node, Node1.....],
    show: [Node, Node1.....]
}
```

-> 通过proxy代理用户传入数据，当数据改变然后出发Node的update事件