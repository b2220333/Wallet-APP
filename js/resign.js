var userType=0;//userType用户类型判断;
$('#select_style').on('change',function(){
	$(this).val()=='person' ? $('.company_show').hide() : $('.company_show').show();
	type=$('#select_style').find('option:selected').text()
	$(this).val()=='person' ? userType=0 : userType=1;

})

//至少一个复选框；

/*var len;
$('.checkbox').on('change','input',function(){
len=$('input[type=checkbox]:checked').length;
if(len<1){
	$(this).attr('checked','checked');
	return false;
	console.log(len)
}else{

}
})*/

/*if ($(":checkbox:checked").size() == 0)
{
  alert("最少选择一个");
}*/


/*$('.resign_dright input[type=checkbox]:checked').each(function(value,index){

})*/
//角色类型
var regUserName,pwd;
// console.log($('#select_style option:checked').html())
var desc='';
var SelectFalse = false; //用于判断是否被选择条件
function Submit(){
	var chboxValue = [];
	var CheckBox = $('input[type = checkbox]');//得到所的复选框

	for(var i = 0; i < CheckBox.length; i++){
		if(CheckBox[i].checked){//如果有1个被选中时
			SelectFalse = true;
			// chboxValue.push(CheckBox[i].value)//将被选择的值追加到
		}
	}

	if(!SelectFalse){
		desc='至少选择一个角色类型';
		$('.error').html(error)
		return false
	}
}
//可调用的对象函数。
var util = {
	ltrim : function(s) {
		return s.replace(/^\s*/, "");
	},

	rtrim : function(s) {
		return s.replace(/\s*$/, "");
	},

	trim : function(s) {
		return this.rtrim(this.ltrim(s));
	},
	checkNumber : function(num) {
		filter = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
		if (!filter.test(this.trim(num))) {
			return false;
		} else {
			return true;
		}
	}, 
	// 检测手机号格式是否正确
	checkMobile : function(mobile) {
		filter = /^1[3|4|5|8|7][0-9]\d{8}$/;
		if (!filter.test(this.trim(mobile))) {
			return false;
		} else {
			return true;
		}
	},
	//输入密码格式是否正确
	isPassword : function(pwd) {
		// var desc = "";
		var c = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[\\S]{6,}$");
		if (pwd == "") {
			desc = '请输入密码';
		} else if (pwd.length < 6) {
			desc = '密码长度不能小于6';
		} else if (pwd.length > 16) {
			desc = '密码长度不能大于16';
		} else if (!c.test(pwd)) {
			desc = "密码格式错误，密码必须大于等于6位且包含字母和数字！";
		}else{
			desc='';
		}
		return desc;
	},
	checkEmail : function(email) {
		filter = /^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (!filter.test(this.trim(email))) {
			return false;
		} else {
			return true;
		}
	},
}
// 用户注册
var register={
	// 用户名判断  
	checkRegUsername:function(){
		var regType=document.getElementById('regType').value;
		regUserName=$('#register-phone').val();
		var a= new RegExp("^[0-9a-zA-Z_]{1,}$")
		if(!a.test(regUserName)){
			desc='用户名格式是数字、字母、下划线'
			// $('.error').html(desc)
		}else{
			desc=''
		}
		var url='';
		$('.error').html(desc)
	},
	//密码判断
	checkPassword:function(){
		pwd=util.trim(document.getElementById('register-password').value);
		desc=util.isPassword(pwd);
		if(desc!=''){

		}
		$('.error').html(desc)

	},
	//确认密码判断
	checkRePassword:function(){
		var errortip=''

		var pwd=util.trim(document.getElementById('register-password').value);
		rePwd=util.trim(document.getElementById('register-repassword').value);
		// var desc=util.isPassword(psd);
		if(pwd!=rePwd){
			desc="两次密码输入不一致"
			// console.log(errortip)
		}else{
			desc='';
		}
	
	},
	//输入手机号判断
	checkPhone:function(){
		 phone=$('#phone').val();
		if(phone.indexOf(' ') > -1){
				desc='手机号不能包含空格';
			}else{
				if (phone == '') {
					desc = "请输入手机号";

				} else if (!util.checkMobile(phone)) {
					desc ='手机号格式不正确';
				}else{
					desc=''
				}
			}
		// return console.log(desc)
	},
	//邮箱
	checkEmail:function(){
		// var email=$('#email').val();
		 email = util.trim(document.getElementById("email").value);
			if (email.indexOf(" ") > -1) {
				desc = '邮箱不能包含空格';
			} else {
				if (email == '') {
					desc = '请您输入邮箱！';
				} else if (!util.checkEmail(email)) {
					desc = '邮箱格式不正确,请重新输入';
				} else if (new RegExp("[,]", "g").test(email)) {
					desc = '含有非法字';
				} else if (email.length > 100) {
					desc = '邮箱长度应小于100个字';
				}else{
					desc = '';
				}
			}
	},
	submit:function(){
		Submit()
		if(desc!=''){
			return;
		}
		var data={
			"name":regUserName,
			"passwd":pwd,
			"mobile":$('#phone').val(),
			"email":email,	
			"userType":userType,
			"roleType":0,
			"companyName":$('#companyName').val(),
			"companyAddr":$('#companyAddr').val(),
			"orgCode":$('#orgCode').val(),
			"verificationCode":$('#validataCode').val()
		}
		// console.log(data)
		$.ajax({
			type:'POST',
			contentType:'application/json;charset=utf-8',
			// url:'http://10.104.11.235:8080/user/register?random='+Math.round(Math.random()*100),
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/user/register?random='+Math.round(Math.random()*100), timeout:0,
			async:true,
			cache:false,
			data:JSON.stringify(data),
			dataType:'json',
			beforeSend:function(){
				$('.error').html('正在注册，请耐心等待');
				$('.resign_sure').attr('disabled',true);
				$('.resign_sure').css('cursor','not-allowed');
				$('.resign_sure').addClass('active')
			},
			complete:function(rml,starus){
				if(status=='timeout'){//超时,status还有success,error等值的情况
　　　　　　	}
				$('.resign_sure').removeAttr('disabled')
				$('.resign_sure').css('cursor','pointer');
				$('.resign_sure').removeClass('active')
			},
			success:function(res){
				if(res.returnCode==0){ //注册成功0
					// console.log(res);
					$('.error').html('');
					sessionStorage.setItem('account',res.items[0].account);
					sessionStorage.setItem('login',regUserName);
					window.location='index.html';
				}else if(res.returnCode==11){ //用户名已存在11
					$('.error').html('用户名已存在')
					setTimeout("$('.error').html('')",3000)
					// $('.error').html('用户名已存在')
				}else if(res.returnCode==-2){
					$('.error').html('验证码错误，请重新输入')
				}else{ //注册失败
					$('.error').html('注册失败，请检查网络，稍后再试')
					setTimeout("$('.error').html('')",3000);
				}
			},
			error:function(res){
				$('.error').html('注册失败，请检查网络')
			}
		})

	}

};
$(function(){
	//用户名
	$('#register-phone').on('blur',function(){
		register.checkRegUsername();

	});
	// 密码
	$('#register-password').on('blur',function(){
		register.checkPassword();
		$('.error').html(desc);
	})
	// 重新输入密码
	$('#register-repassword').on('blur',function(){
		register.checkRePassword();
		$('.error').html(desc);
	})
	//手机号
	/*$('#phone').on('blur',function(){
		register.();
		$('.error').html(desc);

	})*/
	$('#email').on('blur',function(){
		register.checkEmail();
		$('.error').html(desc);
	});
	
	//注册
	$('.resign_sure').on('click',function(){
		register.submit();
	})  
	// 点击确认按钮时   
	$(".user-content").keyup(function(e){
            //keyCode ===13 表示回车键
            if(e.keyCode === 13){
                register.submit()
                var username=$("#register-phone").val()
		sessionStorage.setItem('login',username)
		window.location='index.html'
            }
        });    
      $('.resign_cancel').click(function(){
      	window.location='index.html';
      	// $('.resign_body input').val('')	;
      	// $('.error').html('')
      })                                                          
});











































