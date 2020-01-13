// import {ajax} from'./ajax.js';
var base = `http://${hostname}/1219php/`;
function request(path, data, type = "get") {
    return new Promise(function (resolve, reject) {
        // ajax({
        //     path,
        //     data,
        //     type,
        //     succeedCB: data => {
        //         resolve(data);
        //     }
        // });
        $.ajax({
            url:path,
            data,
            dataType:"json",
            success:function(data){
                resolve(data);
            }
        })
    });
}

var APIUserRegister = params => request(`${base}user-register.php`, params);
var APIUserLong = params => request(`${base}register.php`,params);
var APIShopping = params => request(`http://localhost/19121221/imgList.php`,params);
export{
    APIUserRegister,
    APIUserLong,
    APIShopping
}