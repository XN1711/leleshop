<template>
    <div>
        <!-- home也轮播图 -->
        <mt-swipe :auto="500" :speed="1000">
        <!-- 在mint-ui的swipe组件中有几张图片就有几个mt-swipe-item，所以遍历图片并用img:src显示图片，就能把图片放进轮播中显示，还可添加a标签，点击图片跳转 -->
          <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a :href="img.url"><img :src="img.img"></a></mt-swipe-item>
        </mt-swipe>
        <!-- home九宫格 -->
       <!-- 下面的整个div都是从九宫格组件模板grid-default.html里的template里复制过来的 -->
        <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <!-- 1：去哪里 -->
                        <router-link :to="{name:'news.list'}">
                            <span class="mui-icon mui-icon-home"></span>
                            <div class="mui-media-body">新闻资讯</div>
                        </router-link>
                    </li>
                    <!-- day4新增的路由 -->
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link :to="{ name:'photo.share'}">
                            <span class="mui-icon mui-icon-email"></span>
                            <div class="mui-media-body">图文分享</div>
                            </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link :to="{name:'goods.list'}">
                            <span class="mui-icon mui-icon-chatbubble"></span>
                            <div class="mui-media-body">商品展示</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                            <span class="mui-icon mui-icon-location"></span>
                            <div class="mui-media-body">留言反馈</div></a></li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                            <span class="mui-icon mui-icon-search"></span>
                            <div class="mui-media-body">搜索资讯</div></a></li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                            <span class="mui-icon mui-icon-phone"></span>
                            <div class="mui-media-body">联系我们</div></a></li>
                </ul> 
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
        //1.现在这里设置imgs属性，再在ajax返回数据后用this.imgs接收数据，最后再在轮播图中遍历v-for="(img,index) in imgs"，最后img.url和img.img就是message的属性值
        //2.由于获取的轮播图API数据已经不存在，如果需要，可以直接给imgs在这里设置
                imgs:[//轮播图列表
        //3.注意:如果我们直接在temeplate中设置图片相对路径 img src="../../static/img/lb1.png"  是可以加载图片的，打包后的路径就变为lb1.png，因为该图片在打包文件dist的下一层文件
        //4.而如果是在js中的imgs设置路径../../static/img/lb1.png，那么打包后的路径还是../../static/img/lb1.png，由于打包后的文件文件结构改变，这路径是找不到图片的
        //5.总结:在js中给页面设置路径,要用require，而给样式设置路径，就不要require如下面的background-image
                   {
                     url:"#",
                     img:require("../../static/img/lb1.png") //不能直接img:"../../static/img/lb1.png"
                   },
                   {
                     url:"#",
                     img:require("../../static/img/lb2.png")
                   },
                   {
                     url:"#",
                     img:require("../../static/img/lb3.png")
                   }
                ]
            }
        },
        created(){
            //6.如果不给上面的imgs设置，就需要在这里发送请求
            //发起请求
            // this.$ajax.get('getlunbo')
            /*获取的数据是这样的 不过现在该API已经不存在了
            {
               status: 0,
               message: [
                   {
                     url:"http://www.itcast.cn/subject/phonewb/index.html",
                     img: "http://....1.jpg"
                   },
                   {
                     url:"http://www.itcast.cn/subject/phonewb/index.html",
                     img: "http://....2.jpg"
                   }
               ]
            }*/
            // .then(res=>{
            //     console.log(res.data.message);
            //     this.imgs = res.data.message;
            // })
        }
    }
</script>
<style scoped>
/*轮播图样式*/
.mint-swipe{
    max-height:187px; 
}
/* 要想每张图片刚好满整个页面宽度，必须 */
.mint-swipe img {
    height: 100%;
    width: 100%;
}
/*九宫格样式*/
.mui-table-view.mui-grid-view.mui-grid-9{ /* 这里的类时ul标签类 */
    background-color: white; /* 九宫格复制过来后背景变成了灰色，同时原来的九宫格是有边框border和margin-top的，就可以改一下 */
     border: 0;
     margin-top: 0px;
}
.mui-table-view.mui-grid-view.mui-grid-9 li{ /* ul和li都要改边框 */
    border: 0;
}
/*九宫格清除字体图标*/ 
/* 每个li标签下的span标签是设置图标的，我们只需要给这些span的类不给它设置content值，就能清除图标 */
.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before{
    content: '';
}
/* 清除后再重新设置自己的图标 */
/*九宫格背景图片*/
.mui-icon-home{
    background-image: url('../../static/img/news.png');
    background-repeat: round; /* round将背景图在水平和垂直方向平铺且不裁剪.但是背景图片可能被拉伸或缩短 (注意 不裁剪, 可以伸缩,有可能拉伸) 那么就能通过给这图标设置宽高最后让它在水平垂直方向居中*/
}
.mui-icon-email{
    background-image: url('../../static/img/picShare.png');
    background-repeat: round;
}
.mui-icon-chatbubble{
    background-image: url('../../static/img/goodShow.png');
    background-repeat: round;
}
.mui-icon-location{
    background-image: url('../../static/img/feedback.png');
    background-repeat: round;
}
.mui-icon-search{
    background-image: url('../../static/img/search.png');
    background-repeat: round;
}
.mui-icon-phone{
    background-image: url('../../static/img/callme.png');
    background-repeat: round;
}
/*九宫格图标宽高*/
.mui-icon{
    height: 50px;
    width: 50px;
}
</style>