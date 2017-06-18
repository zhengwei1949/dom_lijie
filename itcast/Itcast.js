(function(window) {

    var arr = [],
        push = arr.push,
        slice = arr.slice;

    function Itcast(selector) {
        return new Itcast.fn.init(selector);
    }

    Itcast.fn = Itcast.prototype = {
        constructor: Itcast,

        length: 0,

        init: function(selector) {
            // 需要判断, 根据传入的数据不同而实现不同的功能
            if (!selector) return this;
            // dom对象

            //  $(document)
            if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                // console.log(this);
                return this;
            }



            Itcast.fn.type = 'itcast';
            //itcast对象
            //if (selector.constructor === Itcast) {
            if (selector.type === 'itcast') {
                // return selector;
                for (var i = 0; i < selector.length; i++) {
                    this[i] = selector[i];
                }
                this.length = selector.length;
                return this;
            }

            if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>') {
                // console.log('html片段');
                //解析出来html片段转换成一个数组 --> 把这个数组的每一项元素作为这个itcast对象的每一项元素
                var tempArr = I.parseHTML(selector);
                for (var i = 0; i < tempArr.length; i++) {
                    // this --> itcast伪数组对象
                    this[i] = tempArr[i];
                }
                this.length = tempArr.length;
            } else {
                var list = Itcast.select(selector);
                push.apply(this, list);
            }


            return this;
        },
        each: function(callback) {
            return Itcast.each(this, callback);
        },
        map: function(callback) {
            return Itcast.map(this, callback);
        },
        toArray: function() {

            return slice.call(this);
        },
        get: function(index) {
            // arguments.length == 0 
            if (index === undefined) {
                // 没有传参
                return this.toArray();
            } else {
                // 传入了参数
                if (index >= 0) {
                    return this[index];
                } else if (index < 0) {
                    return this[this.length + index];
                }
            }

            return this; // 如果传入的既不是正数, 也不是负数, 也不是没有传参
        }
    };

    Itcast.fn.init.prototype = Itcast.fn;



    Itcast.isArrayLike = function(array) {
        var length = array && array.length;

        return typeof length === 'number' && length >= 0;

    }
    Itcast.each = function(array, callback) {
        var i, k;
        if (Itcast.isArrayLike(array)) {
            // 使用 for 循环
            for (i = 0; i < array.length; i++) {
                if (callback.call(array[i], i, array[i]) === false) break;
            }
        } else {
            // 使用 for-in 循环
            for (k in array) {
                if (callback.call(array[i], k, array[k]) === false) break;
            }
        }
        return array;
    }


    Itcast.map = function(array, callback) {
        var i, k,
            res = [],
            tmp;
        if (Itcast.isArrayLike(array)) {
            // 使用 for 循环
            for (i = 0; i < array.length; i++) {
                tmp = callback(array[i], i);
                if (tmp !== undefined) {
                    res.push(tmp);
                }
            }
        } else {
            // 使用 for-in 循环
            for (k in array) {
                tmp = callback(array[k], k);
                if (tmp !== undefined) {
                    res.push(tmp);
                }
            }
        }
        return res;
    }
    Itcast.select = function(selector) {
        return document.querySelectorAll(selector);
    }



    Itcast.extend = Itcast.fn.extend = function(obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    };

    // I.extend({
    //     parseHTML:function(selector){

    //     }
    // })

    Itcast.parseHTML = function(selector) {
        var oDiv = document.createElement('div');
        oDiv.innerHTML = selector;
        var arr = oDiv.childNodes;
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            arr1.push(arr[i]);
        }
        return arr1;
    }

    // 面向过程编程 面向对象式编程 函数式编程 
    // forEach,reduce --> 
    // I('<h3>aa</h3><p>测试</p>').appendTo('.demo'); 
    // {0:'h3这个dom对象'，1:'p这个对象',length:2,each,map.....}
    // append, before, after

    // a.fn(b)
    Itcast.fn.appendTo = function(selector) {
        var obj = Itcast(selector); //转换成itcast对象
        // console.log(obj);
        // if (typeof selector === 'string') {
        //     var list = document.querySelectorAll(selector);
        // } else {
        //     list = selector;
        // }
        for (var i = 0; i < obj.length; i++) {
            for (var j = 0; j < this.length; j++) {
                obj[i].appendChild(this[j].cloneNode(true));
            }
        }
    }



    window.Itcast = window.I = Itcast; // 在 全局范围内 引入两个变量

})(window);