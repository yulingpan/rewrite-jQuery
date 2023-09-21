window.$ = window.jQuery = function (selectorOrArray) {
  let elements;
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray;
  }

  // jQuery返回一个可以操作elements的api
  const api = Object.create(jQuery.prototype);
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArray.oldApi,
  });
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  // 闭包,函数访问外部变量 [用闭包维持elements,防止被垃圾回收]
  //添加className
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }
    return this;
  },

  //在元素范围内查找元素
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const el = this.elements[i].querySelectorAll(selector);
      array = array.concat(Array.from(el));
    }
    array.oldApi = this;
    return jQuery(array);
  },

  // 返回上一次api
  end() {
    return this.oldApi;
  },

  //遍历元素
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },

  //查父节点
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },

  // 查子节点
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children);
    });
    return jQuery(array);
  },

  //打印
  print() {
    console.log(this.elements);
  },
};
