/*
* common.js
*
*
*/

//action confirm
function confirm_action(url, msg, callback) {
	if(confirm(msg)) {
		$.get(url, function(json) {
			if(callback == 'reload') {
				window.location.reload();
			} else if(callback == undefined) {
				//code
			} else {
				callback(json);
			}
		});
	}

}

//全选(操作的checkbox对象id，被操作的checkbox父对象id)
function checkall(ckb, ck) {
	if($('#' + ckb).prop('checked') == true) {
		$('#' + ck + ' input:checkbox').prop('checked', true);
	} else {
		$('#' + ck + ' input:checkbox').prop('checked', false);
	}
}

//快捷选项
function quickmsg(content){
    //快捷选项
    var ui_text ='';
    $(".ui_kj").click(function(){

        var obj=document.getElementsByName('kj_'+content);
        var s = '';
        for(var i=0; i<obj.length; i++){
            if(obj[i].checked){
                s+=obj[i].value+'; ';
			}
        }
        var select_item = $('input:radio[name=select_item]:checked').val();
        s=(s == '' ? '你还没有选择任何内容！' : s);
        $("#remark_"+select_item).val(s);
    });
}

/*输入框变色提示*/
function input_alertshow(id){
	var bgcolor = document.getElementById(id).style.background;
	var c_1 = '#FFEBEB';
	var c_2 = '#FFF';
	document.getElementById(id).style.background='#FFEBEB';
	setTimeout("document.getElementById('"+id+"').style.background='"+c_2+"';",200);
	setTimeout("document.getElementById('"+id+"').style.background='"+c_1+"';",400);
	setTimeout("document.getElementById('"+id+"').style.background='"+c_2+"';",600);
	setTimeout("document.getElementById('"+id+"').style.background='"+c_1+"';",800);
	setTimeout("document.getElementById('"+id+"').style.background='"+c_2+"';",1000);
	setTimeout("document.getElementById('"+id+"').style.background='"+bgcolor+"';",1200);
	var nofocus = arguments[1] ? true : false;
	if (!nofocus){
		document.getElementById(id).focus();
	}
}
//setcookie('aa','123',86400000);
function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	var expires = new Date();
	expires.setTime(expires.getTime() + seconds);
	document.cookie = escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '/')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
}

//getcookie('aa')
function getcookie(name) {
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}