<template>
    <div class="tmpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
            <!-- 购物车1.遍历商品 -->
                <li v-for="(goods,index) in goodsList" :key="goods.id"  class="p-list">
                <!-- 购物车2.是否选中开关 -->
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <img :src="goods.img_url">
                    <div class="pay-calc">
                        <p v-text="goods.title"></p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <!-- 购物车3.加、减、删除函数 -->
                            <span @click="sub(index)">-</span>
                            <span >{{goods.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <!-- 购物车4.总价变量 -->
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
//购物车1.引入商品操作工具对象
import prodTools from '../common/prodTools.js';
//购物车2.通知底部变更数据
import connect from '../common/connect.js';
export default {
//发送请求的方式
    data(){
        return {
            //购物车5.商品数组数据
            goodsList:[
    {id:1,pageIndex:1,title:"华为手机上事实上",add_time:"2018-01-01T16:15:01.00Z",click:1,img_url:require("../../static/img/good1.jpg"),sell_price:5195,stock_quantity:60,market_price:4512,goods_no:"A1"},
    {id:2,pageIndex:1,title:"联想手机对对对",add_time:"2018-02-01T16:15:01.00Z",click:2,img_url:require("../../static/img/good2.jpg"),sell_price:4335,stock_quantity:55,market_price:4512,goods_no:"A2"},
    {id:3,pageIndex:1,title:"小米手机的覆盖对",add_time:"2018-03-01T16:15:01.00Z",click:3,img_url:require("../../static/img/good3.jpg"),sell_price:2545,stock_quantity:50,market_price:4512,goods_no:"B1"},
    {id:4,pageIndex:1,title:"中兴手机啊啊去对",add_time:"2018-04-01T16:15:01.00Z",click:4,img_url:require("../../static/img/good4.jpg"),sell_price:1235,stock_quantity:45,market_price:4512,goods_no:"B2"},
    {id:5,pageIndex:1,title:"vivo手机看看",add_time:"2018-05-01T16:15:01.00Z",click:5,img_url:require("../../static/img/good5.jpg"),sell_price:3435,stock_quantity:40,market_price:4512,goods_no:"C1"},
    {id:6,pageIndex:1,title:"oppo手机这款",add_time:"2018-06-01T16:15:01.00Z",click:6,img_url:require("../../static/img/good6.jpg"),sell_price:1235,stock_quantity:35,market_price:4512,goods_no:"C2"},
    {id:7,pageIndex:2,title:"苹果手机于洋洋",add_time:"2018-07-01T16:15:01.00Z",click:7,img_url:require("../../static/img/good7.jpg"),sell_price:6595,stock_quantity:30,market_price:4512,goods_no:"D1"},
    {id:8,pageIndex:2,title:"三星手机对对对",add_time:"2018-08-01T16:15:01.00Z",click:8,img_url:require("../../static/img/good8.jpg"),sell_price:2195,stock_quantity:25,market_price:4512,goods_no:"D2"},
    {id:9,pageIndex:2,title:"诺基亚手机对对对",add_time:"2018-09-01T16:15:01.00Z",click:9,img_url:require("../../static/img/good9.jpg"),sell_price:4595,stock_quantity:20,market_price:4512,goods_no:"E1"},
    {id:10,pageIndex:2,title:"联想手机对对对",add_time:"2018-10-01T16:15:01.00Z",click:10,img_url:require("../../static/img/good10.jpg"),sell_price:5495,stock_quantity:15,market_price:4512,goods_no:"E2"},
    {id:11,pageIndex:2,title:"华为手机上事实上",add_time:"2018-01-01T16:15:01.00Z",click:1,img_url:require("../../static/img/good1.jpg"),sell_price:5195,stock_quantity:60,market_price:4512,goods_no:"E3"},
    {id:12,pageIndex:2,title:"联想手机对对对",add_time:"2018-02-01T16:15:01.00Z",click:2,img_url:require("../../static/img/good2.jpg"),sell_price:4335,stock_quantity:55,market_price:4512,goods_no:"E4"},
    {id:13,pageIndex:3,title:"小米手机的覆盖对",add_time:"2018-03-01T16:15:01.00Z",click:3,img_url:require("../../static/img/good3.jpg"),sell_price:2545,stock_quantity:50,market_price:4512,goods_no:"F1"},
    {id:14,pageIndex:3,title:"中兴手机啊啊去对",add_time:"2018-04-01T16:15:01.00Z",click:4,img_url:require("../../static/img/good4.jpg"),sell_price:1235,stock_quantity:45,market_price:4512,goods_no:"F2"},
    {id:15,pageIndex:3,title:"vivo手机看看",add_time:"2018-05-01T16:15:01.00Z",click:5,img_url:require("../../static/img/good5.jpg"),sell_price:3435,stock_quantity:40,market_price:4512,goods_no:"G1"},
    {id:16,pageIndex:3,title:"oppo手机这款",add_time:"2018-06-01T16:15:01.00Z",click:6,img_url:require("../../static/img/good6.jpg"),sell_price:1235,stock_quantity:35,market_price:4512,goods_no:"G2"},
    {id:17,pageIndex:3,title:"苹果手机于洋洋",add_time:"2018-07-01T16:15:01.00Z",click:7,img_url:require("../../static/img/good7.jpg"),sell_price:6595,stock_quantity:30,market_price:4512,goods_no:"H1"},
    {id:18,pageIndex:3,title:"三星手机对对对",add_time:"2018-08-01T16:15:01.00Z",click:8,img_url:require("../../static/img/good8.jpg"),sell_price:2195,stock_quantity:25,market_price:4512,goods_no:"H2"},
    {id:19,pageIndex:4,title:"诺基亚手机对对对",add_time:"2018-09-01T16:15:01.00Z",click:9,img_url:require("../../static/img/good9.jpg"),sell_price:4595,stock_quantity:20,market_price:4512,goods_no:"I1"},
    {id:20,pageIndex:4,title:"联想手机对对对",add_time:"2018-10-01T16:15:01.00Z",click:10,img_url:require("../../static/img/good10.jpg"),sell_price:5495,stock_quantity:15,market_price:4512,goods_no:"I2"},
            ],cache:[]
        }
    },created(){
        this.cache = this.goodsList;
        //购物车6.获取local的数据
        let prods = prodTools.getProds(); 
        var arr =[];
        this.cache.forEach((ele,index)=>{ //把所有商品数组对象里的id和本地存储对象里的键值对比,一致的说明是同一商品
            for (var key in prods) {
                if(key == ele.id){
                   arr.push(ele);
                }
            }
        })
        this.goodsList = arr;
        //购物车7.判断如果没有商品，return //访问没添加商品 依然点击购物车时,依然会去获取ajax数据造成数据获取失败,而显示加载中图标
        if(Object.keys(prods).length === 0)return;

        //购物车8.挂载数据到模板
        this.goodsList.forEach((ele,index)=>{
            if(prods[ele.id]){ //获取到数据基本上都有该商品id,所以这里只是好看点
                //在vue中添加属性，是没有办法做到响应，setter
                // ele.num = prods[ele.id];
                // ele.isPicked = true;
                //添加属性一定要this.$set
                this.$set(ele,'num',prods[ele.id]); //给数组的对象ele添加属性'num'值为prods[ele.id]
                this.$set(ele,'isPicked',true); //ele对应的是模板中遍历中的每个goods，那么设置ele.isPicked就相当于模板开关里的goods.isPicked
            }
        })
    },

/*不发送请求的方式
    data(){
        return {
            goodsList:[],//商品数组数据
        }
    },
    created(){
        //获取local的数据
        let prods = prodTools.getProds(); 

        //判断如果没有商品，return
        if(Object.keys(prods).length === 0)return;

        //prods{"87":4,"89":10,"93":11,"95":16}
        let url = 'goods/getshopcarlist/';
        url += Object.keys(prods).join(',');
        
        //发起请求，将数据挂上
        this.$ajax.get(url)
        .then(res=>{
            this.goodsList = res.data.message;
             //prods{"87":4,"89":10,"93":11,"95":16}   ele.id-> 87
            this.goodsList.forEach((ele,index)=>{
                if(prods[ele.id]){ //数量
                    //在vue中添加属性，是没有办法做到响应，setter
                    // ele.num = prods[ele.id];
                    // ele.isPicked = true;
                    
                    //添加属性一定要this.$set
                    this.$set(ele,'num',prods[ele.id]);
                    this.$set(ele,'isPicked',true);

                }
            })


        })
        .catch(err=>{
            console.log(err);
        })
    },*/
    methods:{
     //购物车9.加、减、删除函数
        add(i){
            this.goodsList[i].num++;
            connect.$emit('addShopcart',1);//通知购物车也跟着加1
            prodTools.addOrUpdate({
                id:this.goodsList[i].id,
                num:1, //如果存在，追加1，否则新增新购买商品的数量为1
            })


        },
        sub(i){
            if(this.goodsList[i].num<= 1) return;
            this.goodsList[i].num--;
             connect.$emit('addShopcart',-1);//加上-1就是减一
             prodTools.addOrUpdate({
                id:this.goodsList[i].id,
                num:-1, //如果存在，追加1，否则新增1
            })
        },
        del(i){
            //删除
            let goods = this.goodsList[i];
            //选中商品从storage中删除
            prodTools.delete(goods.id)
            //通知购物车数量跟着减
            connect.$emit('addShopcart',-goods.num);
            //删除内存
            this.goodsList.splice(i,1);
        }
    },
    //computed:的特点:  在模板中{{payment.num}} {{payment.sum}} 如果找不到payment这实例,那么就回去computed里找,而payment.num就是获取computed里的payment函数的num属性值
    computed:{
        payment(){
            // 1:如果商品没有被选中，遍历数组中，哪些商品有被选中，如果是
            // 2:计算总金额= 单价 * 件数
            // 3:将以上总金额累计
            // 4:如果是 +元素的num 件数 
            let num = 0;
            let sum = 0;
            this.goodsList.forEach((ele)=>{ //遍历所有购物车的商品
                if(ele.isPicked){ //被选中的商品
                    sum += ele.num * ele.sell_price;//总价
                    num += ele.num;//金额
                }
            })
            return {
                num,sum
            };
        }
    }
}



</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
