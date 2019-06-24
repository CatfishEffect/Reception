<template>
    <div>
        <div>
            <!-- 开户选项 -->
            <div v-if="isMenuShow" class="bar">
                <div v-for="(item,index) in menuList" :key="index">
                    <div @click="routerLinkToOpen(item.ID,item.Title)" class="open" :class="item.IssueStyle">
                    </div>
                    <div class="text">
                        {{item.Title}}
                    </div>
                </div>
            </div>

            <!-- 更多 -->
            <div class="more">
                <router-link to="voicePrompts" tag="div">
                    <div>
                        <img src="./../../../static/img/icon-voice.png" alt="">
                        <span>语音咨询</span>
                    </div>
                </router-link>
                    <div @click="routerLinkToDia">
                        <img src="./../../../static/img/icon-voice.png" alt="">
                        <span>语音找人</span>
                    </div>
                <router-link to="videoPlay" tag="div">
                    <div>
                        <img src="./../../../static/img/icon-go.png" alt="">
                        <span>走进华西</span>
                    </div>
                </router-link>
            </div>

        </div>
    </div>
</template>
<script>
    import qs from 'qs'
    import { mapGetters,mapActions } from 'vuex'
export default {
    data(){
      return{
          sysConfig: '',
          menuList: [],
          idCard: '',
          timer: ''
      }
    },
    computed: {
        ...mapGetters( ['count'] ),
        ...mapGetters(['isMenuShow'])
    },

    methods: {



        //获取到访意图
        getIntention(id,intention){
            console.log('意图',id);

            let obj = {};
            obj.IsSueID = id;
            obj.CustID = localStorage.getItem('customerID');
            obj.Intention = intention;

            this.$axios.post( this.$api.getIntention,qs.stringify( obj ) ).then(
                res => {
                    console.log('到访意图',res);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        ...mapActions( ['add','sub']),
        routerLinkToOpen ( id,intention ){
            fwVoiceMonitor.stopSpeak();     //停止语音
            let intentionId = localStorage.getItem('customerID');
            this.getIntention(id,intention);
            this.$router.push({
                name:'open',
                params: {
                    id: id,
                    customID: intentionId
                }
            });
        },
        routerLinkToDia (){
            this.$router.push({
                path:'/dialogue'
            })
        },

        //读取配置
        readConfig() {
            this.sysConfig = eval("(" + fwConfigReader.read() + ")");
        },

        //获取菜单
        getMenuList (){
            this.$axios.get( this.$api.getMenuList,{
                params: {
                    orgID: this.sysConfig.OrgID,
                    branchID: this.sysConfig.BranchID,
                }
            } ).then(
                res => {
                    this.menuList = res.data.Data;
                    console.log( '菜单',res);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        btn(){
            this.readIDCard();
        },

        //读取身份证
        readIDCard(){
            this.idCard = fwIDCardReader.read();
        }
    },
    created (){
        this.readConfig();

        this.timer = setTimeout(
            ()=>{
                this.getMenuList();
            },100
        )
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
}
</script>
<style scoped>

    .text{
        margin-top: 32px;
        color: #333;
        font-size: 24px;
        font-weight: bolder;
    }

    .line{
        margin-top: 74px;
        width: 100%;
        height: 1px;
        background: rgba(206, 180, 128, .3);
    }
    .contact-my{
        cursor: pointer;
        text-align: center;
        width: 150px;
        color: white;
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        background-color: #ec3b3c;
        border-radius: 20px 0 0 20px;
    }
     .contact-my img{
         margin-top: 15px;
     }
    .contact-my h5{
        font-size: 16px;
        margin-top: 10px;
        color: #ceb480;
        font-weight: normal;
    }

    .contact{
        position: absolute;
        right: 0;
        width: 185px;
        height: 57px;
        line-height: 57px;
        background-color: #84b4b9;
        color: #fff;
        border-radius: 3px;
        font-size: 20px;
    }

    .open{
        width: 158px;
        height: 158px;
        margin-top: 25px;
        cursor: pointer;
    }
    .ACCOUNTOPENING{
        background-image: url('./../../../static/img/banlikaihu.png');
    }
    .CONSULTATION{
        background-image: url('./../../../static/img/touguzixun.png');
    }
    .HANDLEBUSINESS{
        background-image: url('./../../../static/img/yewubanli.png');
    }
    .VISITSERVICE{
        background-image: url('./../../../static/img/laifangbanshi.png');
    }
    .open span{
        margin-left: 20px;
        font-size: 30px;
        vertical-align: middle;
    }
    .bar{
        margin-top: 20px;
        color: #fff;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;

    }
    .bar>div{
        margin: 0 60px;

    }
    .more {
        margin: 0 auto;
        margin-top: 74px;
        width: 500px;

    }
    .more > div{
        margin-top: 26px;
        width: 100%;
        height: 68px;
        line-height: 68px;
        color: #c52627;
        font-size: 20px;
        border-radius: 68px;
        cursor: pointer;
        background-color: #fff;
        box-shadow: 0 5px 5px rgba(156,156,156,.2);
    }
    /*.more > div:hover{*/
        /*color: white;*/
        /*background-color: #c52627;*/
    /*}*/
    .more img{
        margin: 0 15px;
    }
</style>
