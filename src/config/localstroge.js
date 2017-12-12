export function getData() {
    return JSON.parse(localStorage.getItem('goodslist') || '[]')
}

export function setData(json) {
    let data = getData()
    console.log(data);
    let hasdata = false
    data.forEach(item => {
        if (item.id == json.id) {
            hasdata = true
            item.count += json.count
        }
    });
    if (!hasdata) {
        data.push(json)
    }
    localStorage.setItem('goodslist', JSON.stringify(data))
}

export function upData(json){
    let data = getData()
    data.forEach(item=>{
        if(item.id==json.id){
            item.count=json.count
        }
    })    
    localStorage.setItem('goodslist', JSON.stringify(data))
}

export function delData(id){
    let data = getData()
    data.forEach((item,index)=>{
        if(item.id==id){
            data.splice(index,1)
        }
    })    
    localStorage.setItem('goodslist', JSON.stringify(data))
}