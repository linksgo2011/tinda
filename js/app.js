
(function($, owner) {
	
	/**
	 * 项目的基本配置 
	 */
	owner.config = {
//		baseUrl:"http://www.1008691.club/"
		baseUrl:"http://admin.tengdakey.com/"
//		baseUrl:"http://localhost/tinda_admin/"
	}
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		
		if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
        mui.toast("网络异常，请检查网络设置！");
 
       } else {
		
		
		
		
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		loginInfo.usertoke = loginInfo.usertoke || localStorage.getItem('usertoke');
		if (loginInfo.account.length < 1) {
			return callback('请输入账号！');
		}
		if (loginInfo.password.length < 1) {
			return callback('请输入密码！');
		}
		
		if(!loginInfo.usertoke){
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < 7; i++ )
				loginInfo.usertoke += possible.charAt(Math.floor(Math.random() * possible.length));
		}
 
		/////
		mui.init();
		
		mui.post(this.config.baseUrl + 'td2017.php',{ name:loginInfo.account,psw:loginInfo.password,ustoke:loginInfo.usertoke},//请求，地址是服务器本机的ip地址//要传送的数据
	    function(data){ //服务器返回数据回来时应该做什么的函数
	   if(data=='1'){
	     localStorage.setItem('username',loginInfo.account);
	     localStorage.setItem('usertoke',loginInfo.usertoke);
	     
	     var username=JSON.stringify({"name":loginInfo.account,"toke":loginInfo.usertoke});
	         localStorage.setItem("userzl",username);
	     return owner.createState(loginInfo.account,loginInfo.usertoke, callback);
		 }
	   if(data=='2'){
	     return callback('帐号已过期，请联系服务商！');
		 }
	   if(data=='3'){
		 return callback('用户名或密码错误');
		 }
	   	   if(data=='0'){
		 return callback('帐号不存在！');
		 }},
		 'text'
		 );
		/////
		}
	};

	owner.createState = function(name,usertoke, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = usertoke;
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	/*owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');

	};*/

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
	
	
}(mui, window.app = {}));

/**
 * 日期格式化 
 */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 公共跳转部分

function redirectToLiveDetail(channel_id,app_id){
	mui.openWindow({
	        url:'live.html',
	    id:'live',
	    extras:{
	    		channel_id:channel_id,
	    		app_id:app_id
	    }
	});
}
	
function homeA(){
    mui.openWindow({
    url:'main.html',
    id:'main',
    });
}

function rj(){
    mui.openWindow({
    url:'rj.html',
    id:'rj',
    });
}


function zlcxA(){
    mui.openWindow({
    url:'zlcx.html',
    id:'zlcx',
    });
}
function passcxA(){
    mui.openWindow({
    url:'passcx.html',
    id:'passcx',
    });
}
function settingA(){
    mui.openWindow({
    url:'setting.html',
    id:'setting',
    });
}
function aboutd(){
    mui.openWindow({
    url:'daip.html?id=about',
    id:'about',
    });
}

function redirectToLives(){
		    mui.openWindow({
    url:'lives.html',
    id:'lives',
    });
}
