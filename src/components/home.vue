<template>
    <div class="bg">
        <div>
            <img src="./../../static/img/guangao.png" alt="ad">
        </div>
        <main class="main">
            <div>
                <img src="./../../static/img/girl.png" alt="girl">
            </div>
            <div>
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    data (){
        return {

        }
    },
   
}
</script>
<style scoped>
    
    /* 主体样式 */
    .bg{
        width: 1080px;
        height: 1920px;
        
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .main{
        display: flex;
        flex-flow: row nowrap;
        margin: 60px 60px 0 60px;
    }
    .main >div:first-child{
        width: 309px;
    }
    .main >div:last-child{
        margin-left: 60px;
        width: calc( 100% - 369px);
    }




</style>
