/****************************************************************
 * 全局变量
 * 包括基本的管理者信息、用户参加的队列信息
 * by Woodie .at 2014.8.17
 ****************************************************************/
var manager_name = "";
var manager_id   = "m20140813160411_7214";
var manager_info = "";
var item_one2two    = "";
var item_three2four = "";
var item_upfive     = "";  
var current_time    = "";
var queue_page      = "1";
//var barcode_info = "2014813160323_北京饭店_23452";
var tmp_parti_item_id   = "";
var tmp_parti_item_name = "";

/*****************************************
 * HTTP请求相关函数集合
 * by Woodie .at 2014.8.17
 *****************************************/
// 登录信息验证
// ---更新manager_id
function Login()
{
	// 登录状态
	var status=1;
	var message;
    manager_name = $("input#manager_name:text").val();
	password     = $("input#password:password").val(); 
	// 向后台发送post请求
	var para = 
	{
		"manager_name" : manager_name,
		"password"     : password
	};
	var r_url = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanagerlogin/login";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,// 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){ // 响应函数
			var result = new Array();  
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status  = result['status'];
			message = result['message'];
			// 调试信息
			//alert(message);
			// 更新manager id
			if(status == 0)
				manager_id = message;
		},
		datatype : 'json'
	});
	return status;
}

// 根据ID获取manager的信息
// ---更新manager_info
function GetManagerInfo()
{
	var status = 1;
	var para = 
	{
		"manager_id" : manager_id
	};
	var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanageroper/getmanagerinfo";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){    // 响应函数
			var result = new Array();  
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status       = result['status'];
			// 更新manager_info
			manager_info = result['manager_info'];
			// 调试信息
			//alert(manager_info['barcode_info']);
		},
		datatype : 'json'
	});
	return status;
}
 
// 检查服务器端管理者账号信息
// ---更新manager_info['barcode_info']
function UpdateBarcodeInfo()
{
	var status = 1;
	var para = 
	{
		"manager_id"    : manager_id,
		"manager_name"  : manager_name
	};
	var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanageroper/updatebarcodeinfo";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){    // 响应函数
			var result = new Array();  
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status = result['status'];
			manager_info['barcode_info'] = result['barcode_info'];
			alert(manager_info['barcode_info']);
		},
		datatype : 'json'
	});
	return status;
}

// 获取推送消息
// 更新队列信息变量
function PostQueueInfo()
{
	var status = 1;
	var para = 
	{
		"manager_id"    : manager_id
	};
	var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanageroper/postiteminfo";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){    // 响应函数
			var result = new Array();  
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status = result["status"];
			current_time = result["timestamps"];
			item_one2two = result["obj_item_one2two"];
			item_three2four = result["obj_item_three2four"];
			item_upfive  = result["obj_item_upfive"];
			//alert(current_time);
		},
		datatype : 'json'
	});
	return status;
} 

// 队列项操作
// 修改队列项状态属性
function ChangeItemStatus(item_id,state)
{
	var status = 1;
	var para = 
	{
		"item_id" : item_id,
		"status"  : state
	};
	var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanageroper/changeitemstatus";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){    // 响应函数
			var result = new Array();  
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status = result["status"];
			msg    = result["message"];
			alert(msg);
		},
		datatype : 'json'
	});
	return status;
}


// --- 发送POST请求，查询当前所处队列位置信息
function Register(manager_name,password,introduction)
{
	var status = 1;
	var para = 
	{
		"manager_name"  : manager_name,
		"password"      : password,
		"introduction"  : introduction
	};
	var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanagerlogin/register";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){ // 响应函数
			// PHP中json_encode函数return的结果是string的形式,所以前端还需要通过eval()函数来以JS代码形式执行这段string
			var result = new Array();  
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status  = result['status'];
			msg     = result['message'];
			alert(msg);
		},
		datatype : 'json'
	});
	return status;
}

// 查看该队列项的用户信息
function LookUserInfo(item_id)
{
	var status = 1;
	var para = 
	{
		"item_id" : item_id
	};
	var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanageroper/lookuserinfo";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){    // 响应函数
			var result = new Array();  
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status    = result["status"];
			user_info = result["user_info"];
			alert("用户名: " + user_info["user_name"] + "\n" + 
				  "手机号: " + user_info["phone"]);
		},
		datatype : 'json'
	});
	return status;
}

// --- 发送POST请求，确认加入队列进行排队
function Participate(user_id,manager_id,item_type)
{
	var status = 1;
	var para = 
	{
		"user_id"    : user_id,
		"manager_id" : manager_id,
		"item_type"  : item_type
	};
	var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cuserparti/participate";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){ // 响应函数
			var result = new Array();  
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status  = result['status'];
			tmp_parti_item_id = result['item_id'];
		},
		datatype : 'json'
	});
	return status;
}

// --- 发送POST请求，用于注册新的临时用户
function RegisterForTmpUser()
{
	var status = 1;
	var para = 
	{
		"user_name"  : "random",
		"password"   : "random",
		"phone"      : ""
	};
	var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cuserlogin/registerformanual";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){ // 响应函数
			// PHP中json_encode函数return的结果是string的形式,所以前端还需要通过eval()函数来以JS代码形式执行这段string
			var result = new Array();  
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status  = result['status'];
			user_id = result['message'];
		},
		datatype : 'json'
	});
	return user_id;
}

// 根据item_id获取item名称（即排号）
function GetItemNameViaID(item_id)
{
	var status = 1;
	var para = 
	{
		"item_id" : item_id
	};
	var r_url = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanageroper/getitemnameviaid";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){ // 响应函数
			var result = new Array();
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status   = result['status'];
			tmp_parti_item_name = result['item_info'];
		},
		datatype : 'json'
	});
	return status;
}

// 根据item_id向对应用户推送提醒消息
function Notification(item_id,no_type)
{
	var status = 1;
	var para = 
	{
		"item_id" : item_id,
		"no_type" : no_type
	};
	var r_url = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanageroper/notification";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){ // 响应函数
			var result = new Array();
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status   = result['status'];
		},
		datatype : 'json'
	});
	return status;
}

// 修改餐厅餐桌数量信息
function ModifyTableCount(table_type,table_count)
{
	var status = 1;
	var para = 
	{
		"manager_id"  : manager_id,
		"table_type"  : table_type,
		"table_count" : table_count
	};
	var r_url = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanageroper/modifytablecount";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){ // 响应函数
			var result = new Array();
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status   = result['status'];
		},
		datatype : 'json'
	});
	return status;
}

// 重新生成新的二维码同时，抛弃之前所有排队数据
function DropOldData()
{
	var status = 1;
	var para = 
	{
		"manager_id"  : manager_id
	};
	var r_url = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cmanageroper/dropolddata";
	$.ajax({
		type: "POST",              // 发送请求类型为POST
		url : r_url,			   // 请求URL
		data: para,                // 请求参数
		async: false,              // 同步请求
		success: function(res){ // 响应函数
			var result = new Array();
			result = eval('(' + res + ')');
			// 获取请求状态和详细返回数据
			status   = result['status'];
		},
		datatype : 'json'
	});
	return status;
}

/*****************************************
 * 功能类函数集合
 * by Woodie .at 2014.8.17
 *****************************************/
// 根据字符串信息生成二维码图案
function GenerateBarcode(barcode_info)
{
	// 生成QR二维码
	sina.barcodeScanner.encode("TEXT_TYPE",barcode_info,function(success) {
		alert("二维码生成成功");
	}, function(fail) {
		alert("二维码生成失败");
	});
}

// 对排队队列进行排序
function SortQueue()
{
	for(var i=0;i<item_one2two["num"];i++)
	{
		for(var j=0;j<item_one2two["num"]-1;j++)
		{
			if(item_one2two[j]["parti_time"]<item_one2two[j+1]["parti_time"])
			{
				var tmp;
				tmp = item_one2two[j];
				item_one2two[j]  = item_one2two[j+1];
				item_one2two[j+1] = tmp;
			}
		}
	}
	
	for(var i=0;i<item_three2four["num"];i++)
	{
		for(var j=0;j<item_three2four["num"]-1;j++)
		{
			if(item_three2four[j]["parti_time"]<item_three2four[j+1]["parti_time"])
			{
				var tmp;
				tmp = item_three2four[j];
				item_three2four[j]   = item_three2four[j+1];
				item_three2four[j+1] = tmp;
			}
		}
	}
	
	for(var i=0;i<item_upfive["num"];i++)
	{
		for(var j=0;j<item_upfive["num"]-1;j++)
		{
			if(item_upfive[j]["parti_time"]<item_upfive[j+1]["parti_time"])
			{
				var tmp;
				tmp = item_upfive[j];
				item_upfive[j]   = item_upfive[j+1];
				item_upfive[j+1] = tmp;
			}
		}
	}
}

// 更新队列信息显示页面
function UpdateQueuePage(type)
{
	//var option_str = "<div data-role='navbar'><ul><li><a href='#' data-icon='check' data-theme='e' onclick='msg_operate(" +  + "," +  + ");'>应约</a></li><li><a href='#' data-icon='forward' data-theme='e' onclick='msg_operate(" +  + "," +  + ");'>过号</a></li><li><a href='#' data-icon='alert' data-theme='e' onclick='msg_operate(" +  + "," +  + ");'>叫号</a></li><li><a href='#' data-icon='search' data-theme='b' onclick='msg_operate(" +  + "," +  + ");'>查看</a></li></ul></div>";
	var item_str   = "<div data-role='collapsible' data-collapsed-icon='arrow-d' data-expanded-icon='arrow-u'>";
	var str        = "";
	SortQueue();
	var i = 0;
	switch(type)
	{
		case "1" : 
			if( item_one2two == "null" )
			{
				str = "<br><br><br><br><br><center><span>当前席位没有等待顾客！</span></center><br><br><br><br><br>";
				break;
			}
			for(i = item_one2two["num"] - 1; i >= 0 ; i --)
			{
				var status = "";
				switch(item_one2two[i]["item_status"])
				{
					case "0" : status = "等待"; break;
					case "1" : status = "取消"; break;
					case "2" : status = "过号"; break;
					case "3" : status = "应约"; break;
				}
				tmp = item_str + 
				      "<h3>" + 
					  status + 
					  "&nbsp;&nbsp;&nbsp;" +
					  item_one2two[i]["item_name"] + 
					  "&nbsp;&nbsp;&nbsp;" + 
					  item_one2two[i]["parti_time"]+
					  "</h3>" + 
					  "<div data-role='navbar'><ul><li><a href='#' data-icon='check' data-theme='e' onclick='msg_operate(\"" + item_one2two[i]["item_id"] + "\"," + "3" + ");'>应约</a></li><li><a href='#' data-icon='forward' data-theme='e' onclick='msg_operate(\"" + item_one2two[i]["item_id"] + "\"," + "2" + ");'>过号</a></li><li><a href='#' data-icon='alert' data-theme='e' onclick='msg_operate(\"" + item_one2two[i]["item_id"] + "\"," + "1" + ");'>叫号</a></li><li><a href='#' data-icon='search' data-theme='b' onclick='msg_operate(\"" + item_one2two[i]["item_id"] + "\"," + "0" + ");'>查看</a></li></ul></div>" + 
					  "</div>";
				str += tmp;
			}
			str = "<div data-role='collapsible-set'>" + str + "</div>";
			break;
		case "2" : 
			if( item_three2four == "null" )
			{
				str = "<br><br><br><br><br><center><span>当前席位没有等待顾客！</span></center><br><br><br><br><br>";
				break;
			}
			for(i = item_three2four["num"] - 1 ; i >= 0 ; i --)
			{
				var status = "";
				switch(item_three2four[i]["item_status"])
				{
					case "0" : status = "等待"; break;
					case "1" : status = "取消"; break;
					case "2" : status = "过号"; break;
					case "3" : status = "应约"; break;
				}
				tmp = item_str + 
				      "<h3>" + 
					  status + 
					  "&nbsp;&nbsp;&nbsp;" +
					  item_three2four[i]["item_name"] + 
					  "&nbsp;&nbsp;&nbsp;" + 
					  item_three2four[i]["parti_time"]+
					  "</h3>" + 
					  "<div data-role='navbar'><ul><li><a href='#' data-icon='check' data-theme='e' onclick='msg_operate(\"" + item_three2four[i]["item_id"] + "\"," + "3" + ");'>应约</a></li><li><a href='#' data-icon='forward' data-theme='e' onclick='msg_operate(\"" + item_three2four[i]["item_id"] + "\"," + "2" + ");'>过号</a></li><li><a href='#' data-icon='alert' data-theme='e' onclick='msg_operate(\"" + item_three2four[i]["item_id"] + "\"," + "1" + ");'>叫号</a></li><li><a href='#' data-icon='search' data-theme='b' onclick='msg_operate(\"" + item_three2four[i]["item_id"] + "\"," + "0" + ");'>查看</a></li></ul></div>" + 
					  "</div>";
				str += tmp;
			}
			str = "<div data-role='collapsible-set'>" + str + "</div>";
			break;
		case "3" :
			if( item_upfive == "null" )
			{
				str = "<br><br><br><br><br><center><span>当前席位没有等待顾客！</span></center><br><br><br><br><br>";
				break;
			}
			for(i = item_upfive["num"] - 1 ; i >= 0 ; i --)
			{
				var status = "";
				switch(item_upfive[i]["item_status"])
				{
					case "0" : status = "等待"; break;
					case "1" : status = "取消"; break;
					case "2" : status = "过号"; break;
					case "3" : status = "应约"; break;
				}
				tmp = item_str + 
				      "<h3>" + 
					  status + 
					  "&nbsp;&nbsp;&nbsp;" +
					  item_upfive[i]["item_name"] + 
					  "&nbsp;&nbsp;&nbsp;" + 
					  item_upfive[i]["parti_time"]+
					  "</h3>" + 
					  "<div data-role='navbar'><ul><li><a href='#' data-icon='check' data-theme='e' onclick='msg_operate(\"" + item_upfive[i]["item_id"] + "\"," + "3" + ");'>应约</a></li><li><a href='#' data-icon='forward' data-theme='e' onclick='msg_operate(\"" + item_upfive[i]["item_id"] + "\"," + "2" + ");'>过号</a></li><li><a href='#' data-icon='alert' data-theme='e' onclick='msg_operate(\"" + item_upfive[i]["item_id"] + "\"," + "1" + ");'>叫号</a></li><li><a href='#' data-icon='search' data-theme='b' onclick='msg_operate(\"" + item_upfive[i]["item_id"] + "\"," + "0" + ");'>查看</a></li></ul></div>" + 
					  "</div>";
				str += tmp;
			}
			str = "<div data-role='collapsible-set'>" + str + "</div>";
			break;
	};
	
	document.getElementById("msg_content").innerHTML = str;
	$("div#msg_content").trigger("create");
}

// 更新设置页面信息
function UpdateSettingPage()
{
	document.getElementById("l_count_one2two").innerHTML = manager_info["left_one2two"];
	document.getElementById("l_count_three2four").innerHTML = manager_info["left_three2four"];
	document.getElementById("l_count_upfive").innerHTML = manager_info["left_upfive"];
}

// 返回键响应事件
function onBackKeyDown()
{
	alert("onBackKeyDown!");
	// 退出应用程序
	navigator.app.exitApp();
}


// 定时事件，用于刷新数据
function TimeCount()
{
	// 更新所有队列信息
	PostQueueInfo();
	// 当前处于哪个界面就更新哪个
	UpdateQueuePage(queue_page);
	// 调试信息
	//alert("Update!");
	
	t=setTimeout("TimeCount()",8000);
}
/*****************************************
 * 响应事件集合
 * by Woodie .at 2014.8.17
 *****************************************/
// 显示当前二维码信息 
$('#barcode_current').click(function(){
	// 如果当前二维码信息为空，则先生成新的二维码字符串信息
	if(manager_info["barcode_info"] == "null")
	{
		UpdateBarcodeInfo();
	}
	GenerateBarcode(manager_info["barcode_info"]);
});

// 生成新的二维码信息
$("#barcode_new").click(function(){
	// 抛弃之前排队数据
	DropOldData();
	// 生成新的二维码信息
	UpdateBarcodeInfo();
	GenerateBarcode(manager_info["barcode_info"]);
});

// 登录响应事件
$('#home_login').click(function(){
	
	//sina.alarm.start(Date.now(), 10000, "/js/manager_main.js", "Timeout", false);
	if(Login() == 0)
	{
		// 为返回键添加响应事件
		document.addEventListener("backbutton", onBackKeyDown, false); 
		// 获取餐厅信息
		GetManagerInfo();
		// 跳转到管理界面
		$.mobile.changePage( "#manager", { transition: "slide"} );
		PostQueueInfo();
		UpdateQueuePage("1");
		UpdateSettingPage();
		// 开启推送事件
		TimeCount();
		
	}
	
}); 

// 注册响应事件
$('#reg_register_b').click(function(){
	r_manager_name = $("input#r_manager_name:text").val();
	r_password     = $("input#r_password:password").val(); 
	r_introduction = $("input#r_introduction:text").val();
	if(Register(r_manager_name,r_password,r_introduction) == 0)
	{
		//alert("注册成功！\n成功信息:" + user_id);
		// 跳转到登录界面
		$.mobile.changePage("#home", { transition: "slide"});
	}
	else
	{
		//alert("注册失败！\n错误信息：" + user_id);
	}
});

// 管理界面不同队列TAB键响应事件
$('#msg_one2two').click(function(){
	queue_page = "1";
	UpdateQueuePage("1");
}); 
$('#msg_three2four').click(function(){
	queue_page = "2";
	UpdateQueuePage("2");
}); 
$('#msg_upfive').click(function(){
	queue_page = "3";
	UpdateQueuePage("3");
}); 

// 人工排队确认按键响应事件
$('#man_affirm').click(function(){
	var type = $("select#man_type").val();
	var tmp_user_id = RegisterForTmpUser();
	if(Participate(tmp_user_id,manager_id,type) == 0)
	{
		GetItemNameViaID(tmp_parti_item_id);
		alert("您的排队号为:\n"+tmp_parti_item_name);
		tmp_parti_item_id   = "";
		tmp_parti_item_name = "";
	}
	else
	{
		alert("排队失败！\n请重试");
	}
}); 

// 队列项操作按键响应事件
var msg_operate = function(item_id,operate)
{
	switch(operate)
	{
		// 查看用户信息
		case 0:
			LookUserInfo(item_id);
			break;
	    // 给用户推送叫号通知
		case 1:
			if(Notification(item_id,"1") == 0)
			{
				alert("成功发送提醒通知!");
			}
			// 当前处于哪个界面就更新哪个
			//UpdateQueuePage(queue_page);
			break;
		// 修改队列项状态为：过号
		case 2:
			if(Notification(item_id,2) == 0)
			{
				alert("成功发送过号通知!");
			}
			//ChangeItemStatus(item_id,"2");
			// 更新所有队列信息
			PostQueueInfo();
			// 当前处于哪个界面就更新哪个
			UpdateQueuePage(queue_page);
			break;
		// 修改队列项状态为：应约
		case 3:
			ChangeItemStatus(item_id,3);
			// 更新所有队列信息
			PostQueueInfo();
			// 当前处于哪个界面就更新哪个
			UpdateQueuePage(queue_page);
			break;
	}
}

// 修改餐桌总数按键响应事件
$('#commit_total_count').click(function(){
	// 从输入框提取信息
	var count_one2two = $("input#t_count_one2two").val();
	var count_three2four = $("input#t_count_three2four").val();
	var count_upfive = $("input#t_count_upfive").val();
	// 发送修改请求
	if(ModifyTableCount("total_one2two",count_one2two) == 0 &&
	   ModifyTableCount("total_three2four",count_three2four) == 0 &&
	   ModifyTableCount("total_upfive",count_upfive) == 0)
	{
		alert("餐桌数量修改成功！");
		// 全部设置为空桌
		ModifyTableCount("left_one2two",count_one2two);
		ModifyTableCount("left_three2four",count_three2four);
		ModifyTableCount("left_upfive",count_upfive);
		// 更新设置页面信息
		GetManagerInfo();
		UpdateSettingPage();
	}
	else
	{
		alert("餐桌数量修改失败！\n请重试");
	}
}); 


/**********************************************************************************************************/
// 修改剩余餐桌数按键响应事件
$('#one2two_plus1').click(function(){
	// 从本地manager_info中提取信息
	table_count = parseInt(manager_info["left_one2two"]);
	// 发送修改请求
	if(table_count < parseInt(manager_info["total_one2two"]))
	{
		ModifyTableCount("left_one2two",table_count+1);
		// 更新设置页面信息
		GetManagerInfo();
		UpdateSettingPage();
	}
}); 

// 修改剩余餐桌数按键响应事件
$('#one2two_minus1').click(function(){
	// 从本地manager_info中提取信息
	table_count = parseInt(manager_info["left_one2two"]);
	// 发送修改请求
	if(table_count > 0)
	{
		ModifyTableCount("left_one2two",table_count-1);
		// 更新设置页面信息
		GetManagerInfo();
		UpdateSettingPage();
	}
}); 

// 修改剩余餐桌数按键响应事件
$('#three2four_plus1').click(function(){
	// 从本地manager_info中提取信息
	table_count = parseInt(manager_info["left_three2four"]);
	// 发送修改请求
	if(table_count < parseInt(manager_info["total_three2four"]))
	{
		ModifyTableCount("left_three2four",table_count+1);
		// 更新设置页面信息
		GetManagerInfo();
		UpdateSettingPage();
	}
}); 

// 修改剩余餐桌数按键响应事件
$('#three2four_minus1').click(function(){
	// 从本地manager_info中提取信息
	table_count = parseInt(manager_info["left_three2four"]);
	// 发送修改请求
	if(table_count > 0)
	{
		ModifyTableCount("left_three2four",table_count-1);
		// 更新设置页面信息
		GetManagerInfo();
		UpdateSettingPage();
	}
}); 

// 修改剩余餐桌数按键响应事件
$('#upfive_plus1').click(function(){
	// 从本地manager_info中提取信息
	table_count = parseInt(manager_info["left_upfive"]);
	// 发送修改请求
	if(table_count < parseInt(manager_info["total_upfive"]))
	{
		ModifyTableCount("left_upfive",table_count+1);
		// 更新设置页面信息
		GetManagerInfo();
		UpdateSettingPage();
	}
}); 

// 修改剩余餐桌数按键响应事件
$('#upfive_minus1').click(function(){
	// 从本地manager_info中提取信息
	table_count = parseInt(manager_info["left_upfive"]);
	// 发送修改请求
	if(table_count > 0)
	{
		ModifyTableCount("left_upfive",table_count-1);
		// 更新设置页面信息
		GetManagerInfo();
		UpdateSettingPage();
	}
}); 