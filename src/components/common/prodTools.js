
//prods通过通过获取本地存储数据的方式,那么就算页面,依然是在是在以有数据上更新,如果想回到0,就把prods设置为空对象再刷新页面

let prodTools = {};
let store = window.localStorage; //本地存储数据
let prods = JSON.parse(store.getItem('prods')||'{}');//从localStorage本地中获取所有商品数据 ||'{}'就是让它在本地没有数据时是一个空对象
//{  id:num }
//增加或追加
prodTools.addOrUpdate = function(p){ //p就是传过来的添加到购物车的商品就有id和当前购买数量的这一对象
    //如果当前商品存在,即之前已经将该商品加入过购物车
    if(prods[p.id]){//追加
        prods[p.id] += p.num;
    }else{
        prods[p.id] = p.num; 
    }
    //保存
    this.saveProds(prods);
}
//删除
prodTools.delete = function(id){
  delete prods[id];
  //保存
  this.saveProds(prods);
}
//获取到storage
prodTools.getProds = function(){
    return JSON.parse(store.getItem('prods')||'{}');
}
//获取总数
prodTools.getTotalCount = function(){
    let sum = 0;
    for(let id in prods){
        sum += prods[id]; 
    }
    return sum;
}
//存储
prodTools.saveProds = function(prods){ 
    store.setItem('prods',JSON.stringify(prods));//将最新的prods所有商品数据重新存储到本地中
}
export default prodTools;