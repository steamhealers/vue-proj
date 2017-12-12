export function getData() {
    return JSON.parse(localStorage.getItem('goodslist') || '[]')
}

export function setData(json) {
    let data = getData()
    console.log(data);
    let hasdata = false
    data.forEach(element => {
        if (element.id == json.id) {
            hasdata = true
            element.count += json.count
        }
    });
    if (!hasdata) {
        data.push(json)
    }
    localStorage.setItem('goodslist', JSON.stringify(data))
}

export function upData(json){
    let data = getData()
    data.forEach(element=>{
        if(element.id==json.id){
            element.count=json.count
        }
    })    
    localStorage.setItem('goodslist', JSON.stringify(data))
}