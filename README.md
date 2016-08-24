# JSBridge
> js与native交互

## 安装

```
npm install
```

## 命令

```
npm run start
npm run build
npm run test
```
## demo
支持AMD,CommonJS,和直接引用
```html
<script type="text/javascript" src="lib/JSBridge.min.js"></script>
<script>

  var jsbrage=new JSBridge();


  //调用native 返回callback里面未被回调的函数个数
  var cbmap_length=jsbrage.callNative('foo',{a:'foo',b:['测试']},function(data) {
    alert(data);
  })
  //兼容原有的schema
  jsbrage.callNative('wenba://xuebajun?view=purchase');

  //native触发回调事件(主要是给native回调js用的)
  window.JSBridgeCB('cbname','data');
  jsbrage.nativeCB('cbname','data');

  //绑定监听事件
  var unbind=jsbrage.on('myevent',function(e) {
    alert(e.data);
  });
  //解绑监听事件
  unbind()
  //触发监听事件(主要是给native主动通知js用的)
  window.JSBridgeDispatch('myevent','data');
  jsbrage.dispacth('myevent','data');
</script>
```
