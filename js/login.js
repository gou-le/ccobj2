layui.use('layer', function () {
    var layer = layui.layer;
    console.log(123);
    // import{APIShopping}from './fetch.js'
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
        console.log(123);
        
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

$(".register_btn_box").click(function(){

    var name = $("#userName").val();
    var pwd = $("#pwd").val();
    var randomnum = $("#verificationCode_text").val();
    
    if(judgeRandomnum(randomnum,falgCode)){
        $("#verificationCode_span2").text("√");
    }else{
        $("#userName").val("");
        $("#userName").attr("placeholder", "你的输入有误");
        $("#pwd").val("");
        $("#pwd").attr("placeholder", "你的输入有误");
        $("#verificationCode_text").val("");
        $("#verificationCode_text").attr("placeholder", "你的输入有误");
        showrandomnum("#verificationCode_span");
    }
    if(judgeRandomnum(randomnum,falgCode)){
        $.ajax({
            url:`http://${location.hostname}/ccobj2/php/register.php`,
            data:{
                username:name,
                password:pwd
            },
            dataType:"json",
            success:({code,msg})=>{
                if(code==1){
                    sessionStorage.setItem("name",name);
                    layer.msg(msg);
                    if(sessionStorage.getItem("src")){
                        location.href=`${sessionStorage.getItem("src")}`;
                    }else{
                        location.href="./index1.html"
                    }
                   
                }else{
                    layer.msg(msg);
                    $("#userName").val("");
                    $("#userName").attr("placeholder", "你的输入有误");
                    $("#pwd").val("");
                    $("#pwd").attr("placeholder", "你的输入有误");
                    $("#verificationCode_text").val("");
                    $("#pwd").attr("placeholder", "你的输入有误");
                    $("#verificationCode_span2").text("");
                    showrandomnum("#verificationCode_span");

                }
            }
        })
    }
})

function showrandomnum(eleid) {//刷新验证码
    var randomChar = "";
    for (var i = 0; i < 4; i++) {
        var rm = Math.round(Math.random() * random.length-1);
        randomChar += random[rm];
    }
    $(eleid).text(randomChar);
    falgCode = randomChar;
}

function judgeRandomnum(num1,num2){
    if(num1==num2){
        return 1;
    }else{
        return false;
    }

}
})
