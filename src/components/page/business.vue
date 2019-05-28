<template>
    <div>
        <div>

                <!-- 联系客户经理 -->
                <div align="right" >
                    <div class="contact-my">
                        客户经理
                    </div>
                </div>

                <!-- 开户选项 -->
                <div class="bar">
                    <div v-for="(item,index) in menuList" :key="index">
                        <div @click="routerLinkToOpen(item.ID)" class="open" :class="item.IssueStyle">
                        </div>
                        <div class="text">
                            {{item.Title}}
                        </div>
                    </div>
                </div>

                <!-- line -->
                <!--<div class="line"></div>-->

                <!-- 更多 -->
                <div class="more">
                    <router-link to="voicePrompts" tag="div">
                        <div>
                            <span>语音咨询</span>
                        </div>
                    </router-link>
                    <div @click="routerLinkToDia">
                        <span>语音找人</span>
                    </div>
                    <router-link to="videoPlay" tag="div">
                        <div>
                            <span>走进华西</span>
                        </div>
                    </router-link>
                </div>

            </div>
    </div>
</template>
<script>
export default {
    data(){
      return{
          sysConfig: '',
          menuList: [
              // {
              //     id: 1,
              //     menuName: '办理开户',
              //     className: 'openAccount',
              //     bgImg: './../../../static/img/yanjing.png',
              //     description: 'ACCOUNT OPENING'
              // },
              // {
              //     id: 2,
              //     menuName: '投顾咨询',
              //     className: 'consultation',
              //     bgImg: './../../../static/img/yanjing.png',
              //     description: 'CONSULTATION'
              // },
              // {
              //     id: 3,
              //     menuName: '办理业务',
              //     className: 'business',
              //     bgImg: './../../../static/img/yanjing.png',
              //     description: 'HANDLE BUSINESS'
              // },
              // {
              //     id: 4,
              //     menuName: '来访办事',
              //     className: 'visit',
              //     bgImg: './../../../static/img/yanjing.png',
              //     description: 'VISIT SERVICE'
              // },
          ],
          idCard: ''
      }
    },
    methods: {
        routerLinkToOpen ( id ){
            this.$router.push({
                name:'open',
                params: {
                    id: id
                }
            })
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
        this.getMenuList();

    }
}
</script>
<style scoped>
    .text{
        margin-top: 32px;
        color: black;
        font-size: 24px;
    }

    .line{
        margin-top: 74px;
        width: 100%;
        height: 1px;
        background: rgba(206, 180, 128, .3);
    }
    .contact-my{

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
        margin-top: 73px;
        color: #fff;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
    .bar>div{
        margin: 0 30px;
    }
    .more {
        margin-top: 74px;
    }
    .more > div{
        margin-top: 26px;
        width: 100%;
        height: 68px;
        line-height: 68px;
        color: black;
        font-size: 20px;
        border-radius: 3px;
        cursor: pointer;
        border: 1px solid gray;
    }
    .more img{
        margin-left: 15px;
    }
</style>
