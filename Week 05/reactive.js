
let callbacks = new Map()
let usedReactivties = [] //react 与effect 之间的连接
let reactivties = new Map() // 每个对象调用reactive时，添加缓存
const obj = { r: 0, g: 0, b: 0 }
const po = reactive(obj)
/*
	响应式对象
	调用函数，查看实际调用的变量
	普通变量：不做监听
	reactive get 获得监听的效果
*/
function reactive(object) {
	if (reactivties.has(object)) {
		return reactivties.get(object)
	}
	let proxy = new Proxy(object, {
		set: function (target, property, value, receiver) {
			target[property] = value
			if (callbacks.get(target) && callbacks.get(target).get(property)) {
				for (const callback of callbacks.get(target).get(property)) {
					callback()
				}
			}

		},
		get: function (target, property, receiver) {
			usedReactivties.push([target, property])
			if (typeof target[property] === 'object') {
				return reactive(target[property])
			}
			return target[property]
		}
	})
	reactivties.set(object, proxy)
	return proxy
}

function effect(callback) {
	usedReactivties = [];

	callback()
	for (const reactivity of usedReactivties) {
		if (!callbacks.has(reactivity[0])) {
			callbacks.set(reactivity[0], new Map())
		}
		if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
			callbacks.get(reactivity[0]).set(reactivity[1], [])
		}
		callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
	}
}


// effect(()=>{
// 	console.log('测试',po.a.b);
// })
effect(() => {
	document.getElementById('r').value = po.r
})
effect(() => {
	document.getElementById('g').value = po.g
})
effect(() => {
	document.getElementById('b').value = po.b
})

effect(() => {
	document.getElementById('color').style.backgroundColor = `rgb(${po.r},${po.g},${po.b})`
})
document.getElementById('r').addEventListener('input', event => po.r = event.target.value)
document.getElementById('g').addEventListener('input', event => po.g = event.target.value)
document.getElementById('b').addEventListener('input', event => po.b = event.target.value)


