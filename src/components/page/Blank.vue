<template>
    <div>
        <div class="dialogue">
            <div>已通知xxx,请稍后...</div>
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
.dialogue >div:nth-child(odd){
    width: 400px;
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
