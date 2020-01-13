layui.use('layer', function () {
    var layer = layui.layer;
    $(document).ready(function () {//引入头部
        $(".headerBox ").load("header.html", function () {
            if (sessionStorage.getItem("name")) {
                var uname = $("<p style ='float: left;'></p>");
                var a = $("<a style ='float: left;'>退出</a>");
                var sn = $("<span style ='float: left;' >|</span>")
                uname.text(sessionStorage.getItem("name"));
                $("#login").append(uname);
                $("#login").append(sn);
                $("#login").append(a);
                $("#login_span").text("");
                a.click(function () {
                    uname.remove();
                    sn.remove();
                    a.remove();
                    $("#login_span").text("请,登录");
                    $("#login_span").click(function () {
                        location.href = "./login.html";
                    })
                });

            } else {
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

            $("#register").click(function () {//注册
                // sessionStorage.setItem("src",location.href);
                location.href = "./register.html";
                sessionStorage.removeItem("name");

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


    $(document).ready(function () {//引入尾部
        $(".footer ").load("footer.html")
    });


    layui.use('carousel', function () {
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
            elem: '#test1'
            , width: '100%' //设置容器宽度
            , arrow: 'always' //始终显示箭头
            , height: "980px"
            //,anim: 'updown' //切换动画方式
        });
    });
    // wzry191224_10.jpg

});