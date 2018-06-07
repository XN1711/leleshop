<template>
    <div>
        <div class="outer-swiper">
         <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goBack"></a>
            <div class="swiper">
               <my-swipe :cid="pid"></my-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{prodInfo.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{prodInfo.market_price}}</s> 销售价：<span>￥{{prodInfo.sell_price}}</span></li>
            <!-- 购物车1.给购买数量添加加减函数,并设置数量为变量 -->
                <li class="number-li">购买数量：<span @click="substract">-</span><span>{{num}}</span><span @click="add">+</span></li>
                <li>
                <!-- 购物车2.给加入购物车添加函数addShopcart -->
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <!-- 小球的飞入1 -->
            <transition name="ball" @after-enter="afterEnter">
                <div class="ball" v-if="isShow"></div>
            </transition>

        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{prodInfo.goods_no}}</li>
                <li>库存情况：{{prodInfo.stock_quantity}}件</li>
                <li>上架时间：{{prodInfo.add_time | convertDate}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>  <!-- 图文介绍一 -->
                    <mt-button type="primary" size="large" plain @click="showPicInfo">图文介绍</mt-button>
                </li>
                <li>  <!-- 商品评论2 -->
                    <mt-button type="danger" size="large" plain @click="showProdComment">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
//商品数量和本地存储1 引入prod工具对象
import prodTools from '../common/prodTools.js';
//购物车3.引入连接器
import connect from '../common/connect.js';
    export default {
        //不发送请求的方式
        data(){
            return{
                isShow:false,//控制小球是否显示
                imgs:[],//缩略图数组
                prodInfo:{}, //商品信息
                pid:this.$route.query.id,//具体哪个商品
                num:1//添加购物车的商品数量
            }
        },created(){
            this.prodInfo.title=this.$route.query.title;
            this.prodInfo.market_price=this.$route.query.market_price;           
            this.prodInfo.sell_price=this.$route.query.sell_price;
            this.prodInfo.goods_no=this.$route.query.goods_no;   
            this.prodInfo.stock_quantity=this.$route.query.stock_quantity;
            this.prodInfo.add_time=this.$route.query.add_time; 
        },methods:{
                //返回
            goBack(){
                    this.$router.go(-1); //根据浏览器记录返回上一次
            },
            //购物车4.购物函数substract、add、addShopcart
            //购物数量减减 如果减到等于一不再减
            substract(){
                if( this.num<=1) return;
                this.num--;
            },
            add(){//购物数量加加 如果加到等于库存就不再加
                if(this.num>=this.prodInfo.stock_quantity) return;
                this.num++;
            },addShopcart(){
            //通过连接器中的addShopcart线连接来发送消息this.num
                console.log('开始emit');
                connect.$emit('addShopcart',this.num);

                //小球的飞入2，插入ball这个小球元素
                this.isShow = true;

                //商品数量和本地存储2 调用工具对象来添加商品
                prodTools.addOrUpdate({
                    id:this.$route.query.id,
                    num:this.num
                }),
                //商品数量和本地存储3 测试最终数据
                console.log(prodTools.getProds());  //如输出Object {1: 1, 2: 4, undefined: 5}  表示id为1的商品购买数量为1，id为2的商品购买数量为4
            },
            //小球的飞入3 处理过渡效果进入之后的行为afterEnter 结束后
            afterEnter(){
                this.isShow = false;//移除元素
            },
            //商品评论2
            showProdComment(){
                //先获取当前商品id
                let id = this.$route.query.id;
                //编程导航
                this.$router.push({
                    name:'goods.comment',
                    query:{ id } //路由参数id
                });
            },
            //图文介绍2
            showPicInfo(){
                let id = this.$route.query.id;
                let add_time = this.prodInfo.add_time;
                let click = 5;
                let content = "斗破苍穹";
                //编程导航
                this.$router.push({
                    name:'goods.pictureInfo',
                    query:{ id,add_time,click,content } //路由参数id
                });
            }
        }      

    }
</script>
<style scoped>
/* 小球的飞入4 初始位置 由于动画保持结束状态无法实现forward即不能结束时在购物车哪里，只能让小球初始位置就在购物车那里 */
.ball[data-v-2f3dc981]{
   top: 610px;
   left: 220px;
}
/* 小球的飞入5 执行动画 */
.ball-enter-active{
    animation: bounce-in 0.5s;
}
/* 小球的飞入6 动画名 */
  @keyframes bounce-in {
    0% {
        /* 3d流畅性好一些 */
        transform: translate(-70px, -230px);
    }
    50% {
        transform: translate(-10px, -260px);
    }
    100% {
        transform: translate(0px, 0px);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
.mui-action-back{
    position: absolute;
    top: 32px;
}
</style>
