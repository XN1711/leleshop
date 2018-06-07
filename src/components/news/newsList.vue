<template>
    <div class="tmpl">
       <!--该新闻列表还要具备表头显示和路由返回功能 用到了公共子组件navBar.vue，具体实现在navBar.vue中说明-->
        <nav-bar title="新闻列表"></nav-bar>

    <!-- MUI 图文列表 -->
    <!-- 下面的整个ul都是从hello-mui的图文列表组建模板media-list.html里的template里复制过来的 除了点击数和发表时间，所以才在style了多给它设置了左右浮动-->
        <ul class="mui-table-view">
            <li v-for="news in newsList" :key="news.id" class="mui-table-view-cell mui-media">
                <router-link :to="{name:'news.detail',query:{id:news.id,img_url:news.img_url,click:news.click,add_time:news.add_time,content:news.content} }">
                    <img class="mui-media-object mui-pull-left" :src="news.img_url">
                    <div class="mui-media-body">
                        <span v-text="news.title"></span>
                        <div class="news-desc">
                            <p>点击数:{{news.click}}</p>
                            <p>发表时间:{{news.add_time | convertDate}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            newsList:[//新闻列表数据
                {
                  id:1,
                  title:"阿里",
                  add_time:"2018-2-1", //上面时间中设置了convertDate过滤器，那么这里必须是时间格式，不然显示invalid date，而convertDate过过滤器是在main.js配置的全局过滤器
                  click:1,
                  img_url:"",
                  content:"淘宝购物咯"
                },
                {
                  id:2,
                  title:"百度",
                  add_time:"2018-3-1",
                  click:2,
                  img_url:"",
                  content:"百度搜索咯"
                },
                {
                  id:3,
                  title:"腾讯",
                  add_time:"2018-4-1",
                  click:3,
                  img_url:"",
                  content:"腾讯游戏咯"
                }
            ]
        }
    },
    created(){
        //发起请求 如果是发起请求，上面的 newsList就设置为空->newsList:[]
        // this.$ajax.get('getnewslist')
        // .then(res=>{
        //     this.newsList = res.data.message;
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
    }
}

</script>
<style scoped>
.mui-media-body p {
    color: #0bb0f5;
}

.news-desc p:nth-child(1) {
    float: left;
}

.news-desc p:nth-child(2) {
    float: right;
}
</style>
