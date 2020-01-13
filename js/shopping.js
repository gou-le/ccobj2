layui.use('layer', function(){
    // var layer = layui.layer;
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
            
            }else{
                $("#login").click(function(){//登录
                    sessionStorage.setItem("src",location.href);
                    location.href="./login.html";
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
                sessionStorage.removeItem("name");
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
        $(".footer ").load("footer.html")
    });


    var username = sessionStorage.getItem("name");
    // console.log(username);
    showlist();
    
    $("#shoppingList").on("click","#add",function(){//+
        var pan = $(this).prev();
        var cnt = pan.text();
        cnt++;
        pan.text(cnt);
        showPriceLine(pan,cnt);
        showtoto();
    });
    $("#shoppingList").on("click","#subtract",function(){ //-
        var pan = $(this).siblings(".num");
        var cnt = pan.text();
        if(cnt>0){
            cnt--;
            pan.text(cnt);
            showPriceLine(pan,cnt);
        }  
        showtoto();
    });
    function showPriceLine(cnt,num){//计算中和函数
        var parent =cnt.parent();
        var nextparent = parent.next();
        var price = nextparent.children("#price_span");
        var daPrice =price.text(); //单价
        var total = cnt.parent().nextAll(".total").children("#total_span");
        total.text(daPrice*num);
    }
    
    $(".all").click(function(){//全选  
        $('.inputc').prop('checked', $(this).prop('checked'));
        //计算函数
        showtoto();
        
    });
    $('#shoppingList').on('change','.inputc',function() {//单选
        if ($('.inputc:checked').length === $('.inputc').length) {
            $('.all').prop('checked', true);
            showtoto();
            
        } else {
            $('.all').prop('checked', false);
            showtoto();
            
        }
    });
    $("#shoppingList").on('click','.delete',function(){//删除商品
         var goodid=$(this).attr("goodid");
    
        $(this).click(function(){
            $.ajax({
                url:`http://${location.hostname}/ccobj2/php/deleteShopping.php`,
                data:{
                    username,
                    goodid
                }
                ,dataType:"json",
                success:({code,msg})=>{
                    if(code){
                        layer.msg(msg);
                    }else{
                        layer.msg(msg);
                    }
                }
            })
            var parent = $(this).parent().parent();
            parent.remove();
            
            
        });
     
    });
   


    $("#jieshuan").on("click","#settle",function(){//结账
        var img,goodname,color,size,num,price,goodid,sums,pricesum;
        console.log("测试");
        for(var i=0;i<$("[class=inputc]").length;i++){
            if($($("[class=inputc]")[i]).prop("checked")){//判断复选框是否被选中
                console.log(1);
                
                var ele =$($("[class=inputc]")[i]);
                img=ele.next().attr("src");
                goodname=ele.parent().next().text();
                color = ele.parent().nextAll(".colorbox").children("#goodsColor_select").attr("data_color");
                size = ele.parent().nextAll(".size").children("#goodsColor_size").attr("data_size");
                num=ele.parent().nextAll(".doogNum ").children(".num").text();
                price = ele.parent().nextAll(".price").children("#price_span").text();
                goodid= ele.parent().nextAll(".total").children(".delete").attr("goodid");
                sums=ele.parent().nextAll(".total").children("#total_span").text();
                pricesum=$("#priceall").text();
                if(size&&color){
                    $.ajax({
                        url:`http://${location.hostname}/ccobj2/php/indent.php`,
                        data:{
                            img,
                            goodname,
                            color,
                            size,
                            num,
                            price,
                            username,
                            goodid,
                            sums,
                            pricesum
                        },
                        dataType:"json",
                        success:({code,msg})=>{
                            if(code){
                                layer.msg(msg,function(){
                                    location.href ="./account.html";
                                });
                                
                            }
                            
                        },
                        error:()=>{
                            layer.msg('添加失败请完善你的订单');
                            
                        }
                    });
                }else{
                    layer.msg('添加失败请完善你的订单');
                }
            }else{
                console.log(0);
                
                layer.msg('请勾选你要购买的商品');
            }
           
        }
        
        
        
    });
   
    function showtoto(){ //刷新总金额
        list=$(".inputc");
        var price=0;
        var num=0;
        var sun;
        var a=0;
        for(var i=0;i<list.length;i++){
            if(list[i].checked){
                price = $( list[i]).parent().nextAll(".price").children("#price_span").text();
                var num = $( list[i]).parent().nextAll(".doogNum ").children(".num").text();
                sun=$( list[i]).parent().nextAll(".total").children("#total_span")
                sun.text(price*num)  
    
                a+=parseInt(sun.text());
                // console.log(a); 
            }else{
                $( list[i]).parent().nextAll(".total").children("#total_span").text(0);   
            }
            
        }
        $("#priceall").text(a);
        $("#oughtPrice").text(a);
    }
    
    function showlist(){ //刷新购物车
        $.ajax({
            url:`http://${location.hostname}/ccobj2/php/selectShopping.php`,
            data:{
                username
            },
            dataType:"json",
            success:({data,code})=>{
                if(code==1){
                   
                    var html='';
                    data.forEach(({color,doogname,img,num,price,size,goodid})=>{
                        html +=`
                        <td style="width: 100%; display: block;">
                        <div class="" style="margin:10px 0;height: 152px;">
                            <div class="srcimg ">
                                <input class="inputc" type="checkbox" style="display: block; width: 15px;height: 15px; float: left; margin-top: 75px;margin-left: 55px;">
                                <img style="width: 100px;height: 150px;float: left;display: block;" src=${img} alt="">
                            </div>
                            <div class="doogtext">${doogname}</div>
                            <div class="doogColor colorbox">
                                <select  id="goodsColor_select" style=" width: 130px;
                                height: 28px;">
                                <option>--请选择颜色--</option>
                                    <option value="${color}">${color} </option>
                                    <option value="${color}">${color} </option>
                                </select>
                            </div>
                            <div class="doogColor size">
                                <select  id="goodsColor_size" style=" width: 130px;
                                height: 28px;">
                                <option>--请选择尺码--</option>
                                    <option value=${size}>${size}</option>
                                    <option value=${size}>${size}</option>
                                </select>
                            </div>
                            <div class="doogColor doogNum ">
                                <div class="num">${num}</div>
                                <span  id="add">+</span>
                                    <span id="subtract">-</span>
                            </div>
                            <div class="doogColor price">
                                <span>￥:</span>
                                <span id="price_span">${price}</span>
                            </div>
    
    
                            <div class="doogColor total">
                                <span>￥:</span>
                                <span id="total_span">0</span>
                                <div class="delete" goodid=${goodid} style=" width: 120px;height: 30px;border: 1px solid silver;margin-top: 70px;text-align: center;line-height: 30px;font-size: 16px;">从购物车里移除</div>
                            </div>
                        </div>
                        
                    </td>
                        `
                    });
                    // console.log(html);
                    $("#shoppingList").html(html);
                    $(".size").on("change","#goodsColor_size",function(){
                        $(this).attr("data_size",$(this).val());
                        
                    });//吧值存放data_size上面

                    $(".colorbox").on("change","#goodsColor_select",function(){
                        $(this).attr("data_color",$(this).val());
                        console.log(  $(this).attr("data_color"));
                        
                    });//吧值存放data_select上面
                }
                
            }
            
        });
       
    
    }
   
});   




