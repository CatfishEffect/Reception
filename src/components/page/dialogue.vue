<template>
    <div>
        <div class="dialogue">
            <div>您好，请问您找谁？</div>
            <div>我找XXX</div>
            <div>以下是XXX的信息请确认</div>
            <div>好的，谢谢</div>
        </div>
        <!-- line -->
        <div class="line"></div>

        <div class="info">
            <div class="customer-photo">
                <img src="./../../../static/img/kehu.png" alt="">
            </div>
            <div class="w-line"></div>
            <div class="customer">
                <div>
                    <img src="./../../../static/img/shenfen.png" alt="">
                    <span>胡歌</span>
                </div>
                <div>
                    <img src="./../../../static/img/zhiwu.png" alt="">
                    <span>投顾经理</span>
                </div>
            </div>
            <div class="btn-sure">确认</div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.btn-sure{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #c0a264;
    color: #fff;
    font-size: 24px;
    border-radius: 0 0 10px 10px;
}
.customer>div span{
    margin-left: 20px;
}
.customer>div{
    margin-left: 60px;
}
.customer>div:first-child{
    margin-top: 30px;
}
.customer>div:last-child{
    margin-top: 20px;
    
}
.customer div span{
    vertical-align: middle;
}

.customer{
    color: white;
    font-size: 20px;
    text-align: left;
}
.customer-photo > img{
    margin: 20px 0;
}
.w-line{
    width: 100%;
    height: 1px;
    background: #fff;
}

.info{
    position: relative;
    padding: 0 10px;
    margin: 0 auto;
    width: 276px;
    height: 339px;
    margin-top: 60px;
    background: #d1c3a2;
    border-radius: 10px;
    box-sizing: border-box;
}
.line{
        margin-top: 74px;
        width: 100%;
        height: 1px;
        background: rgba(206, 180, 128, .3);
    }
.dialogue >div:nth-child(odd){
    width: 200px;
    background-color: #d98e75;
    color: #fff;
    text-align: left;
    font-size: 20px;
    padding: 20px 30px 20px 50px;
    border-radius: 100px 30px 30px 0;
}
.dialogue >div:nth-child(even){
    margin-left: 320px;
    width: 180px;
    background-color: #c0a264;
    color: #fff;
    text-align: right;
    font-size: 20px;
    padding: 20px 50px 20px 40px;
    border-radius: 30px 100px 0 30px ;
}
</style>
