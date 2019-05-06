<template>
    <div align="left">
        <figure>
            <img src="./../../../static/img/tixing.png" alt="">
            <span class="content">
                公司经营范围涵盖证券经纪业务，证券投资咨询，与证券交易、证券投资活动有关的财务顾问，证券承销与保荐，证券自营，
                证券资产管理，证券投资基金代销，融资融券，代销金融产品，为期货公司提供中间介绍业务以及中国证监会批准的其他业务
            </span>
        </figure>
        <div>
            <img class="openImg"  src="./../../../static/img/ditu.png" alt="">
        </div>
        <div>
            <h5>开户流程</h5>
            <img class="openImg"  src="./../../../static/img/kaihuliucheng.png" alt="">
        </div>
        <div class="btn">
            <button>排号</button>
            <button @click="returnHome">返回</button>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {

        }
    },
    methods: {
        returnHome (){
            this.$router.push({
                path:'/'
            })
        }
    }
}
</script>
<style scoped>
.openImg{
    width: 591px;
    height: auto;
}

figure{
    margin-top: 140px;
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

.btn{
    margin-top: 161px;
}
.btn button{
    cursor: pointer;
    width: 280px;
    height: 68px;
    background-color: #5ba3ab;
    color: #fff;
    border-radius: 10px;
    font-size: 24px;
}
.btn button:last-child{
    margin-left: 20px;
}
</style>
