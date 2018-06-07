<template>
    <div class="tmpl">
        <!--  组件名navBar -->  
        <nav-bar title="图片详情"></nav-bar>
        <!-- 组件名:navbar -->
        <!--  使用：navbar-->
        <div class="photo-title">
            <p v-text="imgInfo.title"></p>
            <span>发起日期：{{imgInfo.add_time | convertDate}}</span>
            <span>{{imgInfo.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <!-- 这里用的是hello-mui的模板slider-table-default.html -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
                <!-- 预览插件preview的用法 里面已经带遍历，不需要再给它 v-for遍历-->
                <!-- <img class="preview-img" :src="img.src" height="100" @click="$preview.open(index, imgs)"> -->
                <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
           
        </ul>
        <div class="photo-desc">
            <p v-html="imgInfo.content"></p>
        </div>
        
        <!-- 使用评论子组件 -->
        <comment :cid="pid"></comment>
    </div>
</template>
<script>
export default {
    data(){
        return {
            // slide1:[],//存放缩率图
            slide1:[//存放缩率图 如果不发送请求就直接设置
                {id:1,child_id:1,src:require("../../static/img/meijing1_b.jpg"),msrc: require("../../static/img/meijing1.jpg"),alt: 'picture1',title: 'Image Caption 1',w: 800,h: 600},
                {id:2,child_id:1,src:require("../../static/img/meijing2_b.jpg"),msrc: require("../../static/img/meijing2.jpg"),alt: 'picture2',title: 'Image Caption 2',w: 800,h: 600},
                {id:3,child_id:1,src:require("../../static/img/meijing3_b.jpg"),msrc: require("../../static/img/meijing3.jpg"),alt: 'picture3',title: 'Image Caption 3',w: 800,h: 600},
                {id:4,child_id:1,src:require("../../static/img/meijing4_b.jpg"),msrc: require("../../static/img/meijing4.jpg"),alt: 'picture4',title: 'Image Caption 4',w: 800,h: 600},          
                {id:5,child_id:2,src:require("../../static/img/meijing5_b.jpg"),msrc: require("../../static/img/meijing5.jpg"),alt: 'picture5',title: 'Image Caption 5',w: 800,h: 600},
                {id:6,child_id:2,src:require("../../static/img/meijing6_b.jpg"),msrc: require("../../static/img/meijing6.jpg"),alt: 'picture6',title: 'Image Caption 6',w: 800,h: 600},
                {id:7,child_id:2,src:require("../../static/img/meijing7_b.jpg"),msrc: require("../../static/img/meijing7.jpg"),alt: 'picture7',title: 'Image Caption 7',w: 800,h: 600},
                {id:8,child_id:2,src:require("../../static/img/meijing8_b.jpg"),msrc: require("../../static/img/meijing8.jpg"),alt: 'picture8',title: 'Image Caption 8',w: 800,h: 600},
                {id:9,child_id:3,src:require("../../static/img/meijing9_b.jpg"),msrc: require("../../static/img/meijing9.jpg"),alt: 'picture9',title: 'Image Caption 9',w: 800,h: 600},
                {id:10,child_id:3,src:require("../../static/img/meijing10_b.jpg"),msrc: require("../../static/img/meijing10.jpg"),alt: 'picture10',title: 'Image Caption 10',w: 800,h: 600},
                {id:11,child_id:3,src:require("../../static/img/meijing11_b.jpg"),msrc: require("../../static/img/meijing11.jpg"),alt: 'picture11',title: 'Image Caption 11',w: 800,h: 600},
                {id:12,child_id:3,src:require("../../static/img/meijing12_b.jpg"),msrc: require("../../static/img/meijing12.jpg"),alt: 'picture12',title: 'Image Caption 12',w: 800,h: 600},
                {id:13,child_id:4,src:require("../../static/img/meijing13_b.jpg"),msrc: require("../../static/img/meijing13.jpg"),alt: 'picture13',title: 'Image Caption 13',w: 800,h: 600},
                {id:14,child_id:4,src:require("../../static/img/meijing14_b.jpg"),msrc: require("../../static/img/meijing14.jpg"),alt: 'picture14',title: 'Image Caption 14',w: 800,h: 600},            
                {id:15,child_id:4,src:require("../../static/img/meijing15_b.jpg"),msrc: require("../../static/img/meijing15.jpg"),alt: 'picture15',title: 'Image Caption 15',w: 800,h: 600},
                {id:16,child_id:4,src:require("../../static/img/meijing16_b.jpg"),msrc: require("../../static/img/meijing16.jpg"),alt: 'picture16',title: 'Image Caption 16',w: 800,h: 600},
                {id:17,child_id:5,src:require("../../static/img/meijing17_b.jpg"),msrc: require("../../static/img/meijing17.jpg"),alt: 'picture17',title: 'Image Caption 17',w: 800,h: 600},
                {id:18,child_id:5,scr:require("../../static/img/meijing18_b.jpg"),msrc: require("../../static/img/meijing18.jpg"),alt: 'picture18',title: 'Image Caption 18',w: 800,h: 600},
                {id:19,child_id:5,src:require("../../static/img/meijing19_b.jpg"),msrc: require("../../static/img/meijing19.jpg"),alt: 'picture19',title: 'Image Caption 19',w: 800,h: 600},
                {id:20,child_id:5,scr:require("../../static/img/meijing20_b.jpg"),msrc: require("../../static/img/meijing20.jpg"),alt: 'picture20',title: 'Image Caption 20',w: 800,h: 600}
            ],                                                      
            // slide1: [                                           
            //   {
            //     src: require("../../static/img/meijing1_b.jpg"),
            //     msrc: require("../../static/img/meijing1.jpg"),
            //     alt: 'picture1',
            //     title: 'Image Caption 1',
            //     w: 800, //放大后的宽高
            //     h: 600
            //   },
            //   {
            //     src: require("../../static/img/meijing3_b.jpg"),
            //     msrc: require("../../static/img/meijing3.jpg"),
            //     alt: 'picture2',
            //     title: 'Image Caption 2',
            //     w: 800,
            //     h: 600
            //   }
            // ],

            imgInfo:{},//详情数据对象
            pid:this.$route.params.id, //记录当前图片id 
        }
    },
    created(){
        //1.不发送请求的方式 需要phoneShare.vue传递所需的参数过来to="{name:'photo.detail',params:{id:img.id,click:img.click,img_url:img.img_url,addtime:img.addtime,content:img.content} }"
        //这个数组imgInfo用来接收phoneShare.vue图片共享组件的imgs数组传递过来的数据
        this.imgInfo.id=this.$route.params.id;
        this.imgInfo.click=this.$route.params.click;
        this.imgInfo.add_time=this.$route.params.add_time;
        this.imgInfo.content=this.$route.params.content;   
        console.log(this.imgInfo.add_time);

       //将传递过来的id值找到对应imgs数组的child)id值 并把找到的重新赋值给imgs
        let arr = [];
        let id = this.imgInfo.id;
        this.slide1.forEach(function(val,index){//val为数组中的每条对象，index为当前对象的索引值，arr为原数组
          if(val.child_id==id){
            arr.push(val);
          }
         });
        this.slide1 =arr; 

        //给slide1数组每条数据添加w和h属性
        this.slide1.forEach((ele)=>{
            ele.w=300;
            ele.h=200; //缩率图显示的高
        })
        
           

        /*2.发送请求的方式 则在phoneShare.vue中值需传递id值过来就行了 to="{name:'photo.detail',params:{id:img.id} }"
        //1:获取路由参数
        // let pid = this.$route.params.id;
        //2:发起请求2个
        //图片详情
        this.$ajax.get('getimageInfo/' + this.pid)
        .then(res=>{
            //一个id对应一个详情对象
            this.imgInfo = res.data.message[0];
        })
        .catch(err=>{
            console.log(err)
        });
        //缩略图
        this.$ajax.get('getthumimages/' + this.pid)
        .then(res=>{
            this.imgs = res.data.message;

            //forEach
            this.imgs.forEach((ele)=>{
                ele.w=300;
                ele.h=200; //缩率图显示的高
            })
        })
        .catch(err=>{
            console.log(err)
        })
        */
    },methods: {
      handleClose () {
        console.log('close event')
      }
    }
    
}


</script>
<style >
/* 设置缩略图放大前图片宽高,不要用scoped */
ul img{
    width: 50%;
    height: 100px;
    float: left;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 10px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
    clear: both;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}
</style>
