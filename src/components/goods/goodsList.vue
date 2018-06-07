<template>
<!-- 1.需求是这样的:当走到最后一张图片底部时,再上拉才开始计算上拉距离出发刷新,而不是没走到底部就上拉执行上拉函数。
2.加载组件规则说明:当下拉到子盒子loadmore的底部与父盒子底部重叠就会触发函数
3.错误说明:在加载全部图片而没给类tmpl设置高度时,通过浏览器控制台查看到整个下拉刷新盒子class="mint-loadmore的高为885" ，而其外层tmpl的高为841，两个之差刚好是商品列表的高-，
也就是说不管子盒子loadmore多高,父盒子永远比它多44并和它底部重叠,这时候只要一上拉就会触发上拉函数而不是走到图片底部才触发，这种不符合需求
4..实现说明:需要将子盒子loadmore突出底部，不与父盒子底部重叠，那么tmpl的高度应为 设备宽度647-表头(传值管理系统)40-底部选项卡50=557,这时候父盒子的高度是固定的,而子盒子比父盒子高度高并突出底部,
那么只有下拉走到子盒子底部，才会和父盒子底部重叠,这时候上拉一段距离就会触发
-->
    <div class="tmpl" style="height:577px;">
        <nav-bar title="商品列表" ></nav-bar>
<!-- //这里只做上啦加载更多bottom-method,需要下拉加载就再添加top-method="loadTop"，设置一个mt-loadmore标签，ul数据列表放在里面,当数据加载完毕时是，设置allLoaded值为fure，auto-fill是否自动触发上啦函数-->
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
    <!-- 上啦完毕调用该元素的onBottomLoaded函数， -->
        <ul class="mui-table-view mui-grid-view">
            <li v-for="prod in prods" :key="prod.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                <router-link :to="{name:'goods.detail',query:{id:prod.id,title:prod.title,market_price:prod.market_price,sell_price:prod.sell_price,goods_no:prod.goods_no,stock_quantity:prod.stock_quantity,add_time:prod.add_time} }">
                    <img class="mui-media-object" :src="prod.img_url">
                    <div class="mui-media-body">{{prod.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{prod.sell_price}}</span>
                            <s>￥{{prod.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{prod.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link :to="{name:'goods.detail'}">
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
export default {
    data(){ //不发送请求
        return{
            pageIndex:1,//页码
            prods:[//商品列表数据
    {id:1,pageIndex:1,title:"华为手机",add_time:"2018-01-01T16:15:01.00Z",click:1,img_url:require("../../static/img/good1.jpg"),sell_price:5195,stock_quantity:60,market_price:4512,goods_no:"A1"},
    {id:2,pageIndex:1,title:"联想手机",add_time:"2018-02-01T16:15:01.00Z",click:2,img_url:require("../../static/img/good2.jpg"),sell_price:4335,stock_quantity:55,market_price:4512,goods_no:"A2"},
    {id:3,pageIndex:1,title:"小米手机",add_time:"2018-03-01T16:15:01.00Z",click:3,img_url:require("../../static/img/good3.jpg"),sell_price:2545,stock_quantity:50,market_price:4512,goods_no:"B1"},
    {id:4,pageIndex:1,title:"中兴手机",add_time:"2018-04-01T16:15:01.00Z",click:4,img_url:require("../../static/img/good4.jpg"),sell_price:1235,stock_quantity:45,market_price:4512,goods_no:"B2"},
    {id:5,pageIndex:1,title:"vivo手机",add_time:"2018-05-01T16:15:01.00Z",click:5,img_url:require("../../static/img/good5.jpg"),sell_price:3435,stock_quantity:40,market_price:4512,goods_no:"C1"},
    {id:6,pageIndex:1,title:"oppo手机",add_time:"2018-06-01T16:15:01.00Z",click:6,img_url:require("../../static/img/good6.jpg"),sell_price:1235,stock_quantity:35,market_price:4512,goods_no:"C2"},
    {id:7,pageIndex:2,title:"苹果手机",add_time:"2018-07-01T16:15:01.00Z",click:7,img_url:require("../../static/img/good7.jpg"),sell_price:6595,stock_quantity:30,market_price:4512,goods_no:"D1"},
    {id:8,pageIndex:2,title:"三星手机",add_time:"2018-08-01T16:15:01.00Z",click:8,img_url:require("../../static/img/good8.jpg"),sell_price:2195,stock_quantity:25,market_price:4512,goods_no:"D2"},
    {id:9,pageIndex:2,title:"诺基亚手机",add_time:"2018-09-01T16:15:01.00Z",click:9,img_url:require("../../static/img/good9.jpg"),sell_price:4595,stock_quantity:20,market_price:4512,goods_no:"E1"},
    {id:10,pageIndex:2,title:"联想手机",add_time:"2018-10-01T16:15:01.00Z",click:10,img_url:require("../../static/img/good10.jpg"),sell_price:5495,stock_quantity:15,market_price:4512,goods_no:"E2"},
    {id:11,pageIndex:2,title:"华为手机",add_time:"2018-01-01T16:15:01.00Z",click:1,img_url:require("../../static/img/good1.jpg"),sell_price:5195,stock_quantity:60,market_price:4512,goods_no:"E3"},
    {id:12,pageIndex:2,title:"联想手机",add_time:"2018-02-01T16:15:01.00Z",click:2,img_url:require("../../static/img/good2.jpg"),sell_price:4335,stock_quantity:55,market_price:4512,goods_no:"E4"},
    {id:13,pageIndex:3,title:"小米手机",add_time:"2018-03-01T16:15:01.00Z",click:3,img_url:require("../../static/img/good3.jpg"),sell_price:2545,stock_quantity:50,market_price:4512,goods_no:"F1"},
    {id:14,pageIndex:3,title:"中兴手机",add_time:"2018-04-01T16:15:01.00Z",click:4,img_url:require("../../static/img/good4.jpg"),sell_price:1235,stock_quantity:45,market_price:4512,goods_no:"F2"},
    {id:15,pageIndex:3,title:"vivo手机",add_time:"2018-05-01T16:15:01.00Z",click:5,img_url:require("../../static/img/good5.jpg"),sell_price:3435,stock_quantity:40,market_price:4512,goods_no:"G1"},
    {id:16,pageIndex:3,title:"oppo手机",add_time:"2018-06-01T16:15:01.00Z",click:6,img_url:require("../../static/img/good6.jpg"),sell_price:1235,stock_quantity:35,market_price:4512,goods_no:"G2"},
    {id:17,pageIndex:3,title:"苹果手机",add_time:"2018-07-01T16:15:01.00Z",click:7,img_url:require("../../static/img/good7.jpg"),sell_price:6595,stock_quantity:30,market_price:4512,goods_no:"H1"},
    {id:18,pageIndex:3,title:"三星手机",add_time:"2018-08-01T16:15:01.00Z",click:8,img_url:require("../../static/img/good8.jpg"),sell_price:2195,stock_quantity:25,market_price:4512,goods_no:"H2"},
    {id:19,pageIndex:4,title:"诺基亚手机",add_time:"2018-09-01T16:15:01.00Z",click:9,img_url:require("../../static/img/good9.jpg"),sell_price:4595,stock_quantity:20,market_price:4512,goods_no:"I1"},
    {id:20,pageIndex:4,title:"联想手机",add_time:"2018-10-01T16:15:01.00Z",click:10,img_url:require("../../static/img/good10.jpg"),sell_price:5495,stock_quantity:15,market_price:4512,goods_no:"I2"},
            ],
            allLoaded:false, //是否禁止触发上拉函数loadBottom()函数
            isAutoFill:false,//是否自动触发上拉函数 如果为true 页面加载时会第一次调用loadBottom()函数
            cache:[], //不管加载到哪一页，缓存数据永远是原来 prods全部数据
            cookie:[]  //所有已加载的数据
        }
    },created(){
        this.cache=this.prods;
        this.loadMore();
    },methods:{
        loadMore(){ //初始化加载
                let arr = [];
                this.cache.forEach(function(val,index){ //发现data()里的数据不能直接在函数里获取->不能直接(val.comment_id==this.cid
                     if(val.pageIndex==1){ 
                        arr.push(val);
                     }
                });
                this.prods=arr;
                this.cookie=arr;
        },loadBottom(){ //上拉加载
            console.log('上拉触发了');
            this.loadmoreConcat();
        },loadmoreConcat(){ //追加数据
                let arr2 = [];
                //1.获取新一页数据
                this.pageIndex=this.pageIndex+1;
                let nextpage = this.pageIndex;
                this.cache.forEach(function(val,index){ 
                     if(val.pageIndex==nextpage){ 
                        arr2.push(val);
                     }
                 });
                //2.拼接原有已加载数据
                 for (let i=0; i < arr2.length; i++) { 
                    this.cookie.push(arr2[i]);  
                 }
                 this.prods=this.cookie;
                 //3.通知上拉操作已经完结  等待下一次上拉 在tempplate中需要加ref="loadmore" 如果没有这里,有时候上拉时可能无法拉动
                 this.$refs.loadmore.onBottomLoaded();
                 //4.判断数据是否加载完毕 如果已加载的数据长度=全部数据长度，说明已经加载完毕
                 console.log(this.cache.length,this.cookie.length);
                 if(this.cache.length==this.cookie.length){
                   this.allLoaded = true;//数据加载完毕,禁用上拉函数
                 }
        }
    }

    /* 2.发送请求时
    data(){
        return {
            pageIndex:1,//页码
            prods:[],//商品列表数据
            allLoaded:false, //是否禁止触发上拉函数
            isAutoFill:false,//是否自动触发上拉函数
        }
    },
    created(){
       this.loadMore();//1
    },
    methods:{
        loadBottom(){
            //console.log('上啦触发了');
            this.loadmoreConcat();
        },
        loadMore(){
             //发起请求获取数据填充到页面
            this.$ajax.get('getgoods?pageindex=1')
            .then(res=>{
                this.prods = res.data.message;
            })
            .catch(err=>{
                console.log(err);
            });
        }, //追加数据
        loadmoreConcat(){
             this.$ajax.get('getgoods?pageindex='+ (++this.pageIndex))
            .then(res=>{
                this.prods = this.prods.concat(res.data.message);
                // console.log(this.$refs.loadmore.onBottomLoaded());
                //判断是否还有数据
                if(res.data.message.length != 10){
                    //数据不到10条，就是剩余的所有了
                    this.allLoaded = true;//禁止调用上拉函数了
                }
                // 通知上啦操作已经完结
                this.$refs.loadmore.onBottomLoaded();

            })
            .catch(err=>{
                console.log(err);
            })
        }
    }*/
}

</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span { /* 价格 */
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot { /* 热卖中 */
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count { /* 剩余 */
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/
.detail {
    overflow: hidden;
}

.desc { /* 价格、剩余、热卖部分盒子 */
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
