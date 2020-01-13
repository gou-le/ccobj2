
// $("#but").click(function(){
//     var name = $("#name").val();
//     var pwd = $("#pwd").val();
//     var jonpwd = $("#pwdRton").val();
//     var mtipName = judgeUser(name);
//     var mtipPwd = judgePwd(pwd);
//     var mitpJonPwd = judgeRepwd(pwd,jonpwd);
//         // console.log(mtipName,mtipPwd,mitpJonPwd);
//         if(mtipName){}
// });

function judgeUser(name) {//判断用户名  
    // console.log(srcUser.value);
    var srcUser = /^[a-zA-Z]\w{5,19}$/;
    if (srcUser.test(name)) {
        return 1;//成功
    } else {
       return false;//失败

    }
}


function judgePwd(pwd) {
    var flag = false;//存放密码等级 0表示错误 1弱 2中 3强
    if (pwd.match(/[0-9]/) && pwd.length >= 6 && pwd.length <= 12) {
        flag++;
    }
    if (pwd.match(/[a-z]/) && pwd.length >= 6 && pwd.length <= 12) {
        flag++;
    }
    if (pwd.match(/[A-Z]/) && pwd.length >= 6 && pwd.length <= 12) {
        flag++;
    }
    return flag;
}


function judgeRepwd(pwd,jonpwd) {//判断两次输入密码是否相同 返回0表示不同 1表示相同
    if (jonpwd.length < 6) {
        return false;
    }
    if (jonpwd == pwd) {
       return 1;
    } else {
       return false;
    }
}

export{
    judgeRepwd,
    judgePwd,
    judgeUser
}