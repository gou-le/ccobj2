// 设置cookie
// 删除cookie
// 获取cookie列表
// 读取指定cookie


function setCookie(name, content, iDay = 7) {
    var date = new Date();
    var day = date.getDate();
    var houre = date.getHours();
    date.setHours(houre - 8);
    date.setDate(iDay + day);
    document.cookie = `${name}=${content};path=/;expires=${date}`;
}
function removeCookie(name) {
    setCookie(name, '', -1);
}
function getCookies() {
    var list = document.cookie;
    list = list.split("; ");
    list = list.map(itme => {
        return {
            name: itme.split('=')[0],
            content: itme.split('=')[1]
        }
    })
    return list;
}
function getCookie(name) {
    var list = getCookies(name);
    var src = list.filter(itme => itme.name === `${name}`)[0];
    if (src) {
        return src.content;
    }
    return '';
}

export{
    setCookie,
    removeCookie,
    getCookies,
    getCookie
}