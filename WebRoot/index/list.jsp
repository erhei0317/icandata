<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>CN_USR_</title>
<script src="../json/jquery-1.11.3.js"></script>
<link href="../json/v13/jsonsvr13.css" rel="stylesheet"  />
<script src="../json/v13/jsonsvr13.js" ></script>
</head>
<body>
	<div data-cinote="数据列表" class="cidatalist">
		<div data-cinote="标题栏" class="cititle">CN_USR_开发</div>
		<div data-cinote="工具栏" class="citoolbar">
			<input type="button" class="cibtnnew" value="新增" data-citableid="citableuser" data-cieditorid="cieditoruser" /> 
			<input type="button" class="cibtndelete" value="删除" data-citableid="citableuser"	data-cidelbycbname="checkone" />
			<input type="search" class="citextsearch" value="" placeholder="请输入查询内容..." data-cisearchel="((NAME LIKE '%#CIEL#%')OR(CONVERT(AGE,char(20)) LIKE '%#CIEL#%')OR(CONVERT(BIRTHDAY,char(20)) LIKE '%#CIEL#%')OR(CONVERT(SALARY,char(40)) LIKE '%#CIEL#%'))"/> 
			<input type="button" class="cibtnprint" value="打印" />
			<input type="button" class="cibtnrefresh" value="刷新" data-cirefreshid="citableuser" /> 
		</div>
		<table data-cinote="数据绑定表格" id="citableuser" class="citable" citblfrmcls="cn_user" citblkeyfld="TRID">
			<thead>
				<tr>
					<th><input type="checkbox" data-cicheckbyname="checkone" /></th>
					<th>姓名</th>
					<th>年龄</th>
					<th>生日</th>
					<th>工资</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody data-cinote="迭代区" class="citbody">
				<tr data-citrid="#TRID#">
					<td><input type="checkbox" name="checkone" /></td>
					<td><a class="cihrefedit">#NAME#</a></td>
					<td>#AGE#</td>
					<td>#BIRTHDAY#</td>
					<td>#SALARY#</td>
					<td><a class="cihrefedit">编辑</a><a class="cihrefdele">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
		<div data-cinote="分页栏" class="cipager"></div>
	</div>

	<div data-cinote="数据表单" class="cidatalist">
		<div data-cinote="数据表单" class="cieditor" id="cieditoruser" citblfrmcls="cn_user" citblkeyfld="TRID" citblwhecls="TRID<0" citblpagesize="1">
			<div data-cinote="标题栏" class="cititle">Fusion Ajax开发框架数据表单(示例)</div>
			<div data-cinote="工具栏" class="citoolbar">
				<input type="button" class="cibtncancel" value="返回" /> 
				<input type="button" class="cibtnsave" value="保存" />
			</div>
			<table style="border: none; border-collapse: collapse;" cellpadding="8px">
				<tr>
					<td class="fldtitle">NAME</td>
					<td><input class="cifield" cidefval="[姓名]" cifldname="NAME" value="#NAME#" />
					</td>
				</tr>
				<tr>
					<td class="fldtitle">AGE</td>
					<td><input class="cifield" cidefval="28" cifldname="AGE" value="#AGE#" />
					</td>
				</tr>
				<tr>
					<td class="fldtitle">BIRTHDAY</td>
					<td><input class="cifield" cidefval="1980-1-1" cifldname="BIRTHDAY" value="#BIRTHDAY#" />
					</td>
				</tr>
				<tr>
					<td class="fldtitle">SALARY</td>
					<td><input class="cifield" cidefval="50000" cifldname="SALARY" value="#SALARY#" />
					</td>
				</tr>
			</table>
			<div data-cinote="工具栏" class="citoolbar">
				<input type="button" class="cibtnsave" value="保存" />
				<input type="button" class="cibtncancel" value="返回" />
			</div>
		</div>
	</div>
</body>
</html>
