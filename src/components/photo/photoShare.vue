<template>
    <div class="tmpl">
        <nav-bar title="图文分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="loadImg(category.id)">{{category.title}}</a>
                </li>
                
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name:'photo.detail',params:{id:img.id,click:img.click,img_url:img.img_url,add_time:img.add_time,content:img.content} }"> 
                    <!-- 如果photo.detail是发送请求的方式，则这里只需传递id值 -->
                         <!-- <img :src="img.img_url"> -->
                         <!-- 懒加载 -->
                         <img v-lazy="img.img_url">
                        <p>
                            <span v-text="img.title"></span>
                            <br>
                            <span v-text="img.zhaiyao"></span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            //不发送请求直接设置值
                categorys:[//分类
                    {id:1,title:"三亚"},
                    {id:2,title:"杭州"},
                    {id:3,title:"武汉"},
                    {id:4,title:"深圳"},
                    {id:5,title:"上海"},
                    {id:6,title:"广州"},
                    {id:7,title:"北京"},
                    {id:8,title:"成都"},
                    {id:9,title:"西安"},
                    {id:10,title:"厦门"}
                ],
                imgs:[//图片数据 categorys分类数组的id对应的是imgs的child_id
                    {id:1,child_id:1,title:"三亚1",img_url:require("../../static/img/meijing1.jpg"),click:1,add_time:"2018-1-1",content:"三亚真美1"},
                    {id:2,child_id:1,title:"三亚2",img_url:require("../../static/img/meijing2.jpg"),click:2,add_time:"2018-1-2",content:"三亚真美2"},
                    {id:3,child_id:2,title:"杭州1",img_url:require("../../static/img/meijing3.jpg"),click:1,add_time:"2018-2-1",content:"杭州真美1"},
                    {id:4,child_id:2,title:"杭州2",img_url:require("../../static/img/meijing4.jpg"),click:2,add_time:"2018-2-1",content:"杭州真美2"},              
                    {id:5,child_id:3,title:"武汉1",img_url:require("../../static/img/meijing5.jpg"),click:1,add_time:"2017-1-1",content:"武汉真美1"},
                    {id:6,child_id:3,title:"武汉2",img_url:require("../../static/img/meijing6.jpg"),click:2,add_time:"2017-1-2",content:"武汉真美2"},
                    {id:7,child_id:4,title:"深圳1",img_url:require("../../static/img/meijing7.jpg"),click:1,add_time:"2017-2-1",content:"深圳真美1"},
                    {id:8,child_id:4,title:"深圳2",img_url:require("../../static/img/meijing8.jpg"),click:2,add_time:"2017-2-2",content:"深圳真美2"},
                    {id:9,child_id:5,title:"上海1",img_url:require("../../static/img/meijing9.jpg"),click:1,add_time:"2017-4-1",content:"上海真美1" },
                    {id:10,child_id:5,title:"上海2",img_url:require("../../static/img/meijing10.jpg"),click:2,add_time:"2017-4-2",content:"上海真美2"},
                    {id:11,child_id:6,title:"广州1",img_url:require("../../static/img/meijing11.jpg"),click:1,add_time:"2017-5-1",content:"广州真美1"},
                    {id:12,child_id:6,title:"广州2",img_url:require("../../static/img/meijing12.jpg"),click:2,add_time:"2017-5-2",content:"广州真美2"},
                    {id:13,child_id:7,title:"北京1",img_url:require("../../static/img/meijing13.jpg"),click:1,add_time:"2018-3-1",content:"北京真美1"},
                    {id:14,child_id:7,title:"北京2",img_url:require("../../static/img/meijing14.jpg"),click:2,add_time:"2018-3-2",content:"北京真美2"},              
                    {id:15,child_id:8,title:"成都1",img_url:require("../../static/img/meijing15.jpg"),click:1,add_time:"2018-4-1",content:"成都真美1"},
                    {id:16,child_id:8,title:"成都2",img_url:require("../../static/img/meijing16.jpg"),click:2,add_time:"2018-4-2",content:"成都真美2"},
                    {id:17,child_id:9,title:"西安1",img_url:require("../../static/img/meijing17.jpg"),click:1,add_time:"2018-5-1",content:"西安真美1"},
                    {id:18,child_id:9,title:"西安2",img_url:require("../../static/img/meijing18.jpg"),click:2,add_time:"2018-1-1",content:"西安真美2"},
                    {id:19,child_id:10,title:"厦门1",img_url:require("../../static/img/meijing19.jpg"),click:1,add_time:"2018-6-1",content:"厦门真美1"},
                    {id:20,child_id:10,itle:"厦门2",img_url:require("../../static/img/meijing20.jpg"),click:2,add_time:"2018-6-2",content:"厦门真美2"}
                ],cache:[]
                
            }
        },
    created(){
          //不发送请求时，这里仅仅如下将全局添加到数组的第一个 unshift
            this.categorys.unshift({
                id:0,
                title:'全部'
            });
            this.cache = this.imgs
        /*
        //1.发起请求获取导航栏数据categorys的数据 ,则上面的data()的categorys设置为空数组 categorys:[]
        this.$ajax.get('getimgcategory')
        .then(res=>{
            this.categorys = res.data.message;

            //将全局添加到数组的第一个 unshift
            this.categorys.unshift({
                id:0,
                title:'全部'
            });
        })
        .catch(err=>{
            console.log(err);
        });
        //当页面加载默认传递0
        this.loadImg(0);  //该代码替换了下面的请求的代码，做了函数封装

        //将0作为参数，获取全部图片数据 这里代码等同于this.loadImg(0); 
        // this.$ajax.get('getimages/' + 0)
        // .then(res=>{
        //     this.imgs = res.data.message;
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
        */

    },
    methods:{
        
        loadImg(id){
            //不发送图片请求时
           this.imgs=this.cache; //每一个调用loadImg都先让它回到cache即全部数据，防止下面让数据改变时下一次调用继续查找this.imgs.find时this.imgs不是全部数据而出错
           if(id!=0){
               let arr = [];
               this.imgs.forEach(function(val,index){//val为数组中的每条对象，index为当前对象的索引值，arr为原数组
                 if(val.child_id==id){
                    arr.push(val);
                 }
                });
               this.imgs =arr;
           }else{
               this.imgs=this.cache;
           }
           /* 用find方法只能返回一条数据
           if(id!=0){
           let a=this.imgs.find(function (x) {
                return x.child_id === id
           })
           this.imgs = [];
           this.imgs.push(a);
           }else{
            this.imgs=this.cache;
           }*/

        /*//2.发起请求获取图片数据imgs的数据，，则上面的data()的imgs设置为空数组imgs:[]
        this.$ajax.get('getimages/' + id)
        .then(res=>{
            this.imgs = res.data.message;
        })
        .catch(err=>{
            console.log(err);
        })
        */
        }
    }
}



</script>
<style>
.photo-header li { /* 导航列表数字 */ 
    list-style: none;
    display: inline-block; /* 将数数字行内排列 */
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

/*图片懒加载的样式*/
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}

</style>
