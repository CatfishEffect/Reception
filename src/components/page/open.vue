<template>
    <div align="left">
          <div class="btn">
            <button @click="dialogVisible = true">排号</button>
            <button @click="returnHome">返回</button>
        </div>
        <figure>
            <img src="./../../../static/img/tixing.png" alt="">
            <span class="content">
                公司经营范围涵盖证券经纪业务，证券投资咨询，与证券交易、证券投资活动有关的财务顾问，证券承销与保荐，证券自营，
                证券资产管理，证券投资基金代销，融资融券，代销金融产品，为期货公司提供中间介绍业务以及中国证监会批准的其他业务
            </span>
        </figure>
        <div>
            <img class="openImg"  src="./../../../static/img/weizhidaotu.png" alt="">
        </div>
        <div>
            <h5>开户流程</h5>
            <img class="openImg"  src="./../../../static/img/kaihuliucheng.png" alt="">
        </div>

        <!-- 排号module -->
        <div class="model" v-show="dialogVisible">
            <div class="dialog">
                <div>
                    <div class="myTitle">78</div>
                </div>
                <div class="line"></div>
                <div class="wait">
                    <p>等待人数：<span>20</span> </p>
                    <p>办理窗口：<span> 1、4、9</span> </p>
                </div>
                 <div class="close" @click="dialogVisible = false">
                    X
                </div>
                <div class="sure">
                    <button @click="dialogVisible = false">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            dialogVisible: false
        }
    },
    methods: {
        returnHome (){
            this.$router.push({
                path:'/'
            })
        },
       
    }
}
</script>
<style scoped>

.model{
    width: 100%;
    height: 1920px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .3);
}

.close{
    font-size: 24px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}


/* 排队dialog */
.dialog{
    width: 400px;
    height: 360px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -180px;
}

.dialog>div:first-child{
    
    text-align: center;
   
}
.myTitle{
    margin: 30px auto;
    font-size: 30px;
    background-color: #c52627;
    color: #fff;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
}
.line{
    width: 100%;
    height: 1px;
    background-color: #c0a264;
}

.wait{
    margin-top: 40px; 
    margin-left: 30px;
}
.wait p{
    font-size: 20px;
    color: #666;
    margin: 10px 0;
}
.wait span{
    font-size: 24px;
     color: #333;
}

.sure button{
    cursor: pointer;
    position: absolute;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    width: 100%;
    height: 82px;
    line-height: 82px;
    background: #c0a264;
    font-size: 28px;
    color: white;
}



.openImg{
    width: 591px;
    height: auto;
}

figure{
    margin-top: 70px;
    margin-bottom: 41px;
}

.content{
    color: #666;
    font-size: 18px;
}
h5{
    font-weight: normal;
    font-size: 30px;
    color: #333;
    text-align: center;
    margin-top: 140px;
    margin-bottom: 50px;
}

.btn button:hover{
    transition: all 0.3s linear;
    background-color: #c52627;
    color: #fff;
}


.btn button{
    cursor: pointer;
    width: 240px;
    height: 68px;
    background-color: #fff;
    color: #c52627;;
    border-radius: 10px;
    font-size: 24px;
    box-shadow: 0 3px 3px rgba(186, 28, 29, .25)
}
.btn button:last-child{
    margin-left: 80px;
}
</style>
