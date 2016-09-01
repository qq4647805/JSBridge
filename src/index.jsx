class JSBridge {
  constructor(doc=document,glo_cbfn='JSBridgeCB',glo_dp='JSBridgeDispatch') {
    this._.doc=doc;
    this._.cbMap={};
    !glo_cbfn || (window[glo_cbfn]=this.nativeCB)
    !glo_dp || (window[glo_dp]=this.dispatch)
    this._();
  }
  _(){
    const ua=/xuebajun\/(\d+)/.exec(navigator.userAgent);
    if(ua){
      this.XBJ_APP=true;
      this.VERSION=ua[1]-0;
    }else{
      this.XBJ_APP=false;
      this.VERSION=0;
    }
    // if(!this._.iframe){
    //   this._.iframe=this._.doc.createElement('iframe');
  	// 	this._.iframe.id = 'JSBridge_iframe';
  	// 	this._.iframe.style.display = 'none';
  	// 	this._.doc.documentElement.appendChild(this._.iframe);
    // }
    // return this._.iframe;
  }
  extends(method,data){
    switch (method) {
      case 'share':
        if(this.XBJ_APP && this.VERSION>5000002){
          return false;
        }else{
          return 'wenba://share?'+ this.param(data);
        }
      default:
        return false;
    }
  }
  guid=()=>{
    return (((new Date().getTime()*Math.random()+Math.random())*0x10000)|0).toString(16).substring(1)
  }
  param=(obj)=>{
  	let arr=[];
  	for (var key in obj) {
  		let value=obj[key];
  		if (typeof key=='function') value = value()
  		if (value instanceof(Array)) value = value.join(',')
  		if (value == null) value = ""
  		arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
  	}
  	return arr.join('&');
  }
  get cb_length(){
    return Object.keys(this._.cbMap).length;
  }
  schema(url){
    alert(url);
    // const iframe=this._();
    // iframe.src=url;
    location.href=url;
  }
  callNative=(method,data={},cb=function(){})=>{
    if(/wenba:\/\//.test(method)){
      this.schema(method);
      return this.cb_length;
    }
    const extend_url=this.extends(method,data);
    if(extend_url){
      this.schema(extend_url);
      return this.cb_length;
    }
    const guid=this.guid();
    this._.cbMap[guid]=cb;
    const url=`wenba://xuebajun?action=${method}&data=${encodeURIComponent(JSON.stringify(data))}&cb=${guid}`;
    this.schema(url);
    return this.cb_length;
  }
  nativeCB=(name,data='{}')=>{
    if(this._.cbMap[name]){
      const cb=this._.cbMap[name];
      try{
        cb(JSON.parse(data));
      }catch(e){
        return e.message
      }
      delete this._.cbMap[name];
      return true;
    }else{
      console.error('no callback:'+name);
      return false;
    }
  }
  on=(event,fn)=>{
    this.on[event] && this.on[event]();
    this._.doc.addEventListener(event,fn,false);
    this.on[event]=()=>{
      this._.doc.removeEventListener(event,fn,false);
    }
    return this.on[event];
  }
  dispatch=(event,data='')=>{
    let e=document.createEvent('HTMLEvents');
    e.initEvent(event, false, true);
    e.data=data;
    this._.doc.dispatchEvent(e);
  }
}
export default JSBridge;
module.exports = JSBridge;
