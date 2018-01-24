//setTimeout("alus1()");
function alus1() { 
 	//远程提交
		var userszl = JSON.parse(localStorage.getItem("userzl"));
		mui.post('http://td.sthcwh.com/usersyanz.php',{ username1:userszl.name,usertoke1:userszl.toke},//请求，地址是服务器本机的ip地址//要传送的数据
	    function(data){ //服务器返回数据回来时应该做什么的函数
	   if(data=='1'){
//	   	mui.toast('不为空！');
setTimeout("alus1()",10000);//10秒后再次执行
		 return;
///////////////////////////////
       }else if(data=='2'){
                mui.toast('你的帐号已在另处登录！');
                 localStorage.clear();
setTimeout("alus1()",10000);//10秒后再次执行
						plus.runtime.quit();
//                 app.setState({});
//                 plus.webview.getLaunchWebview().show("pop-in");
//                 plus.webview.mainWebview().close();
/*               localStorage.removeItem("userzl");
	              mui.openWindow({
                  url:'login.html',
                  id:'login',
                  });
*/
                return;
       }else if(data=='3'){
               mui.toast('帐号已过期，请联系服务商！');
/*                localStorage.removeItem("userzl");
	              mui.openWindow({
                  url:'login.html',
                  id:'login',
                  });
*/
                localStorage.clear();
setTimeout("alus1()",10000);//10秒后再次执行
						plus.runtime.quit();
//                app.setState({});
//		        plus.webview.getLaunchWebview().show("pop-in");
//                plus.webview.mainWebview().close();
		        return;
       }
	   });
}