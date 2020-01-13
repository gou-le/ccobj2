layui.use('layer', function () {
    var layer = layui.layer;
    var shen ="";
    var si ="";
    var qu ="";
    // layer.msg('添加失败请完善你的订单');
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
    var username = sessionStorage.getItem("name");

    showsite();

    $("#province").change(function(){
        shen= $("#province option:selected").text();
        
    });
    $("#city ").change(function(){
        si= $("#city  option:selected").text();
    });
    $("#area").change(function(){
        qu= $("#area option:selected").text();
    });

 

    $.ajax({//刷新订单
        url: `http://${location.hostname}/ccobj2/php/account.php`,
        data: {
            username
        },
        dataType: "json",
        success: ({ code, data }) => {
            var html = ``;
            var billHtml = ``;
            var picsum = data[0]["pricesum"];
            if (code) {
                data.forEach(({ img, goodname, color, size, num, price, sums, goodid }) => {
                    html += `<td style="width: 100%; display: block;">
                    <div class="" style="margin:10px 0;height: 152px;">
                        <div class="srcimg ">
                            <img style="width: 100px;height: 150px;float: left;display: block; margin: auto;" src=${img} alt="">
                        </div>
                        <div class="doogtext">
                            ${goodname}
                        </div>
                        <div class="doogColor">
                            <select  id="goodsColor_select" style=" width: 130px;
                            height: 28px;">
                                <option value="${color}">${color}</option>
                            </select>
                        </div>
                        <div class="doogColor size">
                            <select  id="goodsColor_size" style=" width: 130px;
                            height: 28px;">
                                <option value=${size}>${size}</option>
                            </select>
                        </div>
                        <div class="doogColor doogNum ">
                            <div class="num"style="margin:auto">${num}</div>
                           
                        </div>
                        <div class="doogColor price">
                            <span>￥:</span>
                            <span id="price_span">${price}</span>
                        </div>
                        <div class="doogColor total">
                            <span>￥:</span>
                            <span id="total_span">${sums}</span>
                            
                        </div>
                    </div>
                </td>`;
                });
                billHtml = `  <tr>
                <td>商品总金额：</td>
                <td>RMB</td>
                <td>￥</td>
                <td id="all-goods-price1">${picsum}</td>
            </tr>
            <tr>
               <td style="color: red;">优惠券:</td>
               <td style="color: red;">RMB</td>
               <td style="color: red;"> ￥</td>
               <td style="color: red;" id="all-goods-price1"></td>
           </tr>
           <tr>
               <td style="color: red;">快递费：</td>
               <td style="color: red;">RMB</td>
               <td style="color: red;">￥</td>
               <td style="color: red;" id="all-goods-price1">10</td>
           </tr>
           <tr>
               <td style="color: red;">应付金额：</td>
               <td style="color: red;">RMB</td>
               <td style="color: red;" >￥</td>
               <td style="color: red;" id="all-goods-price1">${picsum}</td>
           </tr>
           <tr>
               <td >花费的积分：</td>
               <td>PTS</td>
               <td>￥</td>
               <td id="all-goods-price1">0</td>
           </tr>`;
                $(".shoppingList").html(html);
                $(".settlement_tr").html(billHtml);
            }
        }
    })

    $(".safePay").on("click", "#submitOrder", function () {//提交订单
       if($("#contSite").val()){
            $.ajax({
            url: `http://${location.hostname}/ccobj2/php/deleteIndent.php`,
            data: {
                username
            },
            dataType: "json",
            success: ({ code, msg }) => {
                console.log(code, msg);

                if (code) {
                    layer.open({
                        // type:5,
                        // title:"成功添加购物车",
                        content: "订单提交成功",
                        skin: 'demo-class',
                        btn: ["返回主页", "再去剁手"],
                        btn1: function () {
                            location.href = "./index1.html";
                        },
                        btn2: function () {
                            location.href = "./doogParticulars.html";

                        }
                    });
                } else {
                    layer.msg("提交失败");
                }
            }
        })
           
       }else{
           layer.msg("请选择地址!")
       }
    
        

       

    });

    $(".safePay").on("click", "#cancel", function () {//取消订单
        layer.open({
            // type:5,
            // title:"成功添加购物车",
            content: "是否取消订单",
            skin: 'demo-class',
            btn: ["确定", "取消"],
            btn1: function () {
                $.ajax({
                    url: `http://${location.hostname}/ccobj2/php/deleteIndent.php`,
                    data: {
                        username
                    },
                    dataType: "json",
                    success: ({ code, msg }) => {
                        console.log(code, msg);

                        if (code) {
                            layer.msg("订单已取消", function () {
                                location.href = "./shopping.html";
                            });
                        } else {
                            layer.msg(msg)
                        }
                    }
                })


            },
            btn2: function () {
            }
        });
    })

    $("#end").click(function(){//隐藏添加栏
        $(".placeAdd").css({
            "display":"none"
        });
    });

    //添加地址
    $("#address").click(function(){
        var recipients = $("#recipients").val();
        var street= $("#street").val();
        var phone= $("#phone").val();
        var text =`收件人:${recipients}地址:${shen}省${si}区${qu}${street}联系电话:${phone}`
        $.ajax({
            url:`http://${location.hostname}/ccobj2/php/site.php`,
            data:{
                username,
                "addressee":recipients,
                "province":shen,
                "area":si,
                "street":qu,
                phone
            },
            dataType:"json",
            success:({code,msg})=>{
                if(code){
                    layer.msg(msg);
                    //刷新地址
                    showsite();
                }else{
                    layer.msg(msg);
                }
            }
        })
    });


    $("#add").click(function () {//打开地址隐藏
        $(".placeAdd").css({
            "display":"block"
        })

    });
    //修改地址
    $("#updata").click(function () {
        console.log(123);

    });
    //删除地址
    $("#det").click(function () {
        var text = $("#contSite").val();
        $.ajax({
            url:`http://${location.hostname}/ccobj2/php/deleteSite.php`,
            data:{
                username,
                "site":text
            },
            dataType:"json",
            success:({code,msg})=>{
                if(code){
                    layer.msg(msg);
                    //刷新地址
                    showsite();
                }else{
                    layer.msg(msg);
                }
            }
        });

    });


    $.ajax({//三级联动
        url: `http://api.yytianqi.com/citylist/id/2`,
        dataType: "json",
        success: (data) => {
            var provinceList = resetData(data);//数据源
            var cityList;
            showList($('#province'), provinceList, '<option>省份/直辖市</option>');//刷新省数据
            $("#province").change(function () {
                var cityId = $(this).val()//拿到省代码 用于查市
                cityList = provinceList.filter(({ city_id }) => city_id === cityId)[0].list;
                // console.log(cityId);
                showList($('.city'), cityList, '<option>--城市--</option>');//刷新市
                if (cityId === "CH099" || cityId === "CH098") {
                    // console.log(123);

                    $("#area").css({
                        "display": "none"
                    });
                } else {
                    $("#area").css({
                        "display": "inline"
                    })
                }


            });
            $(".city").change(function () {
                var area = $(this).val()//拿到市代码 用于查区  
                var areaList = cityList.filter(({ city_id }) => city_id === area)[0].list;
                showList($('.area '), areaList, '<option>--区/县--</option>');//刷新区

            })


        }
    });
    function resetData(result) {//重置数据
        var { list } = result;
        var zxs = list.filter(({ city_id }) => city_id == "CH01" || city_id == "CH02" || city_id == "CH03" || city_id == "CH04");
        var xzq = list.filter(({ city_id }) => city_id == "CH33" || city_id == "CH32");
        var [, , , , ...src] = list;
        src = src.filter(({ city_id }) => city_id != "CH33" && city_id != "CH32");
        var pro = {
            "city_id": "CH099",
            "name": "直辖市",
            "en": "",
            "list": zxs
        }
        var tb = {
            "city_id": "CH098",
            "name": "特别行政区",
            "en": "",
            "list": xzq
        }
        src.push(pro, tb);
        return src;
    }

    function showList(ele, list, text) {//刷新列表
        var html = text;
        list.forEach(({ name, city_id }) => {
            html += `<option  value="${city_id}">${name}</option>`
        });
        // list
        ele.html(html);
    }

    function showsite(){//刷新地址
        console.log(username);
        
        $.ajax({
            url:`http://${location.hostname}/ccobj2/php/selectSite.php`,
            data:{
                username
            },
            dataType:"json",
            success:({code,data})=>{
                if(code==1){
                    var html=``;
                    data.forEach(({siteg})=>{
                        html+=`
                        <option value="${siteg}">${siteg}</option>
                        `;
                    });
                    console.log(html);
                    
                    $("#contSite").html(html);
                }
            }
        })
    }
    // $("#contSite").change(function(){
    //     $("#resume").text($(this).val());
    // })

})





