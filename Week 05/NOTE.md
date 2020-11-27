# 响应式对象
1. 通过Proxy 代理对象
2. effecf 副作用函数
	* 自执行 预加载Proxy对象的访问属性，生成对象、属性访问数组 usedReactivties[[target,property],...]
	* 循环usedReactivties 生成map 一对一对多对象
3. Proxy 对象执行set 时，设置属性并调用property 对应的callbacks
4. 多层对象的响应式，，若为对象，则添加Proxy 代理

# cssom 与range 实现元素拖动与重排
1. 拖动事件，在元素上注册mousedown，内部注册document 的mousemove、mouseup,实现页面内拖动
2. event clientX,clientY 基于当前触发元素的相对位置
3. 注意鼠标的起始位置，与第二次拖动的起始位置
4. range 选中dom 片段，getBoundingClientRect 获取元素的位置
5. 距离计算 **





