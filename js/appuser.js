setTimeout("alus1()");

function alus1() {
	//远程提交
	var userszl = JSON.parse(localStorage.getItem("userzl"));
	if(userszl == null) {
		setTimeout("alus1()", 10000); //10秒后再次执行
		return;
	} else {
		mui.ajax(app.config.baseUrl + app.wrapTokenForUrl('api/v1/online'), {
			data: {
				token: userszl.toke
			},
			dataType: 'json',
			type: 'post',
			timeout: 10000,
			success: function(data) {
				if(data.status == 200) {
					setTimeout("alus1()", 10000); //10秒后再次执行
					return;
				} else if(data.status == 403) {
					// token 过期 或者 身份丢失
					localStorage.clear();
					app.setState({});
					plus.webview.getLaunchWebview().show("pop-in");
					setTimeout("alus1()", 10000); //10秒后再次执行
					return;
				} else {
					// client token 不一致，被T下线
					mui.toast('你的帐号已在另处登录！');
					localStorage.clear();
					app.setState({});
					plus.webview.getLaunchWebview().show("pop-in");
					setTimeout("alus1()", 10000); //10秒后再次执行
					return;
				}
				setTimeout("alus1()", 10000); //10秒后再次执行
				return;
			},
			error: function(xhr, type, errorThrown) {
				setTimeout("alus1()", 10000); //10秒后再次执行
				return;
			}

		});
	}
}