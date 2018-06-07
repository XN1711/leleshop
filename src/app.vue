<template>
    <div>
            <!-- 头部内容 -->
            <mt-header title="乐乐商城"></mt-header>
            <transition name="router" mode="out-in">
                <router-view></router-view>
            </transition>
            <!-- 底部内容 -->
            <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{name:'home'}">
                <span class="mui-icon icon-shouye1"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon icon-diamond"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcart'}">
            <!-- 购物车1.设置购物车数量为变量pickNum -->
                <span class="mui-icon icon-gouwucheman"><span class="mui-badge">{{pickNum}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
//购物车2.引入连接器
import connect from './components/common/connect.js';
// 购物车3 引入prodTools 
import prodTools from './components/common/prodTools.js';
    //先创建父组件，后创建子组件
    export default {
        data(){
            return {
                // 购物车4 获取本地存储已有数量
                pickNum:prodTools.getTotalCount()
            }
        },
        created(){
            //购物车5. 设置最新数量 接收addShopcart线路的消息num，并把当前的数量pickNum加上num
            connect.$on('addShopcart',num => { //不能用function(num){},不然购物车数量不会加
                console.log('接收到了');
                this.pickNum = this.pickNum + num;
            })
        }
    }
</script>
<style scoped>
.router-enter-active,.router-leave-active{
    transition: opacity .5s 
}
.router-enter,.router-leave-to{
    opacity: 0;
}
</style>