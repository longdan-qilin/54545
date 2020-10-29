 // 3. 封装template函数
 function template(id, data) {
    // 获取定义模板的 html内容
    let str = $('#tpl-user').html()
    // 利用正则表达式 去掉花括号 只留下值  /{{\s*([\w]+)\s*}}/ = /{{\s*([a-zA-Z]+)\s*}}/
    let pattner = /{{\s*([\w]+)\s*}}/
    // 假设结果 没有匹配的值 返回空 null
     let pattResult = null
     console.log(str);
    // 那么依次遍历data的数据 依次替换里面的值 不确定字符串的长度因此只能用while循环
    while (pattResult = pattner.exec(str)) {
        console.log(pattResult);
        str = str.replace(pattResult[0], data[pattResult[1]])
     }
    
console.log(str);
    return str
}