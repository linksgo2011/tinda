function myfun(){
	var userValue=localStorage.getItem("username");
	var userDate=localStorage.getItem("userdate");
 	//远程查询
 		mui.post('http://td.sthcwh.com/setups.php',{userdate:userDate,username:userValue},//请求，地址是服务器本机的ip地址//要传送的数据e
	    function(data){ //服务器返回数据回来时应该做什么的函数
	   if(data=='yes'){
                alert("你的帐号已在其它终端登录，被迫下线！");
				mui.openWindow({
					url: 'login.html',
					id: 'login',
					show: {
						aniShow: 'pop-in'
					},
					waiting: {
						autoShow: false
					}
				});
      }else{
          setTimeout("myfun()",12000);
          return;
		 }
	   });

}/*用window.onload调用myfun()*/
window.onload=myfun;//不要括号
