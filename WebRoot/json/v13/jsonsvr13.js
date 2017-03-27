$(document).ready(documentReady);
function documentReady() {
	window.onerror = function(msg, url, line) {
		showMessage("网页运行错误：" + msg + "<br/>地址：" + url + "<br/> 行号：" + line, -1, window.JsonSvr.errorColor);
	};
	ciUiInit();
	$(".citable,.cieditor").each(function(index, obj) {
		setCiTableDefault(obj, "citable")
		var citbody = $(obj).find(".citbody");
		if (citbody.length == 0)
			citbody = $(obj);
		if (citbody.children().length > 0) {
			setAttrIfUndefined($(citbody.children().get(0)), "#" + $(obj).attr("citblkeyfld") + "#");
		}
		citbody.attr("cibodytmpl", citbody.html());
		citbody.html("");
		docReadyToSetButtons(obj);
		ciGetDataRows(-1, obj);
	});
}
function ciGetDataRow(citable, successfun, errorfun) {
	ciGetDataRows(-1, citable, successfun, errorfun);
}
function ciGetDataRows(citblrowid, citable, successfun, errorfun) {
	showMessage("正在从服务器加载数据...");
	var citableId = "";
	if (typeof citable == "string") {
		citableId = citable;
		citable = $("#" + citable);
		citable = $(citable).get(0);
	} else {
		citableId = $(citable).attr("id");
	}
	if ($(citable).length == 0) {
		showMessage("运行错误[CIF-4002]：ciGetDataRows函数指定的参数citable（ID=“" + $(citable).attr("id") + "”）在页面中没有找到，请修改后再试！", -1, window.JsonSvr.errorColor);
		return;
	}
	var msg = {
		clientcmd : "G",
		citableid : $(citable).attr("id"),
		citblrowid : citblrowid,
		cipagesize : $(citable).attr("cipagesize"),
		cipageindex : $(citable).attr("cipageindex"),
		citblselcls : $(citable).attr("citblselcls"),
		citblfrmcls : $(citable).attr("citblfrmcls"),
		citblwhecls : $(citable).attr("citblwhecls"),
		citblgrpcls : $(citable).attr("citblgrpcls"),
		citblordcls : $(citable).attr("citblordcls"),
		citblhavcls : $(citable).attr("citblhavcls")
	};
	msg = ciCheckMsg(msg);
	$.ajax({
		url : JsonSvr.ciJsonServerHttpPath,
		type : "POST",
		cache : false,
		async : false,
		data : "msg=" + $.base64.encode(encodeURI(JSON.stringify(msg))),
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(data) {
			ajaxGetDatarowsSucc(data, successfun)
		},
		error : function(xhr, error, settings, errorType) {
			ajaxErrorHandler(xhr, error, settings, errorType, errorfun)
		}
	});
}
function ajaxGetDatarowsSucc(data, successfun) {
	var isRefresh = true;
	if (successfun != undefined && successfun != null)
		try {
			isRefresh = successfun(data);
		} catch (ex) {
			showMessage("运行错误[CIF-30100]ciGetDataRows->successfun回调错误：" + ex, -1, window.JsonSvr.errorColor);
		}
	if (isRefresh == undefined)
		isRefresh == true;
	if (!isRefresh)
		return;
	var result = data.result;
	var cirows = data.cirows;
	var cicols = data.cicols;
	showMessage("");
	if (result.issucc != "OK") {
		showMessage(result.errmessage, -1, "#996633");
		return;
	}
	if (result.citableid == "")
		return;
	var citable = $("#" + result.citableid);
	if (citable.length == 0) {
		showMessage("发生错误[CIF-5010]:服务请求成功后回显数据时找到指定的citable对象ID=“" + result.citableid + "”。", 3000, window.JsonSvr.errorColor);
		return;
	}
	citable.attr("cipagecount", result.cipagecount);
	citable.attr("cirowcount", result.cirowcount);
	citable.attr("cipagesize", result.cipagesize);
	citable.attr("data-citablecirows", cirows);
	citable.attr("data-citablecicols", cicols);
	var citbody = citable.find(".citbody");
	if (citbody.length == 0)
		citbody = citable;
	citbody.html("");
	var cibodytmpl = citbody.attr("cibodytmpl");
	if (!cibodytmpl)
		cibodytmpl = "";
	var beforecionfilldatafun = citbody.attr("data-beforecionfilldata");
	if (beforecionfilldatafun != "" && beforecionfilldatafun != undefined) {
		try {
			eval("data = " + beforecionfilldatafun);
			cirows = data.cirows;
		} catch (e) {
			showMessage("运行错误[CIF30033]删除数据前回调函数beforecionfilldata时发生错误：" + e);
		}
	}
	for (i = 0; i < cirows.length; i++) {
		var reg = new RegExp("<(img*?)[^>]*>");
		var jqcirowdata = cibodytmpl;
		for (j = 0; j < cicols.length; j++) {
			(eval("jqcirowdata=jqcirowdata.replace(/#" + cicols[j].colname + "#/g, cirows[i]." + cicols[j].colname + ");"));
			jqcirowdata = jqcirowdata.replace(reg, "");
		}
		var jqcirowdata = $(jqcirowdata);
		jqcirowdata.appendTo(citbody);
		setCibodytmplHtml(i, jqcirowdata, result, cirows, cicols, citable);
	}
	var aftercionfilldatafun = citbody.attr("data-aftercionfilldata");
	if (aftercionfilldatafun != "" && aftercionfilldatafun != undefined) {
		try {
			eval("data = " + aftercionfilldatafun);
			cirows = data.cirows;
		} catch (e) {
			showMessage("运行错误[CIF30033]删除数据前回调函数aftercionfilldata时发生错误：" + e);
		}
	}
	setEditorHtml(citable);
	ciSetPagerHtml(citable, result);
}
function ciCheckMsg(msg) {
	if (msg.cipagesize == undefined)
		msg.cipagesize = 10;
	if (msg.cipageindex == undefined)
		msg.cipageindex = 0;
	if (msg.citableid == undefined)
		msg.citableid = "";
	if (msg.citblrowid == undefined)
		msg.citblrowid = 0;
	if (msg.citblselcls == undefined)
		msg.citblselcls = "";
	if (msg.citblfrmcls == undefined)
		msg.citblfrmcls = "";
	if (msg.citblwhecls == undefined)
		msg.citblwhecls = "";
	if (msg.citblgrpcls == undefined)
		msg.citblgrpcls = "";
	if (msg.citblordcls == undefined)
		msg.citblordcls = "";
	if (msg.citblhavcls == undefined)
		msg.citblhavcls = "";
	return msg;
}
function ciQueryDataRows(msg, successfun, errorfun) {
	showMessage("正在从服务器查询数据...");
	msg = ciCheckMsg(msg);
	$.ajax({
		url : JsonSvr.ciJsonServerHttpPath,
		type : "POST",
		cache : false,
		async : false,
		data : "msg=" + $.base64.encode(encodeURI(JSON.stringify(msg))),
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(data) {
			showMessage("");
			try {
				if (successfun != null) {
					successfun(data)
				}
				;
			} catch (e) {
				showMessage("运行错误[CIF-30210]ciQueryDataRows->successfun回调错误：" + e, -1, window.JsonSvr.errorColor);
			}
		},
		error : function(xhr, error, settings, errorType) {
			ajaxErrorHandler(xhr, error, settings, errorType, errorfun)
		}
	});
}
function ciUpdateDataRow(citableid, citblname, clientcmd, fldnames, fldvals, citblwhecls, addtional, successfun, errorfun) {
	showMessage("正在向服务器更新数据...");
	var msg = {
		citableid : citableid,
		citblname : citblname,
		citblwhecls : citblwhecls,
		clientcmd : clientcmd,
		fldnames : fldnames,
		fldvals : fldvals
	};
	$.ajax({
		type : "POST",
		url : JsonSvr.ciJsonServerHttpPath,
		cache : false,
		async : false,
		data : "msg=" + $.base64.encode(encodeURI(JSON.stringify(msg))),
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(data) {
			ajaxUpdateSucc(data, successfun, errorfun)
		},
		error : function(xhr, error, settings, errorType) {
			ajaxErrorHandler(xhr, error, settings, errorType, errorfun)
		}
	});
}
function ajaxUpdateSucc(data, successfun, errorfun) {
	if (successfun != undefined)
		try {
			successfun(data);
		} catch (ex) {
			showMessage("运行错误[CIF-30200]ciUpdateDataRow->successfun回调错误：" + ex, -1, window.JsonSvr.errorColor);
		}
	var result = data.result;
	if (result.issucc != "OK") {
		showMessage(result.errmessage, -1, window.JsonSvr.errorColor);
	} else {
		if (result.clientcmd == 'A')
			showMessage("添加数据成功!", 3000);
		else if (result.clientcmd == 'D')
			showMessage("删除数据成功!", 3000);
		else if (result.clientcmd == 'U')
			showMessage("数据更新成功!", 3000);
		else
			showMessage("");
	}
}
function ajaxErrorHandler(xhr, error, settings, errorType, errorfun) {
	if (errorfun != undefined && errorfun != null)
		try {
			errorfun(xhr, error, settings, errorType);
		} catch (ex) {
			showMessage("运行错误[CIF-30101]errorfun回调错误：" + ex, -1, window.JsonSvr.errorColor);
		}
	if (xhr.status == 200) {
		showMessage(error.replace("parsererror", "消息解析错误!"), -1, window.JsonSvr.errorColor);
	} else if (xhr.status == 404)
		showMessage("Http404错误：访问地址不存在！", -1, window.JsonSvr.errorColor);
	else if (xhr.status == 500)
		showMessage("Http500错误:" + xhr.statusText - 1, window.JsonSvr.errorColor)
	else if (xhr.status == 0) {
		var str = xhr.statusText.replace("NetworkError:", "网络错误！").replace("Failed to execute 'send' on 'XMLHttpRequest': Failed to load", " 执行send命令时加载错误").replace(window.JsonSvr.ciJsonServerHttpPath.replace("../../../", ""), "");
		showMessage("Http" + str, -1, window.JsonSvr.errorColor);
	}
}
function getFldNamesAndVals(cieditor) {
	var fldnames = [];
	var fldvals = [];
	if (typeof cieditor === "string")
		cieditor = $("#" + cieditor);
	cieditor.find(".cifield").each(function(index, el) {
		var jqObj = $(el);
		var fldname = jqObj.attr("cifldname");
		var fldval = jqObj.val();
		fldnames.push(fldname);
		fldvals.push(fldval);
	});
	return {
		fldnames : fldnames,
		fldvals : fldvals
	};
}
function ciSetPagerHtml(citable, result) {
	var citableid = citable.attr("id");
	var cipagerid = citable.attr("cipagerid");
	var cipager = undefined;
	if (cipagerid != undefined && cipagerid != "") {
		if ($("#" + cipagerid).length == 0) {
			showMessage("设计错误[CIF40100]数据列表：id=“" + citableid + "”指定的cipagerid=“" + cipagerid + "”没有找到！", -1, window.JsonSvr.errorColor);
		}
		cipager = $("#" + cipagerid);
	} else {
		cipager = citable.parents(".cidatalist").find(".cipager");
	}
	if (cipager.length == 0)
		return;
	citable.attr("cipagerid", cipager.attr("id"));
	cipager.attr("citableid", citableid);
	citable.attr("cipagecount", result.cipagecount);
	citable.attr("cirowcount", result.cirowcount);
	var lastpage = result.cipagecount;
	var prevpage = result.cipageindex - 1;
	if (prevpage < 0)
		prevpage = 0;
	var nextpage = result.cipageindex + 1;
	if (nextpage > lastpage)
		nextpage = lastpage;
	if (result.cirowcount == 0) {
		$(citable).find("thead").hide();
		var citbody = $(citable).find(".citbody");
		if (citbody.lenght == 0)
			citbody = citable;
		citbody.html("");
	} else {
		$(citable).find("thead").show();
	}
	if (result.cirowcount <= 0) {
		cipager.html('<span>没有发现数据。<span>');
	} else if (result.cipagecount == 1) {
		cipager.html('<span>共' + result.cirowcount + '项<span>');
	} else {
		cipager.html('<span>(' + (result.cipageindex + 1) + "/" + result.cipagecount + ')页,共' + result.cirowcount + '项</span>' + '<input type="button" class="firstpage" onclick="gotoPage(this,0)" value="首页"/>' + '<input type="button" class="prevpage" onclick="gotoPage(this,' + prevpage + ')" value="上页"/>' + '<input type="button" class="nextpage" onclick="gotoPage(this,' + nextpage + ')" value="下页"/>' + '<input type="button" class="lastpage" onclick="gotoPage(this,' + lastpage + ')" value="末页"/>' + '<input type="text" value="" class="textgoto" />' + '<input type="button" onclick="gotoPage(this,-1)" value="跳转">');
	}
}
function gotoPage(obj, pageindex) {
	var citableid = $(obj).parents(".cipager").attr("citableid");
	var citable = $("#" + citableid).get(0);
	var cipageindex = parseInt($(citable).attr("cipageindex"));
	if (pageindex >= 0) {
		cipageindex = pageindex;
	} else {
		var textgoto = $(obj).parents(".cipager").find(".textgoto");
		try {
			if ((textgoto.val() != "") && (!isNaN(textgoto.val()))) {
				cipageindex = parseInt(textgoto.val()) - 1;
				var maxindex = parseInt($(citable).attr("cipagecount")) - 1;
				if (cipageindex < 0)
					cipageindex = 0;
				if (cipageindex > maxindex)
					cipageindex = maxindex;
			}
		} catch (e) {
			textgoto.val("");
		}
	}
	$(citable).attr("cipageindex", cipageindex);
	ciGetDataRows(-1, citable);
}
function setServerSession(keyname, keyvalue, successfun, errorfun) {
	var fldNames = [];
	var fldValues = [];
	fldNames.push(keyname);
	fldValues.push(keyvalue);
	ciUpdateDataRow("", "", "SETSESSION", fldNames, fldValues, "", null, successfun, errorfun);
}
function getServerSession(keyname, successfun, errorfun) {
	ciUpdateDataRow("", "", "GETSESSION", [ keyname ], [ "" ], "", null, successfun, errorfun);
}
function getTableName(citable) {
	var tableName = citable.attr("citablename");
	if (tableName == undefined || tableName == "") {
		tableName = citable.attr("citblfrmcls");
	}
	var spacePos = tableName.indexOf(" ");
	if (spacePos < 0)
		return tableName;
	else
		return tableName.substring(0, spacePos);
}
function setCiTableDefault(obj, idPrefix) {
	obj = $(obj);
	if ($(obj).prop("tagName") == "TABLE") {
		setAttrIfUndefined(obj, "cellpadding", "4px");
		setAttrIfUndefined(obj, "cellspacing", "0px");
		setAttrIfUndefined(obj, "border", "1px");
		setAttrIfUndefined(obj, "rules", "all");
		setCssIfUndefined(obj, "width", "100%");
	}
	setAttrIfUndefined(obj, "cipagesize", "10");
	setAttrIfUndefined(obj, "cipageindex", "0");
	setAttrIfUndefined(obj, "citblselcls", "*");
	setAttrIfUndefined(obj, "citblwhecls", "");
	setAttrIfUndefined(obj, "citblordcls", "");
	if (!obj.attr("citblfrmcls")) {
		showMessage("页面设计错误[CIF-40060]：citable id=“" + obj.attr("id") + "”缺少citblfrmcls参数设定，请修改后再试！", -1, "#CA5100");
	}
	var pagerid = obj.attr("citblpagerid");
	if (pagerid && $("#" + pagerid).length == 0) {
		showMessage("页面设计错误[CIF-40061]：citable id=“" + obj.attr("id") + "”指定的分页栏“" + pagerid + "”找不到，请修改后再试！", -1, "#9966cc");
	}
	var editorid = obj.attr("citbleditorid");
	if (editorid && $("#" + editorid).length == 0) {
		showMessage("页面设计错误[CIF-40062]：citable id=“" + obj.attr("id") + "”指定的编辑器“" + editorid + "”找不到，请修改后再试！", -1, "#9966cc");
	}
}
function setAttrIfUndefined(obj, name, value) {
	if (obj.attr(name) == undefined)
		obj.attr(name, value);
}
function setCssIfUndefined(obj, name, value) {
	if (obj.css(name) == undefined || obj.css(name) == "none")
		obj.css(name, value);
}
function checkUniqueId(obj, prefix) {
	if (!obj)
		return;
	$(obj).each(function(index, el) {
		var objId = $(el).attr("id");
		if (!objId) {
			objId = 0;
			while (true) {
				if ($("#" + prefix + objId).length == 0) {
					$(el).attr("id", prefix + objId);
					break;
				}
				objId = objId + 1;
			}
		}
	});
}
function ciStrToInt(obj, defValue) {
	try {
		obj = parseInt(obj);
	} catch (e) {
		obj = defValue;
	}
	return obj;
}
function showMessage(msg, fadeTime, bgcolor) {
	if (!fadeTime)
		fadeTime = 0;
	if (!bgcolor)
		bgcolor = "#336600";
	var msgwarp = $("#divcimsgwarp");
	if (msgwarp.length == 0) {
		msgwarp = $("<div id=\"divcimsgwarp\" style=\"position:absolute;top:0px;right:0px;\"></div>");
		$(document.body).append(msgwarp);
	}
	var msgCount = msgwarp.find("div").length;
	var divcimsgid = "divcimsg" + msgCount;
	if (fadeTime == 0) {
		divcimsgid = "divcimsg";
	}
	var divcimsg = $("#" + divcimsgid);
	if (divcimsg.length > 0)
		divcimsg.remove();
	divcimsg = $("<div class='cimessage' id=\"" + divcimsgid + "\" title=\"点击关闭显示。\" style=\"background-color:" + bgcolor + ";\" onclick=\"$(this).remove();\"></div>");
	msgwarp.append(divcimsg);
	divcimsg.html(msg);
	if (msg == "") {
		divcimsg.remove();
	} else {
		divcimsg.slideDown("fast", function() {
			if (fadeTime == 0) {
				divcimsg.fadeOut(5000);
			} else if (fadeTime > 0) {
				divcimsg.fadeOut(fadeTime, function() {
					$(this).remove();
				});
			}
		});
	}
}
function ciUiInit() {
	window.JsonSvr = {};
	window.JsonSvr.ciJsonServerHttpPath = "";
	window.JsonSvr.errorColor = "#996633";
	$.ajax({
		url : "../json/jsonsvrurl.html",
		type : "GET",
		cache : false,
		async : false,
		data : {},
		dataType : "text",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(data) {
			if (window.JsonSvr.ciJsonServerHttpPath == "" || window.JsonSvr.ciJsonServerHttpPath == null || window.JsonSvr.ciJsonServerHttpPath == undefined) {
				window.JsonSvr.ciJsonServerHttpPath = data;
			}
		},
		error : function(xhr, error, settings, errorType) {
			ajaxErrorHandler(xhr, error, settings, errorType, null)
		}
	});
	checkUniqueId($(".table"), "table");
	checkUniqueId($(".cieditor"), "cieditor");
	checkUniqueId($(".citbody"), "citbody");
	checkUniqueId($(".cipager"), "cipager");
	setCssIfUndefined($(".cibtnnew"), "background-image", "url('../json/images24/new.gif')");
	setCssIfUndefined($(".cibtndelete"), "background-image", "url('../json/images24/delete.gif')");
	setCssIfUndefined($(".cibtnedit"), "background-image", "url('../json/images24/edit.gif')");
	setCssIfUndefined($(".cibtnsearch"), "background-image", "url('../json/images24/search.gif')");
	setCssIfUndefined($(".cibtnprint"), "background-image", "url('../json/images24/print.gif')");
	setCssIfUndefined($(".cibtnstatic"), "background-image", "url('../json/images24/statsic.gif')");
	setCssIfUndefined($(".cibtnsave"), "background-image", "url('../json/images24/save.gif')");
	setCssIfUndefined($(".cibtnsubmit"), "background-image", "url('../json/images24/save.gif')");
	setCssIfUndefined($(".cibtncancel"), "background-image", "url('../json/images24/cancel.gif')");
	setCssIfUndefined($(".cibtnrefresh"), "background-image", "url('../json/images24/refresh.gif')");
	setCssIfUndefined($(".cibtntrash"), "background-image", "url('../json/images24/trash.gif')");
	$(".cibtnsubmit,.cibutton,.cibtnnew,.cibtndelete,.cibtnedit,.cibtnsave,.cibtncancel,.cibtnsearch,.cibtnprint,.cibtnstatic,.cibtnrefresh,.cibtntrash").each(function(i, btn) {
		$(btn).bind("mouseover", function() {
			$(this).addClass("cibtnover");
		}).bind("mouseout", function() {
			$(this).removeClass("cibtnover");
		});
	});
	if ($(".citable").length > 0) {
		$(".cieditor").hide();
	}
	$("input[data-cicheckbyname]").each(function(i, obj) {
		var checkboxName = $(obj).attr("data-cicheckbyname");
		if ($("input[name='" + checkboxName + "']").length == 0) {
			showMessage("页面设计错误[CIF-5000]：" + $(obj).prop("outerHTML") + "</pre>没有找到name属性为“" + checkboxName + "”的checkbox控件，请修改后再试！", -1, "#9966cc");
		}
		$(obj).bind("click", function() {
			var cbchked = $(this).get(0).checked;
			var checkboxName = $(obj).attr("data-cicheckbyname");
			if ($("input[name='" + checkboxName + "']").length == 0) {
				alert("运行错误[CIF-5000]" + $(obj).prop("outerHTML") + "，没有找到name属性为“" + checkboxName + "”的checkbox控件！>");
			}
			$("input[name='" + checkboxName + "']").each(function() {
				this.checked = cbchked;
			});
		});
	});
}
function doTextSearch(obj) {
	var citable = $(obj).parents(".cidatalist").find(".citable");
	var citextsearch = $(obj).parent(".citoolbar").find(".citextsearch");
	if (citable.length > 0 && citextsearch.length > 0) {
		var searchstr = citextsearch.val();
		if (searchstr == undefined || searchstr == null)
			searchstr = "";
		else {
			searchstr = searchstr.trim();
			searchstr = searchstr.replace(/'/g, "''");
			searchstr = searchstr.replace(/%/g, "%%");
		}
		var citblwhecls = citable.attr("citblwhecls");
		var citblwheclsold = citable.attr("citblwheclsold");
		if (citblwheclsold == undefined || citblwheclsold == null) {
			citable.attr("citblwheclsold", citblwhecls);
			citblwheclsold = citblwhecls;
		}
		if (searchstr == "") {
			if (citblwheclsold != undefined && citblwheclsold != null) {
				citable.attr("citblwhecls", citblwheclsold);
			}
		} else {
			var cisearchel = citextsearch.attr("data-cisearchel");
			searchstr = cisearchel.replace(/#CIEL#/g, searchstr);
			if (citblwheclsold == "")
				citable.attr("citblwhecls", searchstr);
			else
				citable.attr("citblwhecls", citblwheclsold + "AND" + searchstr);
		}
		ciGetDataRows(-1, citable);
	}
}
function docReadyToSetButtons(citable) {
	$("input[data-cirefreshid]").each(function(i, btn) {
		var refreshid = $(btn).attr("data-cirefreshid");
		if (!$("#" + refreshid))
			showMessage("页面设计错误[CIF-5000]：" + $(btn).prop("outerHTML") + "</pre>没有找到id为“" + refreshid + "”的citable控件，请修改后再试！", -1, "#9966cc");
		$(btn).attr("onclick", "ciGetDataRows(-1,\"" + refreshid + "\");showMessage('刷新成功！',2000)");
	});
	$(citable).parents(".cidatalist").find(".cibtnsearch").bind("click", function() {
		doTextSearch(this);
	});
	$(citable).parents(".cidatalist").find(".cibtnprint").bind("click", function() {
		var citableid = $(this).attr("data-citableid");
		var citableObj = $("#" + citableid);
		if (citableObj.length == 0) {
			showMessage("页面设计错误[CIF-5001]：没有找到citable id=“" + citableid + "”，请修改后再试！", -1, "#9966cc");
			return;
		}
		var ciprintparams = $(this).attr("data-ciprintparams");
		var addtional = {};
		eval("addtional=" + ciprintparams);
		addtional.citblname = getTableName(citableObj);
		addtional.citblselcls = citableObj.attr("citblselcls");
		addtional.citblfrmcls = citableObj.attr("citblfrmcls");
		addtional.citblwhecls = citableObj.attr("citblwhecls");
		addtional.citblgrpcls = citableObj.attr("citblgrpcls");
		addtional.citblgrpcls = citableObj.attr("citblgrpcls");
		addtional.citblordcls = citableObj.attr("citblordcls");
		addtional.citblhavcls = citableObj.attr("citblhavcls");
		var uuid = Math.uuid();
		setServerSession(uuid, JSON.stringify(addtional));
		window.location = window.JsonSvr.ciJsonServerHttpPath + "?action=print&id=" + uuid;
	});
	$(citable).parents(".cidatalist").find(".citextsearch").bind("keyup", function() {
		doTextSearch(this);
	}).bind("blur", function() {
		doTextSearch(this);
	});
	$(citable).parents(".cidatalist").find(".cibtndelete").each(function(i, btn) {
		$(btn).bind("click", function() {
			if ($(this).parents(".cidatalist").find(".citable").length > 0) {
				var citableid = $(this).attr("data-citableid");
				var citableObj = undefined;
				if (citableid != undefined && citableid != "") {
					citableObj = $("#" + citableid);
				}
				if (citableObj.length == 0) {
					showMessage("页面设计错误[CIF-5000]：没有找到citable id=“" + citableid + "”，请修改后再试！", -1, "#9966cc");
					return;
				}
				if (!citableObj.attr("citblkeyfld")) {
					showMessage("数据列表“" + citableid + "”页面设计错误[CIF-5002]缺少数据表键列名“citblkeyfld”属性设置，请修改后再试！");
					return;
				}
				var checkboxName = $(btn).attr("data-cidelbycbname");
				if (checkboxName == undefined || checkboxName == "") {
					showMessage("页面设计错误[CIF-5003]数据列表关联的删除按钮缺少“data-cidelbycbname”属性设置，请修改后再试！", -1, "#9966cc");
					return;
				}
				if ($("input[name='" + checkboxName + "']").length == 0) {
					showMessage("页面设计错误[CIF-5004]：根据删除按钮的data-cidelbycbname属性设置" + $(btn).prop("outerHTML") + "没有找到name属性为“" + checkboxName + "”的checkbox控件，请修改后再试！", -1, "#9966cc");
					return;
				}
				var citblname = getTableName(citableObj);
				var citblwheids = "";
				var selCount = 0;
				$("input[name='" + checkboxName + "']").each(function(cbindex, cb) {
					if (cb.checked) {
						if (citblwheids != "")
							citblwheids += ",";
						citblwheids += $(cb).parents("tr").attr("data-citrid");
						selCount++;
					}
				});
				if (citblwheids == "") {
					showMessage("请先选择所需删除的行。");
					return;
				}
				if (confirm("确定要删除选中的" + selCount + "个数据吗？")) {
					if (citblwheids != null) {
						var citblkeyfld = $(citableObj).attr("citblkeyfld");
						var citblwhecls = citblkeyfld + " IN (" + citblwheids + ")";
						var data = {
							citblname : citblname,
							citblwhecls : citblwhecls,
							citblkeyfld : citblkeyfld,
							citblwheids : citblwheids
						};
						var cibeforedeletefun = $(this).attr("data-cibeforedelete");
						var iscandelete = true;
						if (cibeforedeletefun != "" && cibeforedeletefun != undefined) {
							try {
								eval("iscandelete = " + cibeforedeletefun);
								if (iscandelete == undefined)
									iscandelete = true;
							} catch (e) {
								showMessage("运行错误[CIF30033]删除数据前回调函数cibeforedelete时发生错误：" + e);
							}
						}
						if (iscandelete)
							ciUpdateDataRow(citableid, citblname, "D", [], [], citblwhecls);
						var ciondeleted = $(this).attr("data-ciondeleted");
						if (ciondeleted != "" && ciondeleted != undefined) {
							try {
								eval(ciondeleted);
							} catch (e) {
								showMessage("运行错误[CIF30034]删除数据后回调函数ciondeleted时发生错误：" + e);
							}
						}
					}
					ciGetDataRows(-1, citableid);
					$(btn).parents(".cidatalist").find("input[data-cicheckbyname]").each(function(index, cb) {
						cb.checked = false;
					});
				}
			} else if ($(this).parents(".cidatalist").find(".cieditor").length > 0) {
				var editor = this.parents(".cidatalist").find(".cieditor");
				var citblwhecls = editor.attr("citblwhecls");
				var citblkeyfld = $(citableObj).attr("citblkeyfld");
				var citblname = getTableName(editor);
				if (confirm("确定要删除当前的数据吗？")) {
					var data = {
						citblname : citblname,
						citblwhecls : citblwhecls,
						citblkeyfld : citblkeyfld,
						citblwheids : ""
					};
					ciUpdateDataRow(editor.attr("id"), citblname, "D", [], [], citblwhecls);
					var ciondeleted = $(this).attr("data-ciondeleted");
					if (ciondeleted != "" && ciondeleted != undefined) {
						try {
							eval(ciondeleted);
						} catch (e) {
							showMessage("运行错误[CIF30036]删除数据后回调函数ciondeleted时发生错误：" + e);
						}
					}
				}
				ciGetDataRow(editor);
			}
		});
	});
	$(citable).parents(".cidatalist").find(".cibtnnew").bind("click", function() {
		var citrid = -1;
		var citableid = $(this).attr("data-citableid");
		var cieditorid = $(this).attr("data-cieditorid");
		var cieditor = $("#" + cieditorid);
		if (cieditor.length == 0) {
			showMessage("找不到编辑器" + $(this).attr("data-cieditorid") + "，操作不能继续！");
			return;
		}
		if (!cieditor.attr("citblkeyfld")) {
			showMessage("设计错误[CIF-50300]编辑器缺少数据表键列名“citblkeyfld”属性设置，操作不能继续！");
			return;
		}
		cieditor.attr("data-citableid", citableid);
		cieditor.attr("citblwhecls", cieditor.attr("citblkeyfld") + "=" + citrid);
		cieditor.attr("cieditmode", "A");
		cieditor.attr("data-citrid", "-1");
		cieditor.html(cieditor.attr("cibodytmpl"));
		setEditorHtml(cieditor);
		$("#" + citableid).parents(".cidatalist").hide();
		cieditor.show();
		var cionnewclickfun = $(this).attr("data-cionnewclick");
		if (cionnewclickfun != undefined && cionnewclickfun != "") {
			try {
				eval(cionnewclickfun);
			} catch (e) {
				showMessage("运行错误[CIF30034]回调cionnewclick时发生错误：" + e);
			}
		}
	});
}
function validationData(cieditor) {
	var cicols = null;
	ciQueryDataRows({
		clientcmd : "G",
		cipagesize : "1",
		cipageindex : "0",
		citableid : "",
		citblrowid : "-1",
		citblselcls : "*",
		citblfrmcls : getTableName(cieditor),
		citblwhecls : "TRID<0",
		citblordcls : ""
	}, function(d) {
		cicols = d.cicols;
	});
	cieditor.find(".cifield").each(function(index, elInput) {
		if (cicols == null) {
			return
		}
		var cifldname = $(elInput).attr("cifldname");
		for (colindex = 0; colindex < cicols.length; colindex++) {
			if (cicols[colindex].colname == cifldname) {
				var lngth = cicols[colindex].collength;
				if (cicols[colindex].coltype == 4 || cicols[colindex].coltype == "System.Int32") {
					$(elInput).bind("blur", function() {
						var reg = /^[0-9]*$/;
						var num = $(this).val();
						if (!reg.test(num)) {
							showMessage("数字格式不正确，请重新输入！", 3000, "#FF1100");
							$(this).focus();
							$(this).addClass("validerror");
						} else if (num.length > lngth) {
							showMessage("请输入" + lngth + "位以内的数字！", 3000, "#FF1100");
							$(this).focus();
							$(this).addClass("validerror");
						} else {
							$(this).removeClass("validerror");
						}
					});
				}
				if (cicols[colindex].coltype == 8 || cicols[colindex].coltype == "System.Double") {
					$(elInput).bind("blur", function() {
						var reg = /^[0-9]*(\.[0-9]*|[eE][+-][0-9]*)$/;
						var num = $(this).val();
						if (!reg.test(num)) {
							showMessage("请输入数字！", 3000, "#FF1100");
							$(this).focus();
							$(this).addClass("validerror");
						} else if (num.length > lngth) {
							showMessage("请输入" + lngth + "位以内的数字！", 3000, "#FF1100");
							$(this).focus();
							$(this).addClass("validerror");
						} else {
							$(this).removeClass("validerror");
						}
					});
				}
				if (cicols[colindex].coltype == 12 || cicols[colindex].coltype == "System.String") {
					$(elInput).bind("blur", function() {
						var str = $(this).val();
						if (str == undefined)
							str = "";
						if (str.replace(/[^\x00-\xff]/g, "aa").length > lngth) {
							showMessage("字符长度不能超过" + lngth + "个，请适应删减后再试！", 3000, "#FF1100");
							$(this).addClass("validerror");
							$(this).focus();
						} else {
							$(this).removeClass("validerror");
						}
					});
				}
				if (cicols[colindex].coltype == 91 || cicols[colindex].coltype == "System.DateTime") {
					$(elInput).bind("focus", function() {
						WdatePicker({
							dateFmt : 'yyyy-MM-dd'
						});
					});
				}
				if (cicols[colindex].coltype == 3 || cicols[colindex].coltype == "System.Decimal") {
					$(elInput).bind("blur", function() {
						var dec = $(this).val();
						var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
						if (!reg.test(dec)) {
							showMessage("数字格式不正确，请重新输入！", 3000, "#FF1100");
							$(this).focus();
							$(this).addClass("validerror");
						} else if (dec.length > lngth) {
							$(this).focus();
							showMessage("数字长度不能超过" + lngth + "个！", 3000, "#FF1100");
						} else {
							$(this).removeClass("validerror");
						}
					});
				}
			}
		}
	});
}
function setCibodytmplHtml(index, cibodytmpl, result, cirows, cicols, citable) {
	if ($(cibodytmpl).prop("tagName") == "TR") {
		if (index % 2)
			cibodytmpl.addClass("treven");
		else
			cibodytmpl.addClass("trodd");
		cibodytmpl.bind("mouseover", function() {
			$(this).addClass('trover')
		});
		cibodytmpl.bind("mouseout", function() {
			$(this).removeClass('trover')
		});
		cibodytmpl.find(".cihrefedit").attr("href", "javascript:void(0)").bind("click", function() {
			ciHrefEdit(this)
		});
		cibodytmpl.find(".cihrefdele").attr("href", "javascript:void(0)").bind("click", function() {
			if (confirm('确定要删除吗？'))
				ciHrefDele(this);
		});
		var citableid = $(".cibtnnew").attr("data-citableid");
		var cieditorid = $(".cibtnnew").attr("data-cieditorid");
		cibodytmpl.find(".cihrefedit,.cihrefdele").attr("data-citableid", citableid).attr("data-cieditorid", cieditorid);
	} else {
		cibodytmpl.find(".cifield").each(function(index, element) {
			var jqObj = $(element);
			var fldName = jqObj.attr("cifldname");
			if (jqObj.prop("tagName").toUpperCase() == "INPUT") {
				var innerHtml = jqObj.val();
				innerHtml = eval("innerHtml=cirows[i]." + fldName + ";");
				jqObj.val(innerHtml);
			}
		});
	}
}
function ciHrefEdit(obj) {
	var citrid = $(obj).parents("tr").attr("data-citrid");
	if (!citrid) {
		showMessage("按钮不在一个TR父级对象之中或没有找到，TR对象的“data-citrid”属性，操作不能继续！", 5000, "#336699");
		return;
	}
	var citable = $(obj).parents(".citable");
	if (citable.length == 0) {
		showMessage("没有找到当前对象的父级citable，操作不能继续！", 5000, "#336699");
		return;
	}
	var cieditor = null;
	if ($(citable).attr("citbleditorid") == undefined)
		cieditor = $(".cieditor");
	else
		cieditor = $("#" + (citable).attr("citbleditorid"));
	if (cieditor.length == 0) {
		showMessage("没有找到编辑器，操作不能继续！");
		return;
	}
	if (!cieditor.attr("citblkeyfld")) {
		showMessage("编辑器缺少数据表键列名“citblkeyfld”属性设置，操作不能继续！");
		return;
	}
	cieditor.attr("data-citableid", citable.attr("id"));
	cieditor.attr("data-citrid", citrid);
	cieditor.attr("cieditmode", "U");
	cieditor.attr("citblwhecls", cieditor.attr("citblkeyfld") + "=" + citrid);
	ciGetDataRows(citrid, cieditor);
	citable.parents(".cidatalist").hide();
	cieditor.show();
	var cioneditclickfun = $(this).attr("data-cioneditclick");
	if (cioneditclickfun != undefined && cioneditclickfun != "") {
		try {
			eval(cioneditclickfun);
		} catch (e) {
			showMessage("运行错误[CIF30034]回调cioneditclick时发生错误：" + e);
		}
	}
}
function setEditorHtml(cieditor) {
	if ($(cieditor).length == 0) {
		return;
	}
	cieditor.find(".cifield").each(function(index, element) {
		if (cieditor.attr("cieditmode") == "A") {
			$(element).val($(element).attr("cidefval"));
		}
	});
	validationData(cieditor);
	cieditor.find(".cibtnsave,.cibtndelete,.cibtncancel").attr("data-cieditorid", cieditor.attr("id"));
	if (cieditor.attr("data-citableid")) {
		cieditor.find(".cibtnsave,.cibtndelete,.cibtncancel").attr("data-citableid", cieditor.attr("data-citableid"));
	}
	cieditor.find(".cibtnnew,.cibtnsave,.cibtncancel,.cibtndelete").each(function(i, el) {
		$(el).bind("mouseover", function() {
			$(this).addClass("cibtnover");
		});
		$(el).bind("mouseout", function() {
			$(this).removeClass("cibtnover");
		});
	});
	cieditor.find(".cibtnsave").bind("click", function() {
		var cieditor = $("#" + $(this).attr('data-cieditorid'));
		if (cieditor.length == 0) {
			showMessage("参数错误，编辑区没有找到！", -1, "#996633");
			return;
		}
		var citblname = getTableName(cieditor);
		var data = getFldNamesAndVals(cieditor);
		var fldnames = data.fldnames;
		var fldvals = data.fldvals;
		data.citblname = citblname;
		data.citblwhecls = cieditor.attr("citblwhecls");
		data.cieditmode = cieditor.attr("cieditmode");
		var cibeforesavefun = $(this).attr("data-cibeforesave");
		var iscansave = true;
		if (cibeforesavefun != "" && cibeforesavefun != undefined) {
			try {
				eval("iscansave = " + cibeforesavefun);
				if (iscansave == undefined)
					iscansave = true;
			} catch (e) {
				showMessage("运行错误[CIF-40064]保存数据后回调函数cionsaved运行错误：" + e);
			}
		}
		if (iscansave)
			ciUpdateDataRow(cieditor.attr("id"), citblname, data.cieditmode, fldnames, fldvals, data.citblwhecls);
		var cionsavedfun = $(this).attr("data-cionsaved");
		if (cionsavedfun != "" && cionsavedfun != undefined) {
			try {
				eval(cionsavedfun);
			} catch (e) {
				showMessage("运行错误[CIF-40064]保存数据后回调函数cionsaved运行错误：" + e);
			}
		}
		var citableid = $(this).attr('data-citableid');
		if (citableid) {
			var citable = $("#" + citableid);
			cieditor.hide();
			citable.parents(".cidatalist").show();
			ciGetDataRows(-1, citable);
		}
	});
	cieditor.find(".cibtncancel").bind("click", function() {
		var cieditor = $("#" + $(this).attr('data-cieditorid'));
		var citableid = $(this).attr('data-citableid');
		if (citableid) {
			var citable = $("#" + citableid);
			cieditor.hide();
			citable.parents(".cidatalist").show();
			ciGetDataRows(-1, citable);
		} else {
			if (document.referrer) {
				window.location.href = document.referrer;
			}
		}
	});
}
function ciHrefDele(obj) {
	var trid = $(obj).parents("tr").attr("data-citrid");
	var citableid = $(obj).attr("data-citableid");
	var citableObj = $("#" + citableid);
	if (citableObj.length == 0) {
		showMessage("运行错误[CIF-5001]：没有找到citable id=“" + citableid + "”，请修改后再试！", -1, "#9966cc");
		return;
	}
	var citblkeyfld = citableObj.attr("citblkeyfld");
	if (!citblkeyfld) {
		showMessage("数据列表“" + citableid + "”缺少数据表键列名“citblkeyfld”属性设置，请修改后再试！");
		return;
	}
	var citblname = getTableName(citableObj);
	var citblwhecls = citblkeyfld + " IN (" + trid + ")";
	ciUpdateDataRow(citableid, citblname, "D", [], [], citblwhecls);
	ciGetDataRows(-1, citableid);
}
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
function cisolrso() {
	var searchstr = $("input[type='text']").val();
	if (searchstr == undefined || searchstr == null)
		searchstr = "";
	else {
		searchstr = searchstr.trim();
		searchstr = searchstr.replace(/'/g, "''");
		searchstr = searchstr.replace(/%/g, "%%");
	}
	
	$.ajax({
		url : "http://119.29.140.212:8282/search?q="+searchstr+"&"+"cipageindex="+0,
		type : "GET",
		cache : false,
		async : false,
		dataType : "jsonp",
		jsonp:"jsoncallback", 
		contentType : "application/html; charset=UTF-8",
		success : function(data) {
			ajaxGetDataSoso(data);
			
		},
		
	});
}


function ajaxGetDataSoso(data){
	if(data.cirows.length!=undefined){
		var cidatalist=$(".cisobody").find(".cidatalist");
		var cisotbl=cidatalist.find(".citablel");
		var reg = new RegExp("<(img*?)[^>]*>");
		cidatalist.find(".citablel").html("");
		for(var i=0;i<data.cirows.length;i++){
			var cirow=data.cirows[i];
			var highcode=cirow.highcode;
			var source=cirow.source;
			var viewpoint=cirow.viewpoint;
			var datarow=viewpoint;
			
			datarow=datarow.replace(reg,"");
			$(".citablel").append(datarow);
			$(".citablel").append("<hr>");
		}
	}else{
		showMessage("没有查到数据")
	}
	
	var cipager=$(".cisobody").find(".cipager");
	var result=data.result;
	if (result.cirowcount <= 0) {
			cipager.html('<span>没有发现数据。<span>');
	} else if (result.cipagecount == 1) {
			cipager.html('<span>共' + result.cirowcount + '项<span>');
	} else {
			cipager.html('<span>(' + (result.cipageindex+1) + "/" + result.cipagecount + ')页,共' 
					+ result.cirowcount + '项</span>' 
					+ '<input type="button" class="" onclick="gotoCisolrso(0)" value="首页"/>' 
					+ '<input type="button" class="" onclick="gotoCisolrso(' + (result.cipageindex-1)  + ')" value="上页"/>' 
					+ '<input type="button" class="" onclick="gotoCisolrso(' + (result.cipageindex+1)  + ')" value="下页"/>' 
					+ '<input type="button" class="" onclick="gotoCisolrso(' + result.cipagecount  + ')" value="末页"/>' 
					+ '<input type="text" value="" class="" />' 
					+ '<input type="button" onclick="gotoCisolrso(-1)" value="跳转">');
	}
}


function gotoCisolrso(cipageindex){
	var searchstr = $("input[type='text']").val();
	if (searchstr == undefined || searchstr == null)
		searchstr = "";
	else {
		searchstr = searchstr.trim();
		searchstr = searchstr.replace(/'/g, "''");
		searchstr = searchstr.replace(/%/g, "%%");
	}
	$.ajax({
		url : "http://119.29.140.212:8282/search?q="+searchstr+"&"+"cipageindex="+cipageindex,
		type : "GET",
		cache : false,
		async : false,
		dataType : "jsonp",
		jsonp:"jsoncallback", 
		contentType : "application/html; charset=UTF-8",
		success : function(data) {
			ajaxGetDataSoso(data);
			
		},
		
	});
	
}


//###########################################################################################
//<style>
//pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
//.string { color: green; }
//.number { color: darkorange; }
//.boolean { color: blue; }
//.null { color: magenta; }
//.key { color: red; }
//</style>*************************************************
//<pre id="result"></pre>
//&*******************************
//$('#result').html(syntaxHighlight(res));
//############################################################################################


function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}






















if (typeof JSON !== "object") {
	JSON = {};
}
(function() {
	"use strict";
	var rx_one = /^[\],:{}\s]*$/;
	var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
	var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	function f(n) {
		return n < 10 ? "0" + n : n;
	}
	function this_value() {
		return this.valueOf();
	}
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
		};
		Boolean.prototype.toJSON = this_value;
		Number.prototype.toJSON = this_value;
		String.prototype.toJSON = this_value;
	}
	var gap;
	var indent;
	var meta;
	var rep;
	function quote(string) {
		rx_escapable.lastIndex = 0;
		return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function(a) {
			var c = meta[a];
			return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
		}) + "\"" : "\"" + string + "\"";
	}
	function str(key, holder) {
		var i;
		var k;
		var v;
		var length;
		var mind = gap;
		var partial;
		var value = holder[key];
		if (value && typeof value === "object" && typeof value.toJSON === "function") {
			value = value.toJSON(key);
		}
		if (typeof rep === "function") {
			value = rep.call(holder, key, value);
		}
		switch (typeof value) {
		case "string":
			return quote(value);
		case "number":
			return isFinite(value) ? String(value) : "null";
		case "boolean":
		case "null":
			return String(value);
		case "object":
			if (!value) {
				return "null";
			}
			gap += indent;
			partial = [];
			if (Object.prototype.toString.apply(value) === "[object Array]") {
				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || "null";
				}
				v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
				gap = mind;
				return v;
			}
			if (rep && typeof rep === "object") {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					if (typeof rep[i] === "string") {
						k = rep[i];
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ": " : ":") + v);
						}
					}
				}
			} else {
				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ": " : ":") + v);
						}
					}
				}
			}
			v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
			gap = mind;
			return v;
		}
	}
	if (typeof JSON.stringify !== "function") {
		meta = {
			"\b" : "\\b",
			"\t" : "\\t",
			"\n" : "\\n",
			"\f" : "\\f",
			"\r" : "\\r",
			"\"" : "\\\"",
			"\\" : "\\\\"
		};
		JSON.stringify = function(value, replacer, space) {
			var i;
			gap = "";
			indent = "";
			if (typeof space === "number") {
				for (i = 0; i < space; i += 1) {
					indent += " ";
				}
			} else if (typeof space === "string") {
				indent = space;
			}
			rep = replacer;
			if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
				throw new Error("JSON.stringify");
			}
			return str("", {
				"" : value
			});
		};
	}
	if (typeof JSON.parse !== "function") {
		JSON.parse = function(text, reviver) {
			var j;
			function walk(holder, key) {
				var k;
				var v;
				var value = holder[key];
				if (value && typeof value === "object") {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}
			text = String(text);
			rx_dangerous.lastIndex = 0;
			if (rx_dangerous.test(text)) {
				text = text.replace(rx_dangerous, function(a) {
					return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
				});
			}
			if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) {
				j = eval("(" + text + ")");
				return (typeof reviver === "function") ? walk({
					"" : j
				}, "") : j;
			}
			throw new SyntaxError("JSON.parse");
		};
	}
}());;
(function($) {
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a256 = '', r64 = [ 256 ], r256 = [ 256 ], i = 0;
	var UTF8 = {
		encode : function(strUni) {
			var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function(c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
			}).replace(/[\u0800-\uffff]/g, function(c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
			});
			return strUtf;
		},
		decode : function(strUtf) {
			var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(c) {
				var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
				return String.fromCharCode(cc);
			}).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(c) {
				var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
				return String.fromCharCode(cc);
			});
			return strUni;
		}
	};
	while (i < 256) {
		var c = String.fromCharCode(i);
		a256 += c;
		r256[i] = i;
		r64[i] = b64.indexOf(c);
		++i;
	}
	function code(s, discard, alpha, beta, w1, w2) {
		s = String(s);
		var buffer = 0, i = 0, length = s.length, result = '', bitsInBuffer = 0;
		while (i < length) {
			var c = s.charCodeAt(i);
			c = c < 256 ? alpha[c] : -1;
			buffer = (buffer << w1) + c;
			bitsInBuffer += w1;
			while (bitsInBuffer >= w2) {
				bitsInBuffer -= w2;
				var tmp = buffer >> bitsInBuffer;
				result += beta.charAt(tmp);
				buffer ^= tmp << bitsInBuffer;
			}
			++i;
		}
		if (!discard && bitsInBuffer > 0)
			result += beta.charAt(buffer << (w2 - bitsInBuffer));
		return result;
	}
	var Plugin = $.base64 = function(dir, input, encode) {
		return input ? Plugin[dir](input, encode) : dir ? null : this;
	};
	Plugin.btoa = Plugin.encode = function(plain, utf8encode) {
		plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
		plain = code(plain, false, r256, b64, 8, 6);
		return plain + '===='.slice((plain.length % 4) || 4);
	};
	Plugin.atob = Plugin.decode = function(coded, utf8decode) {
		coded = String(coded).split('=');
		var i = coded.length;
		do {
			--i;
			coded[i] = code(coded[i], true, r64, a256, 6, 8);
		} while (i > 0);
		coded = coded.join('');
		return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded;
	};
}(jQuery));
(function() {
	var CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
	Math.uuid = function(len, radix) {
		var chars = CHARS, uuid = [], i;
		radix = radix || chars.length;
		if (len) {
			for (i = 0; i < len; i++)
				uuid[i] = chars[0 | Math.random() * radix];
		} else {
			var r;
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
			uuid[14] = "4";
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join("");
	};
	Math.uuidFast = function() {
		var chars = CHARS, uuid = new Array(36), rnd = 0, r;
		for ( var i = 0; i < 36; i++) {
			if (i == 8 || i == 13 || i == 18 || i == 23) {
				uuid[i] = "-";
			} else if (i == 14) {
				uuid[i] = "4";
			} else {
				if (rnd <= 0x02)
					rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
				r = rnd & 0xf;
				rnd = rnd >> 4;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
		return uuid.join("");
	};
	Math.uuidCompact = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};
})();
function DragParent(objId) {
	var obj = null;
	if (typeof (objId) == "string") {
		obj = document.getElementById(objId);
	} else {
		obj = objId;
	}
	if (obj == null)
		return;
	var objparent = obj.parentNode;
	if (obj.onmousedown == null) {
		obj.onmouseover = null;
		obj.style.cursor = "pointer";
		obj.onmousedown = function(a) {
			if (!a)
				a = window.event;
			if (a.button == 1) {
				if (obj.setCapture)
					obj.setCapture();
				objparent.ci_drag_zIndex = objparent.style.zIndex;
				objparent.style.zIndex = 10000;
				obj.ci_drag_clientX = a.clientX;
				obj.ci_drag_clientY = a.clientY;
				obj.ci_drag_parentX = parseInt(objparent.style.left);
				obj.ci_drag_parentY = parseInt(objparent.style.top);
				obj.ci_drag_moveable = true;
			}
		}
		obj.onmousemove = function(a) {
			if (!a)
				a = window.event;
			if (obj.ci_drag_moveable) {
				var toLeft = obj.ci_drag_parentX + a.clientX - obj.ci_drag_clientX;
				var toTop = obj.ci_drag_parentY + a.clientY - obj.ci_drag_clientY;
				if (toLeft < 0)
					toLeft = 0;
				if (toTop < 0)
					toTop = 0;
				obj.parentNode.style.left = toLeft;
				obj.parentNode.style.top = toTop;
			}
		}
		obj.onmouseup = function(a) {
			if (!a)
				a = window.event;
			if (obj.ci_drag_moveable) {
				obj.releaseCapture();
				obj.ci_drag_moveable = false;
				obj.parentNode.style.zIndex = obj.parentNode.ci_drag_zIndex;
			}
		}
		obj.onmouseout = function(a) {
		}
	}
}
function DivDragScrool(o, s) {
	if (typeof o == "string")
		o = document.getElementById(o);
	o.orig_x = parseInt(o.style.left) - document.body.scrollLeft;
	o.orig_y = parseInt(o.style.top) - document.body.scrollTop;
	o.orig_index = o.style.zIndex;
	o.onmousedown = function(a) {
		this.style.cursor = "move";
		this.style.zIndex = 10000;
		var d = document;
		if (!a)
			a = window.event;
		var x = a.clientX + d.body.scrollLeft - o.offsetLeft;
		var y = a.clientY + d.body.scrollTop - o.offsetTop;
		d.ondragstart = "return false;"
		d.onselectstart = "return false;"
		d.onselect = "document.selection.empty();"
		if (o.setCapture)
			o.setCapture();
		else if (window.captureEvents)
			window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
		d.onmousemove = function(a) {
			if (!a)
				a = window.event;
			o.style.left = a.clientX + document.body.scrollLeft - x;
			o.style.top = a.clientY + document.body.scrollTop - y;
			o.orig_x = parseInt(o.style.left) - document.body.scrollLeft;
			o.orig_y = parseInt(o.style.top) - document.body.scrollTop;
		}
		d.onmouseup = function() {
			if (o.releaseCapture)
				o.releaseCapture();
			else if (window.captureEvents)
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			d.onmousemove = null;
			d.onmouseup = null;
			d.ondragstart = null;
			d.onselectstart = null;
			d.onselect = null;
			o.style.cursor = "normal";
			o.style.zIndex = o.orig_index;
		}
	}
	if (s) {
		var orig_scroll = window.onscroll ? window.onscroll : function() {
		};
		window.onscroll = function() {
			orig_scroll();
			o.style.left = o.orig_x + document.body.scrollLeft;
			o.style.top = o.orig_y + document.body.scrollTop;
		}
	}
}
function DivDrag(o) {
	if (typeof o == "string")
		o = document.getElementById(o);
	var o = o.parentNode;
	o.orig_x = parseInt(o.style.left) - document.body.scrollLeft;
	o.orig_y = parseInt(o.style.top) - document.body.scrollTop;
	o.orig_index = o.style.zIndex;
	o.onmousedown = function(a) {
		this.style.cursor = "move";
		this.style.zIndex = 10000;
		var d = document;
		if (!a)
			a = window.event;
		var x = a.clientX + d.body.scrollLeft - o.offsetLeft;
		var y = a.clientY + d.body.scrollTop - o.offsetTop;
		d.ondragstart = "return false;"
		d.onselectstart = "return false;"
		d.onselect = "document.selection.empty();"
		if (o.setCapture)
			o.setCapture();
		else if (window.captureEvents)
			window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
		d.onmousemove = function(a) {
			if (!a)
				a = window.event;
			o.style.left = a.clientX + document.body.scrollLeft - x;
			o.style.top = a.clientY + document.body.scrollTop - y;
			o.orig_x = parseInt(o.style.left) - document.body.scrollLeft;
			o.orig_y = parseInt(o.style.top) - document.body.scrollTop;
		}
		d.onmouseup = function() {
			if (o.releaseCapture)
				o.releaseCapture();
			else if (window.captureEvents)
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			d.onmousemove = null;
			d.onmouseup = null;
			d.ondragstart = null;
			d.onselectstart = null;
			d.onselect = null;
			o.style.cursor = "normal";
			o.style.zIndex = o.orig_index;
		}
	}
}
function ShowDivDrag(divId) {
	var divDrag = document.getElementById(divId);
	divDrag.style.display = "block";
	divDrag.style.top = (document.body.clientHeight - parseInt(divDrag.style.height)) / 2;
	divDrag.style.left = (document.body.clientWidth - parseInt(divDrag.style.width)) / 2;
	divDrag.style.position = "absolute";
}
function HideDivDrag(divId) {
	var divDrag = document.getElementById(divId);
	divDrag.style.display = "none";
}