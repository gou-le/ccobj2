import { judgeRepwd, judgePwd, judgeUser } from './registerCopy.js'

layui.use('layer', function () {
// import{APIShopping}from './fetch.js'
var layer = layui.layer;
$(document).ready(function () {//引入头部
    $(".headerBox ").load("header.html" ,function(){
        $("#login").click(function(){
            location.href="./login.html";
        });
        $("#register").click(function(){
            location.href="./register.html";
            sessionStorage.removeItem("name");
            
        });
    });
    $("#register").click(function(){//注册
        location.href="./register.html";
        sessionStorage.setItem("src",location.href);
        
    });
    $("#index").click(function(){//首页
        location.href = "./index1.html";
    });
    $("#alllist").click(function(){//商品详情
        location.href = "./doogParticulars.html";
    });
    $("#headshopping").click(function () {//head购物车
        if (sessionStorage.getItem("name")) {
            location.href = "./shopping.html"
        } else {
            layer.open({
                // type:5,
                // title:"成功添加购物车",
                content: "快来登录吧",
                skin: 'demo-class',
                btn: ["登录", "取消"],
                btn1: function () {
                    sessionStorage.setItem("src", location.href);
                    location.href = "./login.html";
                },
                btn2: function () {

                }
            });
        }

    });
    $("#headOrder").click(function () {//我的订单
        console.log(123);

        if (sessionStorage.getItem("name")) {
            location.href = "./account.html"
        } else {
            layer.open({
                // type:5,
                // title:"成功添加购物车",
                content: "快来登录吧",
                skin: 'demo-class',
                btn: ["登录", "取消"],
                btn1: function () {
                    sessionStorage.setItem("src", location.href);
                    location.href = "./login.html";
                },
                btn2: function () {

                }
            });
        }

    });

});

$(document).ready(function () {//引入尾部
    $(".footer ").load("footer.html")
});

var falgCode = '';//存放验证码作为判断依据
var random = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', "Z", 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', "z"];//随机数组
showrandomnum("#verificationCode_span");

$(".register_btn_box").click(function () {
    var name = $("#userName").val();
    var pwd = $("#pwd").val();
    var affirmPwd = $("#affirmPwd").val();
    var pwdnum = judgePwd(pwd);
    var randomnum = $("#verificationCode_text").val();
    if (judgeUser(name) == 1) {
        $("#name_span").text("√");
    } else {
        $("#userName").val("");
        $("#userName").attr("placeholder", "你的输入有误");
        $("#name_span").text("");
    }
    if( pwdnum>=1){    
        if(pwdnum==1){
            $('#pwd_span').text("弱");
        } 
        if(pwdnum==2){
            $('#pwd_span').text("中");
        } 
        if(pwdnum==3){
            $('#pwd_span').text("强");
        }   
    }else{
        $("#pwd").val("");
        $("#pwd").attr("placeholder", "你的输入有误");
        $('#pwd_span').text("");
        showrandomnum("#verificationCode_span");
    }
    if(judgeRepwd(pwd,affirmPwd)){
        $("#affirmPwd_span").text("√");
    }else{
        $("#affirmPwd").val("");
        $("#affirmPwd").attr("placeholder", "你的输入有误");
        $("#affirmPwd_span").text("");
        showrandomnum("#verificationCode_span");
    }

    if(judgeRandomnum(randomnum,falgCode)){
        $("#verificationCode_span2").text("√");
    }else{
        $("#verificationCode_text").val("");
        $("#verificationCode_text").attr("placeholder", "你的输入有误");
        showrandomnum("#verificationCode_span");
        $("#verificationCode_span2").text("");
    }
    if(judgeUser(name)&&pwdnum&&judgeRepwd(pwd,affirmPwd)&&judgeRandomnum(randomnum,falgCode)){
        $.ajax({
            url:`http://${location.hostname}/ccobj2/php/user-register.php`,
            data:{
                username:name,
                password:pwd
            },
            dataType:"json",
            success:({code,msg})=>{
                if(code==1){
                    layer.msg(msg,function(){
                        location.href="./login.html";
                    });
                    
                }else{
                    $("#userName").val("");
                    $("#userName").attr("placeholder", "你的输入有误");
                    $("#pwd").val("");
                    $("#pwd").attr("placeholder", "你的输入有误");
                    $("#affirmPwd").val("");
                    $("#affirmPwd").attr("placeholder", "你的输入有误");
                    $("#verificationCode_text").val("");
                    $("#verificationCode_text").attr("placeholder", "你的输入有误");
                    $("#name_span").text("");
                    $('#pwd_span').text("");
                    $("#affirmPwd_span").text("");
                    $("#verificationCode_span2").text("");
                    showrandomnum("#verificationCode_span");
                    layer.msg(msg+"换一个用户名shishi");
                }
            }

        })
    }
})

function judgeRandomnum(num1,num2){
    if(num1==num2){
        return 1;
    }else{
        return false;
    }

}

function showrandomnum(eleid) {//刷新验证码
    var randomChar = "";
    for (var i = 0; i < 4; i++) {
        var rm = Math.round(Math.random() * random.length-1);
        randomChar += random[rm];
    }
    $(eleid).text(randomChar);
    falgCode = randomChar;
}


})

