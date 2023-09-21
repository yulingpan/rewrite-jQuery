// 全局函数jQuery(selector),返回构造函数jQ构造出的对象api操作元素,形成链式操作
// 命名风格: $变量 = jQuery构造的api对象, 例: $test=jQuery(".test")

// api.addClass.call(api,arguments..) [等价于]
// => api.addClass(arguments..) , this === api

// 实现回退，防止数据污染
jQuery(".test")
  .addClass("red")
  .find(".child")
  .addClass("blue")
  .end()
  .addClass("green");

console.log(`遍历.test>.child元素:`);
$(".test")
  .find(".child")
  .each((item, index) => {
    console.log(item, index);
  });

console.log(`.test元素的父元素是:`);
$(".test").parent().print();

console.log(`.test元素的子元素是:`);
$(".test").children().print();
