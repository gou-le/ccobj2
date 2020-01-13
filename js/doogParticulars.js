$(document).ready(function () {//引入头部
    $(".headerBox ").load("header.html" ,function(){
        if( sessionStorage.getItem("name")){
            var uname = $("<p style ='float: left;'></p>");
            var a =$("<a style ='float: left;'>退出</a>");
            var sn = $("<span style ='float: left;' >|</span>")
            uname.text(sessionStorage.getItem("name"));
            $("#login").append(uname);
            $("#login").append(sn);
            $("#login").append(a);
            $("#login_span").text("");
            a.click(function(){
                uname.remove();
                sn.remove();
                a.remove();
                $("#login_span").text("请,登录");
                $("#login_span").click(function(){
                    location.href="./login.html";
                })
            });
        
        }else {
            $("#login").click(function () {//登录
                sessionStorage.setItem("src", location.href);
                location.href = "./login.html";
            })
        }
       
        $("#index").click(function(){//首页
            location.href = "./index1.html";
        });
        $("#alllist").click(function(){//商品详情
            location.href = "./doogParticulars.html";
        });
        $("#register").click(function(){//注册
            location.href="./register.html";
            sessionStorage.setItem("src",location.href);
            
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

    })
});

$(document).ready(function(){//引入尾部
    $(".footer ").load("footer.html",function(){
    })
});


var title ='';
var operation = "asc";
var key ='';
showDoogList(); 
function showDoogList(){
    $.ajax({
        url:`http://${location.hostname}/ccobj2/php/booglist.php`,
        data:{
            title
            ,operation
            ,key
        },
        dataType:"json",
        success:({code,list})=>{      
            var html= '';
            if(code==1){

                list.forEach(({id,img,name,price})=>{
                    html+=`
                    <li>
                        <div style="height: 536px;" class="">
                                    <a class="a" href="./commodityList.html?id=${id}&name=${name}"><img style="display: block; width: 100%;height: 100%;" src="${img}" alt="">
                                    </a>
                        </div>
                                <a style="display: block; margin-top: 18px;" href="">${name}</a>
                                <p style=" color: red;">
                                    ￥${price}
                                </p>
                    </li>
                    `
                    
                });
                $(".doogLogoList_ul").html(html); 
            }
       }
    })
}

$("#title").on("click","li",function(){
    // console.log($(this).text());
    title=$(this).text();
    // $(this).sibings().css({
    //     "color":"#000"
    // });


    $(this).css({
        "color":"red"
    })
    showDoogList(); 
});
$("#asc").click(function(){
    operation="asc";
    console.log(operation);
    
    showDoogList(); 
    $("#desc").prop("checked",false);
});
$("#desc").click(function(){
    operation="desc";
    
    showDoogList(); 
    $("#asc").prop("checked",false);
});

$("#select_btn").click(function(){
    key=$("#select").val();
    showDoogList(); 
});