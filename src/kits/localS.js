export const KEY = 'goodsdata';
export var valueObj = {goodsid:0,count:0};

// 2.0 实现数据的增加
// value;格式： {goodsid:87,count:10}
export function setItem(value){
    //1.0 获取json格式
    var jsonString =  localStorage.getItem(KEY);
    jsonString = jsonString || '[]';
    var arr =   JSON.parse(jsonString);
    // 2.0 将value追加进入arr
    arr.push(value);
    // 3.0 将arr 转换成json字符串保存起来
    localStorage.setItem(KEY,JSON.stringify(arr));
}

// 3.0 获取数据=
export function getItem(){
   var jsonString =  localStorage.getItem(KEY);
//    将json格式字符串转换成 js对象
    // jsonString：是一个标准的json格式
    jsonString = jsonString || '[]';

    return JSON.parse(jsonString);
}

export function getgoodsObject(){
    var arr = getItem();
    var resObj = {};
    for(var i =0 ; i<arr.length;i++){
        var item = arr[i];
        if(!resObj[item.goodsid]){
            resObj[item.goodsid] = item.count;
        }else{
            var count = resObj[item.goodsid];
            resObj[item.goodsid] = count + item.count;
        }
    }
    return resObj;
}

export function updateData(obj){
    var arr = getItem();
    var count = 1;
    if(obj.type == 'add'){
        arr.push({goodsid:obj.goodsid,count:count})
    }else{
        for(var i=0 ; i<arr.length;i++){
             if(arr[i].goodsid == obj.goodsid){
                if(arr[i].count > 1 ){
                    arr[i].count = arr[i].count -1;
                    break;
                }else{
                    arr.splice(i,1);
                    break
                }
            }
        }
    }
    localStorage.setItem(KEY,JSON.stringify(arr));
}

export function removeItem(goodsid){
    var arr = getItem();
    for(var i=arr.length-1;i>=0;i--){
        if(arr[i].goodsid == goodsid){
            arr.splice(i,1);
        }
    }
    localStorage.setItem(KEY,JSON.stringify(arr));
}