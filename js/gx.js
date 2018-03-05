(function($) {
    var wgtVer = null;
    // 检测更新,返回最新版本号
    //正式上线时请更改当前版本
//  var checkUrl = "http://www.1008691.club/bb.php";
    var checkUrl = "http://admin.tengdakey.com/bb.php";
    // 下载wgt文件
//  var wgtUrl = "http://www.1008691.club/H59F6A680.wgt";
      var wgtUrl = "http://admin.tengdakey.com/H59F6A680.wgt";

    function checkUpdate(callback) {
        // 获取本地应用资源版本号
        plus.runtime.getProperty(plus.runtime.appid, function(inf) {
            wgtVer = inf.version;
            
             document.write("当前应用版本：" + wgtVer);
        
        });
        //      plus.nativeUI.showWaiting("检测更新...");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            switch (xhr.readyState) {
                case 4:
                    //                  plus.nativeUI.closeWaiting();
                    if (xhr.status == 200) {

                      
                         document.write("检测更新成功：" + xhr.responseText);
                        var newVer = xhr.responseText;
                        if (compareVersion(wgtVer, newVer)) {
                            if (!callback)
                                downWgt(false); // 下载升级包
                                else callback(true);
                        } else {
                            //                          plus.nativeUI.alert("无新版本可更新！");
                            if (callback) callback(false);
                        }
                    } else {
plusReady();
                                                 document.write("<br>检测更新失败" );
                        
                          
                    }
                    break;
                default:
                    break;
            }
        }
        xhr.open('GET', checkUrl);
        xhr.send();
    }

    function downWgt(key) {
            var w;
            if (key) {
                w = plus.nativeUI.showWaiting("　　 开始下载...　　");
            }
            var options = {
                filename: "_doc/update/"
            };
            var dtask = plus.downloader.createDownload(wgtUrl, options, function(d, status) {
                if (status == 200) {
                    console.log("下载wgt成功：" + d.filename);
                    setTimeout(installWgt(d.filename, key), 2000); // 安装wgt包
                } else {
                    console.log("下载wgt失败！");
                    if (key) {
                        plus.nativeUI.alert("下载更新资源失败！");
                    }
                }
            });
            if (key) {
                dtask.addEventListener("statechanged", function(task, status) {
                    switch (task.state) {
                        case 1: // 开始
                            w.setTitle("　　 开始下载...　　 ");
                            break;
                        case 2: // 已连接到服务器
                            w.setTitle("　　 开始下载...　　 ");
                            break;
                        case 3:
                            var a = task.downloadedSize / task.totalSize * 100;
                            console.log(a)
                            w.setTitle("　　 已下载" + parseInt(a) + "%　　 ");
                            break;
                        case 4: // 下载完成
                            w.close();
                            break;
                    }
                });
            }
            dtask.start();

        }

        // 更新应用资源

    function installWgt(path, key) {
            if (key) {
                plus.nativeUI.showWaiting("在线升级，安装资源文件...");
            }
            plus.runtime.install(path, {}, function() {
                if (key) {
                    plus.nativeUI.closeWaiting();
                    //自动在线升级不重启
                    plus.nativeUI.alert("应用资源更新完成！", function() {
                    plus.runtime.restart();
                });
                }
                console.log("安装wgt文件成功！");

            }, function(e) {

                console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
                if (key) {
                    plus.nativeUI.closeWaiting();
                    plus.nativeUI.alert("在线升级，安装资源文件失败");
                }
            });
        }
//function installWgt(path){
//  plus.nativeUI.showWaiting("安装wgt文件...");
//  plus.runtime.install(path,{},function(){
//      plus.nativeUI.closeWaiting();
//      console.log("安装wgt文件成功！");
//      plus.nativeUI.alert("应用资源更新完成！",function(){
//          plus.runtime.restart();
//      });
//  },function(e){
//      plus.nativeUI.closeWaiting();
//      console.log("安装wgt文件失败["+e.code+"]："+e.message);
//      plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
//  });
//}
        /**
         * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
         * @param {String} ov
         * @param {String} nv
         * @return {Boolean}
         */

    function compareVersion(ov, nv) {
        if (!ov || !nv || ov == "" || nv == "") {
            return false;
        }
        var b = false,
            ova = ov.split(".", 4),
            nva = nv.split(".", 4);
        for (var i = 0; i < ova.length && i < nva.length; i++) {
            var so = ova[i],
                no = parseInt(so),
                sn = nva[i],
                nn = parseInt(sn);
            if (nn > no || sn.length > so.length) {
                return true;
            } else if (nn < no) {
                return false;
            }
        }
        if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
            return true;
        }
    }

    $.checkUpdate = checkUpdate;
    $.downWgt = downWgt;
    return $;
}(mui={}));