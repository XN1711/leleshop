<template>
    <div>
                <!-- 评论内容开始 -->
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="msg"></textarea>
                </li>
                <li>
                   <mt-button @click="sendComment" size="large" type="primary">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>66条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}：{{comment.content}} <span id="add_time">{{comment.add_time|convertDate}}</span>
                </li>
               
            </ul>
            <mt-button type="danger" size="large" plain @click="loadByPage">加载更多</mt-button>
        </div>

        <!-- 评论内容结束 -->


    </div>
</template>
<script>
    export default {
        // 1.不发送请求的方式
        data(){
            return{
                  comments:[//存放评论数据
                  //父组件传递cid参数过来,找到的是对于的comment_id，并首先显示comment_id中的,pageindex为1的
                    {id:1,comment_id:1,pageIndex:1,user_name:"匿名用户",add_time:"2018-01-19T20:09:30.000Z",content:"我来评论一下啦"},
                    {id:2,comment_id:1,pageIndex:1,user_name:"匿名用户",add_time:"2018-01-20T21:09:30.000Z",content:"大家好"},
                    {id:3,comment_id:1,pageIndex:1,user_name:"匿名用户",add_time:"2018-01-21T22:09:30.000Z",content:"北京欢迎你"},
                    {id:4,comment_id:1,pageIndex:2,user_name:"匿名用户",add_time:"2018-02-22T23:10:30.000Z",content:"哈哈"},
                    {id:5,comment_id:1,pageIndex:2,user_name:"匿名用户",add_time:"2018-02-24T01:10:30.000Z",content:"程序员"},
                    {id:6,comment_id:1,pageIndex:2,user_name:"匿名用户",add_time:"2018-02-16T20:10:30.000Z",content:"前端学习"},
                    {id:7,comment_id:1,pageIndex:3,user_name:"匿名用户",add_time:"2018-03-17T20:11:30.000Z",content:"vue真棒"},
                    {id:8,comment_id:1,pageIndex:3,user_name:"匿名用户",add_time:"2018-03-18T20:11:30.000Z",content:"学习中"},
                    {id:9,comment_id:1,pageIndex:3,user_name:"匿名用户",add_time:"2018-03-19T20:11:30.000Z",content:"去哪旅游"},
                    {id:10,comment_id:2,pageIndex:1,user_name:"匿名用户",add_time:"2018-04-12T20:12:30.000Z",content:"今天太热了"},
                    {id:11,comment_id:2,pageIndex:1,user_name:"匿名用户",add_time:"2018-04-12T20:12:30.000Z",content:"今天去哪玩"},
                    {id:12,comment_id:2,pageIndex:1,user_name:"匿名用户",add_time:"2018-04-13T20:12:30.000Z",content:"深圳真大"},
                    {id:13,comment_id:2,pageIndex:2,user_name:"匿名用户",add_time:"2018-05-15T20:12:30.000Z",content:"看电影吧"},
                    {id:14,comment_id:2,pageIndex:2,user_name:"匿名用户",add_time:"2018-05-18T20:12:30.000Z",content:"没意思"},
                    {id:15,comment_id:2,pageIndex:2,user_name:"匿名用户",add_time:"2018-05-17T20:12:30.000Z",content:"赶紧学习去"},
                    {id:16,comment_id:2,pageIndex:3,user_name:"匿名用户",add_time:"2018-06-18T20:12:30.000Z",content:"该考研了"},
                    {id:17,comment_id:2,pageIndex:3,user_name:"匿名用户",add_time:"2018-06-19T20:12:30.000Z",content:"月薪上万么"},
                    {id:18,comment_id:2,pageIndex:3,user_name:"匿名用户",add_time:"2018-06-20T20:12:30.000Z",content:"玩英雄联盟不"}
                  ],
                 pageIndex:1,//页码
                 msg:'',//发表的评论    
                 cache:[],//缓存数组 当发表评论时以这个为最新的全部数据
                 cookie:[] //当加载数据时,以这个为总共加载的数据
                    
            }
        },created(){
            //评论操作 开始
            this.cache=this.comments; //设置一个缓存,不管comments数组如何变化,cache都是它最初的值
            this.loadFirst();
        },props:['cid']  //接收父组件传过来的图片id,因为每条图片id都有对应的评论id->数组的comment_id
        ,methods:{
            //先调用这个函数 
            loadFirst(){
                // this.comments=this.cache;
                let arr = [];
                let cid = this.cid;
                this.cache.forEach(function(val,index){ //发现data()里的数据不能直接在函数里获取->不能直接(val.comment_id==this.cid
                     if(val.comment_id==cid&&val.pageIndex==1){ 
                        arr.push(val);
                     }
                });
                this.comments=arr;
                this.cookie=arr;
            },
            //加载更多按钮
            loadByPage(){
                let arr2 = [];
                let cid2 = this.cid;
                this.pageIndex=this.pageIndex+1;
                let nextpage = this.pageIndex; //每加载一次 查找的页码再+1,再把已有的数据加上
                console.log(nextpage);
                this.cache.forEach(function(val,index){ //发现data()里的数据不能直接在函数里获取->不能直接(val.comment_id==this.cid
                     if(val.comment_id==cid2&&val.pageIndex==nextpage){ 
                        arr2.push(val);
                     }
                 });
                if(arr2==''){
                    alert('已加载完毕');
                }
                console.log(arr2);
                 for (let i=0; i < arr2.length; i++) { //拼接原有已加载数据
                    this.cookie.push(arr2[i]);  
                 }
                 this.comments=this.cookie;
            },
            //发表评论
            sendComment(){ //插入的id要在原有最尾的id基础上+1
                if(this.msg==''){
                    alert('请输入内容');
                }
                else{
                    let last = this.cache[this.cache.length-1]; //获取最后一条数据
                    last.id=last.id+1; 
                    last.pageIndex=0; 
                    let myDate = new Date();
                    let obj = {id:last.id,comment_id:this.cid,pageIndex:last.pageIndex,user_name:"匿名用户",addtime:myDate,content:this.msg};
                    this.cookie.unshift(obj); //往数组开头添加元素  
                    this.comments=this.cookie;
                    this.cache.push(obj);   
                    this.msg = '';//清空数据
                }
            },
            //返回
            goback(){
                this.$router.go(-1);
            }
        }

        /* 2.发送请求的方式
            data(){
                return {
                     comments:[],//存放评论数据
                     pageIndex:1,//页码
                     msg:'',//发表的评论
                }
            },created(){
                //评论操作 开始
                this.loadFirst();
                //评论操作 结束
            },props:['cid'] //接收父组件传过来的图片id,因为每条图片id都有对应的评论
            ,methods:{
            //先调用这个函数
            loadFirst(){
                this.$ajax.get('getcomments/' + this.cid +'?pageindex=1')
                .then(res=>{
                    this.comments = res.data.message;
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            //加载更多按钮
            loadByPage(){
                 this.$ajax.get('getcomments/' + this.cid +'?pageindex=' + (++this.pageIndex))
                .then(res=>{
                    //追加
                    this.comments = this.comments.concat(res.data.message);
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            //发表评论
            sendComment(){
                //发表评论请求后台
                this.$ajax.post('postcomment/'+ this.cid,'content='+this.msg)
                .then(res=>{
                    console.log(res);
                    //获取最新的第一页数据
                    this.loadFirst();
                    //清空数据
                    this.msg = '';
                })
                .catch(err=>{
                    console.log(err);
                })
               
            },
            goback(){
                this.$router.go(-1);
            }
        }
        */
    }
</script>
<style scoped>
 /*评论样式 开始*/
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
    position: relative;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
#add_time{
    position: absolute;
    right: 0px;
}

/*评论样式 结束*/   
</style>