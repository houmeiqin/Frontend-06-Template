const obj={a:1,b:2}
const op=new Proxy(obj,{
	set(obj,opt,val){
		console.log(obj, opt, val);
	}
})
op.ccc=1