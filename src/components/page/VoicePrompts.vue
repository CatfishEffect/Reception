<template>
    <div>
        <div class="voiceList">
            <h3>您好，请问您想了解什么</h3>
            <ol>
                <li>关于账户挂失补办？</li>
                <li>资料变更的相关信息？</li>
                <li>证券账户合并的相关流程？</li>
                <li>账户注销的相关流程？</li>
                <li>非交易过户的相关流程？</li>
                <li>密码修改与清密的相关流程？</li>
                <li>资金账户销户的相关业务流程？</li>
                <li>有关于资金管理业务？</li>
                <li>清算交割的流程？</li>
                <li>证券公司收费标准</li>
                <li>炒股工具有哪些？</li>
                <li>我想了解一下网上股票开户？</li>
                <li>我想了解一下销户流程？</li>
                <li>我想了解一下打新股？</li>
            </ol>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {

        }
    }
}
</script>
<style scoped>
    h3{
        color: #fff;
    }
    .voiceList{
        box-sizing: border-box;
        padding: 20px 30px;
        background-color: #d98e75;
        border-radius:  50px 20px 20px 0px;
    }
    .voiceList ol{
        text-align: left;
        padding: 20px 0;
        color: #fff;
        margin: 0 auto;
        width: 80%;
    }
    .voiceList li{
        margin: 20px;
    }
</style>
