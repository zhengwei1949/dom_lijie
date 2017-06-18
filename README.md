## jq演示appendTo方法
```javascript
$('<h3>aa</h3><p>测试</p>').appendTo('.demo'); //选择器字符串
$('<h3>aa</h3><p>测试</p>').appendTo($('#ceshi')); //jq对象
$('<h3>aa</h3><p>测试</p>').appendTo(document.querySelector('#ceshi')); //dom对象
```

## 目标：
模拟jq的appendTo方法

## 思路：
1. 首先我们要确保我们的I方法支持I('<div>1</div><div>2</div><div>3</div><div>4</div>')这种形式
    1. 判断I方法传进来的到底是普通的选择器字符串还是html片段
    2. 实现parseHTML方法
```javascript
Itcast.parseHTML = function(selector) {
        var arr = [];
        var oDiv = document.createElement('div');
        oDiv.innerHTML = selector;
        var childNodes = oDiv.childNodes;
        arr.push.apply(arr, childNodes);
        return arr;
    }
```
    3. 集成到itcast框架当中,让我们的核心结构支持I('<div>1</div><div>2</div><div>3</div><div>4</div>')这种形式的代码
2. 开始实现我们的appendTo方法
    1. 先实现`$('<div><h3>aa</h3><p>测试</p></div>').appendTo('.demo');`
    2. 再实现`$('<div><h3>aa</h3><p>测试</p></div>').appendTo($('#ceshi'));`
    3. 再实现`$('<div><h3>aa</h3><p>测试</p></div>').appendTo(document.querySelector('#ceshi'));`
    4. 把这几种情况集成一个方法里面 --> 考虑到代码的扩展性，可以考虑合成一种情况