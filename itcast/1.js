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


            if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>') {
                var arr = I.parseHTML(selector);
                push.apply(this, arr);
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

    Itcast.parseHTML = function(selector) {
        var arr = [];
        var oDiv = document.createElement('div');
        oDiv.innerHTML = selector;
        var childNodes = oDiv.childNodes;
        arr.push.apply(arr, childNodes);
        return arr;
    }

    Itcast.extend = Itcast.fn.extend = function(obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    };

    Itcast.fn.type = 'itcast';

    Itcast.fn.appendTo = function(selector) {
        // if (typeof selector === 'string') {
        //     // console.log(11);

        // }

        // if (typeof selector === 'object') {
        //     if (selector.nodeType) {
        //         console.log(22);
        //     } else if (selector.type === 'itcast') {
        //         console.log(33);
        //     }
        // }
        I(selector)
    }






    window.Itcast = window.I = Itcast; // 在 全局范围内 引入两个变量

})(window);