setTimeout("alus1()");
function alus1() { 
 	//远程提交
	var userszl = JSON.parse(localStorage.getItem("userzl"));
	if(userszl==null){
		setTimeout("alus1()",10000);//10秒后再次执行
		return;
	}else{
		mui.ajax(app.config.baseUrl + 'usersyanz.php',{
			data:{
				username1:userszl.name,
				usertoke1:userszl.toke
			},
			dataType:'json',
			type:'post',
			timeout:10000,         
			success:function(data){
				if(data=='1'){
						setTimeout("alus1()",10000);//10秒后再次执行
					 	return;
			      }else if(data=='2'){
			                mui.toast('你的帐号已在另处登录！');
			                localStorage.clear();
			                app.setState({});
			                plus.webview.getLaunchWebview().show("pop-in");
			                setTimeout("alus1()",10000);//10秒后再次执行
			                return;
			       }else if(data=='3'){
			               mui.toast('帐号已过期，请联系服务商！');
			                localStorage.clear();
			                app.setState({});
					        plus.webview.getLaunchWebview().show("pop-in");
			                setTimeout("alus1()",10000);//10秒后再次执行
					        return;
			       }
			       setTimeout("alus1()",10000);//10秒后再次执行
					return;
			},
			error:function(xhr,type,errorThrown){
				setTimeout("alus1()",10000);//10秒后再次执行
				return;
			}
		});
}
}