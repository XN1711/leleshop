<template>
    <div>
        <mt-swipe :auto="500" :speed="1000">
          <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a :href="img.url"><img :src="img.img"></a></mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        //1.不发送请求的方式
        data(){
            return{
                imgs:[//轮播图列表
                   {id:1,child_id:1,url:"#",img:require("../../static/img/good1.jpg")},
                   {id:2,child_id:1,url:"#",img:require("../../static/img/good6.jpg")},
                   {id:3,child_id:1,url:"#",img:require("../../static/img/good3.jpg")},
                   {id:4,child_id:2,url:"#",img:require("../../static/img/good2.jpg")},
                   {id:5,child_id:2,url:"#",img:require("../../static/img/good5.jpg")},
                   {id:6,child_id:2,url:"#",img:require("../../static/img/good6.jpg")},
                   {id:7,child_id:3,url:"#",img:require("../../static/img/good3.jpg")},
                   {id:8,child_id:3,url:"#",img:require("../../static/img/good8.jpg")},
                   {id:9,child_id:3,url:"#",img:require("../../static/img/good9.jpg")},
                   {id:10,child_id:4,url:"#",img:require("../../static/img/good4.jpg")},
                   {id:11,child_id:4,url:"#",img:require("../../static/img/good1.jpg")},
                   {id:12,child_id:4,url:"#",img:require("../../static/img/good2.jpg")}
                ]
            }
        },props:['cid'] //接收哪张商品图片
        ,created(){
            console.log(this.cid);
            this.swiper();
        },methods:{
            swiper(){
                
                let arr = [];
                let cid = this.cid;
                this.imgs.forEach(function(val,index){ //发现data()里的数据不能直接在函数里获取->不能直接(val.comment_id==this.cid
                     if(val.child_id==cid){ 
                        arr.push(val);
                     }
                });
                this.imgs=arr;
            },goBack(){
                this.$router.go(-1); //根据浏览器记录返回上一次
            }
        }

        /*2.发送请求的方式
        data(){
            return {
                imgs:[],//轮播图片列表
            }
        },
        props:['url'],
        created(){
            this.$ajax.get(this.url)
            .then(res=>{
                this.imgs = res.data.message;
            })
            .catch(err=>{
                console.log(err);
            })
        }
        */
    }
</script>
<style scoped>
/*轮播图样式*/
.mint-swipe{
    max-height:187px; 
}
.mint-swipe img {
    height: 100%;
    width: 100%;
}
</style>