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
                location.href = "./register.html";
                sessionStorage.removeItem("name");

            });
            $("#headshopping").click(function () {//购物车
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
    // 放大镜
    $('.left_box_zhong').mouseenter(function (e) {
        var temporaryX = e.pageX;
        var temporaryY = e.pageY;

        $(".left_box_zhong").mousemove(function (e) {
            var cntLeft = $('.left_box_zhong').offset()["left"];
            var conTop = $('.left_box_zhong').offset()["top"];
            var leftMax = parseInt($(".left_box_zhong").css("width")) - parseInt($(".shade").css("width"));
            var topMax = parseInt($(".left_box_zhong").css("height")) - parseInt($(".shade").css("height"));
            var x = e.pageX;
            var y = e.pageY;
            var left = x - cntLeft - 116;
            var top = y - conTop - 122;
            var magnifyingx = ~(left) * 2;
            var magnifyingy = ~(top) * 3;
            if (magnifyingx >= 0) {
                magnifyingx = 0;
            }
            if (magnifyingx <= -260) {
                magnifyingx = -260;
            }
            if (magnifyingy >= 0) {
                magnifyingy = 0;
            }
            if (magnifyingy <= -1474) {
                magnifyingy = -1474;
            }

            if (left <= 0) {
                left = 0;
            }
            if (left >= leftMax) {
                left = leftMax;
            }
            if (top <= 0) {
                top = 0;
            }
            if (top >= topMax) {
                top = topMax;
            }

            $('.shade').css({
                "display": "block",
                "left": left,
                "top": top
            });
            $(".shade_magnifying").css(
                {
                    "display": "block",
                }
            );

            $(".shade_magnifying_img").css({
                "left": magnifyingx,
                "top": magnifyingy
            });
        });

        $(".left_box_zhong").mouseleave(function () {
            $('.shade').css({
                "display": "none",
            });
            $(".shade_magnifying").css(
                {
                    "display": "none",
                }
            );
            $(document).unbind("mouseenter");
            $(document).unbind("mousemove");
            $(document).unbind("mouseout");

        });


    });
    var id = analysisHerf("id");
    showDoogbox(id);
    // console.log(id);
    var contnum;
    var cntsize;
    function showDoogbox(id) {
        $.ajax({
            url: `http://${location.hostname}/ccobj2/php/commodity.php`,
            data: {
                id
            },
            dataType: "json",
            success: ({ code, data }) => {
                var { name, price, size, number, color, num, textcolor } = data;
                var list_box_4 = '';
                var size_list = size.split(",");
                var src = data["img"];
                var shade_magnifying = `
                <img class="shade_magnifying_img" src="${src}" alt="">
                `;


                var left_box_right = `
                <div class="left_box_right_text">${name}</div>
                <div class="doogcode">
                    <span>产品编号:</span>
                    <span>${number}</span>
                </div>
                <div class="left_box_right_text" >
                            单价:${price}
                        </div>
                <div class="size">
                    <div class="size_left">尺码:</div>
                    <ul class="size_right">
                        <li class="size_Bor">${size_list[0]}</li>
                        <li >${size_list[1]}</li>
                        <li >${size_list[2]}</li>
                        <li >${size_list[3]}</li>
                    </ul>
                </div>
                <!-- 款式选择 -->
                <div class="select">    
                    <div class="select_left">颜色:</div>
                    <ul class="select_right">
                        <li><img style="width: 100%;height: 100%;"
                                src="${color}"
                                alt=""></li>
                        
                    </ul>
    
                </div>
                <!-- 数量叠加 -->
                <div class="doognum">
                    <div class="doognum_left">数量:</div>
                    <div class="numBox">
                        <div class=numtext style="float: left;height: 45px; width:30px">1</div>
                        <div class="operation">
                            <div class="add" id="add">+</div>
                            <div class="add" id="subtract">-</div>
                        </div>
                    </div>
                    <div class="repertory">库存:</div>
                    <span class="repertory_num">${num}</span>
                    <span class="repertory_p">件</span>
                </div>
                <!-- 立即购买 -->
                <div class="purchase_box">
    
                    <div class="addCart"><i class="iconfont icon-gouwuchekong"></i>加入购物车</div>
                    <div class="buyNow">立即购买</div>
                </div>
                `;
                if (code == 1) {
                    var imgs_list = data["imgs"].substring(1);
                    imgs_list = imgs_list.substring(0, imgs_list.length - 1);
                    //    console.log(imgs_list.substring(0,imgs_list.length-1));
                    // console.log(imgs_list);
                    imgs_list = imgs_list.split(",")
                    for (var i = 0; i < imgs_list.length; i++) {
                        list_box_4 += `
                            <li>
                            <img id="left_box_list_img" style="width: 100%;height: 100%;"
                                src=${imgs_list[i]}
                               alt="">
                                </li>
                            
                            `
                    }


                    // console.log(src);
                    $("#list_box_4").html(list_box_4);
                    $(".left_box_right").html(left_box_right);
                    $(".shade_magnifying").html(shade_magnifying);
                    $("#list_zhong").attr({
                        "src": `${src}`
                    });

                    $(".size_right").on('click', "li", function () {
                        $(this).siblings().removeClass("size_Bor");
                        $(this).addClass("size_Bor")
                        // console.log($(".size_Bor").text());//存放尺码
                        cntsize = $(".size_Bor").text();
                    });
                    
                   
                    
                    $(".operation").on("click", "#add", function () {
                        var numMax = $(".repertory_num").text();
                        var contnumBox = $(".numtext").text();


                        if (contnumBox < numMax) {
                            contnumBox++;
                            $(".numtext").text(contnumBox);
                            contnum = $(".numtext").text();
                        }
                    });
                    $(".operation").on("click", "#subtract", function () {
                        var numMin = 1;
                        var contnumBox = $(".numtext").text();


                        if (contnumBox > numMin) {
                            contnumBox--;
                            $(".numtext").text(contnumBox);
                            contnum = $(".numtext").text();
                        }
                    });
                    $(".purchase_box").on("click", ".addCart", function () {
                        cntsize = $(".size_Bor").text();
                        contnum = $(".numtext").text();
                        if (sessionStorage.getItem("name")) {                            
                            var username =sessionStorage.getItem("name");
                            $.ajax({
                                
                                url:`http://${location.hostname}/ccobj2/php/shopping.php`,
                                data:{
                                    "goodid":id,"img":`${imgs_list[1]}`,"doogname":name,"color":textcolor,"size":cntsize,"num":contnum,price,username
                                },
                                dataType:"json",
                                success:({code})=>{                                    
                                  if(code==1){
                                    layer.open({
                                        content:"添加成功!",
                                        btn:["去购物车","继续剁手"],
                                        btn1: function () {
                                            sessionStorage.setItem("src",location.href);
                                            location.href = "./shopping.html";
                                            
                                            console.log(1);
                                        },
                                        btn2: function () {
        
                                            location.href="./doogParticulars.html"
        
                                        }
                                    });
                                  }
                                    
                                }
                            })

                        } else {
                            layer.open({
                                // type:5,
                                // title:"成功添加购物车",
                                content: "快来登录吧",
                                skin: 'demo-class',
                                btn: ["登录", "取消"],
                                btn1: function () {
                                    sessionStorage.setItem("src",location.href);
                                    location.href = "./login.html";
                                },
                                btn2: function () {

                                }
                            });

                        }
                    })

                }
            }
        });


    }


    function analysisHerf(str) {
        var src = location.search.substring(1);
        // console.log(src);

        var mtop = src.split('&')
        var list = mtop.map(itme => {
            return {
                key: itme.split("=")[0],
                value: itme.split("=")[1]
            }
        });
        return list.filter(({ key }) => key === `${str}`)[0].value;
    }



});   