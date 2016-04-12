/****************************************************************
	 * 全局变量
	 * 包括基本的用户信息、用户参加的队列信息、以及队列所属管理者信息
	 * by Woodie .at 2014.8.14
	 ****************************************************************/
	var user_name = "";     // 用户名
	var password  = "";     // 用户密码
	var user_id   = "";     // 用户ID，后面的大多数请求操作都需要用户ID
	var obj_item;           // 此为对象，以JSON格式存储数据，主要包含了用户参与的队列项信息
	var obj_manager;        // 此为对象，以JSON格式存储数据，主要包含了用户参与的队列所属管理者
	var barcode   = "";     // 当前排队餐厅的二维码信息
	//var c_seq;         // 当前队列前面的排号数
	var item_id   = "";
	var no_num    = "0";
	var no_first  = true;
	
	// --- 发送POST请求，从服务器获取当前用户参与队列项信息
	//     若未参加任何队列，则返回1；参加了任何队列，则返回0，并更新obj_item
	function GetItemInfo()
	{
		var status = 1;
		var para = 
		{
			"user_id" : user_id
		};
		var r_url = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cuserparti/getiteminfo";
		$.ajax({
			type: "POST",              // 发送请求类型为POST
			url : r_url,			   // 请求URL
			data: para,                // 请求参数
			async: false,              // 同步请求
			success: function(res){ // 响应函数
				// PHP中json_encode函数return的结果是string的形式,所以前端还需要通过eval()函数来以JS代码形式执行这段string
				var result = new Array();  
				// 对于对象声明语句来说，仅仅是执行，并不能返回值。
				// 为了返回常用的“{}”这样的对象声明语句，必须用括号括住，以将其转换为表达式，才能返回其 值。
				// 这也是使用JSON来进行Ajax开发的基本原理之一。
				result = eval('(' + res + ')');
				// 获取请求状态和详细返回数据
				status   = result['status'];
				obj_item = result['item_info'];
			},
			datatype : 'json'
		});
		return status;
	}
	
	// --- 发送POST请求，以二维码信息作为关键字从服务器获取当前用户参与队列的所属管理者信息
	//     如果成功获取则返回0，并更新obj_manager;否则返回1
	function GetManagerInfoViaBC(barcode_info)
	{
		var status = 1;
		var para = 
		{
			"barcode_info" : barcode_info
		};
		var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cuserparti/getmanagerinfo/0";
		$.ajax({
			type: "POST",              // 发送请求类型为POST
			url : r_url,			   // 请求URL
			data: para,                // 请求参数
			async: false,              // 同步请求
			success: function(res){ // 响应函数
				// PHP中json_encode函数return的结果是string的形式,所以前端还需要通过eval()函数来以JS代码形式执行这段string
				var result = new Array();  
				// 对于对象声明语句来说，仅仅是执行，并不能返回值。
				// 为了返回常用的“{}”这样的对象声明语句，必须用括号括住，以将其转换为表达式，才能返回其 值。
				// 这也是使用JSON来进行Ajax开发的基本原理之一。
				result = eval('(' + res + ')');
				// 获取请求状态和详细返回数据
				status      = result['status'];
				obj_manager = result['manager_info'];
			},
			datatype : 'json'
		});
		return status;
	}
	
	// --- 发送POST请求，以管理者ID作为关键字从服务器获取当前用户参与队列的所属管理者信息
	//     如果成功获取则返回0，并更新obj_manager;否则返回1
	function GetManagerInfoViaID(manager_id)
	{
		var status = 1;
		var para = 
		{
			"manager_id" : manager_id
		};
		var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cuserparti/getmanagerinfo/1";
		$.ajax({
			type: "POST",              // 发送请求类型为POST
			url : r_url,			   // 请求URL
			data: para,                // 请求参数
			async: false,              // 同步请求
			success: function(res){ // 响应函数
				// PHP中json_encode函数return的结果是string的形式,所以前端还需要通过eval()函数来以JS代码形式执行这段string
				var result = new Array();  
				// 对于对象声明语句来说，仅仅是执行，并不能返回值。
				// 为了返回常用的“{}”这样的对象声明语句，必须用括号括住，以将其转换为表达式，才能返回其 值。
				// 这也是使用JSON来进行Ajax开发的基本原理之一。
				result = eval('(' + res + ')');
				// 获取请求状态和详细返回数据
				status      = result['status'];
				obj_manager = result['manager_info'];
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
				// PHP中json_encode函数return的结果是string的形式,所以前端还需要通过eval()函数来以JS代码形式执行这段string
				var result = new Array();  
				// 对于对象声明语句来说，仅仅是执行，并不能返回值。
				// 为了返回常用的“{}”这样的对象声明语句，必须用括号括住，以将其转换为表达式，才能返回其 值。
				// 这也是使用JSON来进行Ajax开发的基本原理之一。
				result = eval('(' + res + ')');
				// 获取请求状态和详细返回数据
				status  = result['status'];
				item_id = result['item_id'];
			},
			datatype : 'json'
		});
		return status;
	}
	
	// --- 发送POST请求，取消之前的排队
	function Cancel(user_id,item_id,state)
	{
		var status = 1;
		var para = 
		{
			"user_id"  : user_id,
			"item_id"  : item_id,
			"state"    : state
		};
		var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cuserparti/cancel";
		$.ajax({
			type: "POST",              // 发送请求类型为POST
			url : r_url,			   // 请求URL
			data: para,                // 请求参数
			async: false,              // 同步请求
			success: function(res){ // 响应函数
				// PHP中json_encode函数return的结果是string的形式,所以前端还需要通过eval()函数来以JS代码形式执行这段string
				var result = new Array();  
				// 对于对象声明语句来说，仅仅是执行，并不能返回值。
				// 为了返回常用的“{}”这样的对象声明语句，必须用括号括住，以将其转换为表达式，才能返回其 值。
				// 这也是使用JSON来进行Ajax开发的基本原理之一。
				result = eval('(' + res + ')');
				// 获取请求状态和详细返回数据
				status  = result['status'];
				message = result['message'];
			},
			datatype : 'json'
		});
		return status;
	}
	
	// --- 发送POST请求，用于注册新的用户
	function Register(user_name,password,phone)
	{
		var status = 1;
		var para = 
		{
			"user_name"  : user_name,
			"password"   : password,
			"phone"      : phone
		};
		var r_url  = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cuserlogin/register";
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
		return status;
	}
	
	// 根据item_id清除用户推送提醒消息
	function ClearNotification(item_id)
	{
		var status = 1;
		var para = 
		{
			"item_id" : item_id
		};
		var r_url = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cuserparti/clearnotification";
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
	
	/*****************************************************************************************************************************************/

	// --- 检查是否存在item信息,并加载响应信息
	//     该函数主要调用了GetItemInfo()，以此判断是否存在已参加的item
	function CheckItemExist()
	{
		//alert("Item info status: " + GetItemInfo());
		if(GetItemInfo() == 0 && obj_item["status"] == 0)// 存在已参加的队列项，并且该队列项处于等待状态,更新item_info
		{
			item_id = obj_item["item_id"];
			// 调试信息
			//alert("Enter the msg !");
			// 获取manager信息，并保存到obj_manager
			GetManagerInfoViaID(obj_item["manager_id"]);
			// 更新队列位置信息seq			
			//CurrentSeq(item_id);
			// 加载队列信息至msg_content
			UpdateMsgPage();
		}
		else// 若当前没有参加任何队列
		{
			item_id = 0;
			// 调试信息
			//alert("Enter the msg_blank !");
			// 加载空页面信息至msg_content
			ClearMsgPage();
		}
		// 跳转到应用主界面
		//$.mobile.changePage( "#msg", { transition: "slide"} );
	}
	
	// 更新消息页面中显示信息
	function UpdateMsgPage()
	{
		var type_str;
		switch(obj_item["item_type"])
		{
			case "1" : type_str = "一至两人桌";break;
			case "2" : type_str = "三至四人桌";break;
			case "3" : type_str = "五人以上桌";break;
		};
		document.getElementById("msg_content").innerHTML = 
			"<h1>当前排号&nbsp;:&nbsp;" + obj_item["item_name"] + "</h1>" +
			"<h3>排号餐厅&nbsp;:&nbsp;" + obj_item["manager_name"] + "</h3>" +
			"<p>参加排队时间&nbsp;:&nbsp;" + obj_item["parti_time"] + "</p>" +
			"<h3>您选择的席位类别&nbsp;:&nbsp;</h3><span>" + type_str + "</span>" +
			"<p>您现在排在该席位的第&nbsp;" + obj_item["seq"] + "&nbsp;位</p>" +
			"<h3>餐厅座位情况</h3>" +
			"一至两人桌&nbsp;:&nbsp;<span>" + obj_item["left_one2two"] + "</span>&nbsp;<br>" +
			"三至四人桌&nbsp;:&nbsp;<span>" + obj_item["left_three2four"] + "</span>&nbsp;<br>" +
			"五人以上桌&nbsp;:&nbsp;<span>" + obj_item["left_upfive"] + "</span>&nbsp;<br>" +
			"<a id='msg_cancel_b' data-role='button' data-transition='fade' onclick='msg_cancel();' data-theme='b' class='ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c'><span class='ui-btn-inner ui-btn-corner-all'><span class='ui-btn-text'>退&nbsp;&nbsp;号</span></span></a>";
	}
	
	// 清空消息页面中显示信息
	function ClearMsgPage()
	{
		document.getElementById("msg_content").innerHTML = 
			"<br><br><br><br><br><br><br><br><center><h3>您当前未参加任何排号</h3></center><center><h5>请戳”扫码”进行排号</h5></center><br><br><br><br><br><br><br>";
	}

	// 返回键响应事件     
	function onBackKeyDown()
	{      
		// 调试信息
		alert("onBackKeyDown!");
		// 退出应用程序
		navigator.app.exitApp();
	} 
	
	// 定时事件，用于刷新数据
	function TimeCount()
	{
		//GetItemInfo();
		// 显示item信息
		//UpdateMsgPage();
		CheckItemExist();
		if(obj_item["notification"] == "1")
		{
            sina.notification.notify({
                "saeAppName": "",
                "redirectUrl": "../index.html",
                "tickerText": "您的排号已到，请速去就餐！",
                "contentTitle": obj_item["manager_name"],
                "contentText": "您的排号已到，请速去就餐！",
                "id": 1
            });
            alert("您的当前排号已到！\n请速到餐厅就餐");
			ClearNotification(obj_item["item_id"]);
		}
		else if(obj_item["notification"] == "2")
		{
            sina.notification.notify({
                "saeAppName": "",
                "redirectUrl": "../index.html",
                "tickerText": "您的排号已过号！",
                "contentTitle": obj_item["manager_name"],
                "contentText": "您的排号已过号！",
                "id": 2
            });
            alert("由于您未及时前来就餐。\n您的排号已过号!");
			ClearNotification(obj_item["item_id"]);
			Cancel(user_id,obj_item["item_id"],"2");
			ClearMsgPage();
		}
		
		if(obj_item["seq"] <= no_num && no_first == true && item_id != 0 )
		{
			no_first = false;
			sina.notification.notify({
                "saeAppName": "",
                "redirectUrl": "../index.html",
                "tickerText": "您的排号即将到！请速去就餐！",
                "contentTitle": obj_item["manager_name"],
                "contentText": "您的排号即将到！请速去就餐！",
                "id": 3
            });
            alert("您的排号即将到！请速去就餐！");
		}
		t=setTimeout("TimeCount()",3000);
	}
	
	/*****************************************************************************************************************************************/
	
	/****************************************************************
	 * 初始化函数
	 * 用于进入主程序前的一些准备工作，包括检查是否存在账号
	 * by Woodie .at 2014.8.14
	 ****************************************************************/
	function onLoad()
	{
			
		// 调试信息
	}
	
    // 以下代码必须放在body后面  

	/*************************
	 * 注册按键响应事件
	 * by Woodie .at 2014.8.14
	 *************************/
	$('#reg_register_b').click(function(){
		r_user_name = $("input#r_user_name:text").val();
		r_password  = $("input#r_password:password").val(); 
		r_phone     = $("input#r_phone:text").val();
		if(Register(r_user_name,r_password,r_phone) == 0)
		{
			alert("注册成功！\n成功信息:" + user_id);
			// 跳转到登录界面
			$.mobile.changePage( "#home", { transition: "slide"} );
		}
		else
		{
			alert("注册失败！\n错误信息：" + user_id);
		}
	});
	
	 /*************************
	 * 登录按键响应事件
	 * by Woodie .at 2014.8.14
	 *************************/
	$('#home_login_b').click(function(){
		// 为返回键添加响应事件
		document.addEventListener("backbutton", onBackKeyDown, false); 
		// 登录状态
		var status=1;
		var message;
    	user_name = $("input#user_name:text").val();
		password  = $("input#password:password").val(); 
		//alert(user_name + ' ' +password);
		// 向后台发送post请求
		var para = 
		{
			"user_name" : user_name,
			"password"  : password
		};
		var r_url = "http://callmeplease.sinaapp.com/CodeIgniter_2.2.0/index.php/cuserlogin/login";
		$.ajax({
			type: "POST",              // 发送请求类型为POST
			url : r_url,// 请求URL
			data: para,                // 请求参数
			async: false,              // 同步请求
			success: function(res){ // 响应函数
				// PHP中json_encode函数return的结果是string的形式,所以前端还需要通过eval()函数来以JS代码形式执行这段string
				var result = new Array();  
				// 对于对象声明语句来说，仅仅是执行，并不能返回值。
				// 为了返回常用的“{}”这样的对象声明语句，必须用括号括住，以将其转换为表达式，才能返回其 值。
				// 这也是使用JSON来进行Ajax开发的基本原理之一。
				result = eval('(' + res + ')');
				// 获取请求状态和详细返回数据
				status  = result['status'];
				message = result['message'];
				// 调试信息
				//alert(message);
			},
			datatype : 'json'
		});
		if(status == 0)
		{
			// 获取用户ID数据
			user_id = message;
			// 调试信息
			//alert("Enter the main interface!");
			// 检查是否存在队列项信息，跳转到响应界面
			CheckItemExist();
			// 填写设置界面用户名
			document.getElementById("set_username").innerHTML =  user_name;
			$.mobile.changePage( "#msg", { transition: "slide"} );
			// 开启定时器
			TimeCount();
		}
		else
		{
			alert("登陆失败！\n失败信息：" + message);
		}
	});  
	
	/*************************
	 * 二维码扫描按钮响应事件
	 * by Woodie .at 2014.8.15
	 *************************/
	$('#msg_barcode_b').click(function(){
    	sina.barcodeScanner.scan(function(result){
			// 如果二维码查询结果不为空
			if(result.text != "")
			{
				barcode = result.text;
				// 调试信息
				/* alert("We got a barcode\n" +
				"Result: " + result.text + "\n" +
				"Format: " + result.format + "\n" +
				"Cancelled: " + result.cancelled); */
				// 跳转到餐厅信息确认界面
				$.mobile.changePage( "#ensure_info", { transition: "fade"} );
			}
		}, function(error) {
		    alert("Please try again!");
		});
  	});
	
	/*************************
	 * 确认查看按钮响应事件
	 * by Woodie .at 2014.8.15
	 *************************/
	// 确认查看按钮响应事件，加载餐厅信息页面
	$('#ensure_affirm_b').click(function(){
		// 调试信息
		//alert("Ensure to check info!!");
		// 若成功匹配到餐厅信息
		if(GetManagerInfoViaBC(barcode) == 0)
		{			
			// 调试信息
			//alert("Search manager successfully!");
			document.getElementById("info_content").innerHTML = 
			"<h1>" + obj_manager["manager_name"] + "</h1>" +
			"<p>" + obj_manager["introduction"] + "</p>" +
			"<h3>餐厅座位情况</h3>" +
			"一至两人桌&nbsp;:&nbsp;<span>" + obj_manager["total_one2two"] + "</span><br>" +
			"三至四人桌&nbsp;:&nbsp;<span>" + obj_manager["total_three2four"] + "</span><br>" +
			"五人以上桌&nbsp;:&nbsp;<span>" + obj_manager["total_upfive"] + "</span><br>";
			// 跳转到餐厅信息界面
			$.mobile.changePage( "#info", { transition: "slide"} );
		}
		else
		{
			// ...do something...
			alert("二维码无效！");
			// 跳转到消息界面
			$.mobile.changePage( "#msg", { transition: "slide"} );
		}
		// barcode清空	
		barcode = "";
  	});
	
	/*************************
	 * 确认排队按钮响应事件
	 * by Woodie .at 2014.8.15
	 *************************/
	$('#info_affirm_b').click(function(){
		// 调试信息
		type = $("select#info_type_s").val();
		//alert(type);
		// 若加入队列成功，更新item_id
		if(Participate(user_id,obj_manager["manager_id"],type) == 0)
		{
			$.mobile.changePage( "#msg", { transition: "slide"} );
		}
		// 更新item_info
		GetItemInfo();
		// 更新队列位置信息seq
		//CurrentSeq(item_info["item_id"]);
		// 显示item信息
		// 新的排号，从未提醒过，该标志位置true
		no_first = true;
		UpdateMsgPage();
		//alert("Ensure to participate!!");
  	});
	
	
	$('#set_modify_affirm').click(function(){
		no_num = $("select#set_select").val();
		alert("修改成功！\n还剩"+no_num+"人时会给您发送提醒通知！");
  	});
	
	/*************************
	 * 取消排队按钮响应事件
	 * by Woodie .at 2014.8.15
	 *************************/
	//$('#msg_cancel_b').click(
	var msg_cancel = function(){
		// 调试信息
		//alert("Ensure to Cancel!!");
		// 若退出队列成功
		if(Cancel(user_id,item_id,"1") == 0)
		{
			// 调试信息
			alert("退号成功");
			$.mobile.changePage( "#msg", { transition: "slide"} );
		}
		// 清空管理者信息和队列信息
		obj_manager = "";
		obj_item    = "";
		item_id     = 0;
		no_first = true;
		// 显示空白页
		ClearMsgPage();
  	}

	