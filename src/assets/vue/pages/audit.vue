<template>
    <f7-page   >
        <!-- Navbar -->
        <f7-navbar back-link="Back" sliding  >

            <f7-nav-center sliding> {{audit.name}} {{audit.id}}</f7-nav-center>
        </f7-navbar>
        <div class="blck_info">
            <f7-card>
                <f7-card-header>
                        <div class="obj_info">
                            <div class="row  no-gutter">
                                <div class="col-70">
                                    <div class="col-100">Name: {{audit.name}}</div>
                                    <div class="col-100">Id: {{audit.id}}</div>
                                    <div class="col-100">{{audit.create_date}}</div>
                                    <div class="col-100">{{object_audit.name}}</div>
                                    <div class="col-100">{{object_audit.adres}}</div>
                                </div>
                                <div class="col-30 status">
                                    <table>
                                        <tr>
                                            <td> <i :class="status" aria-hidden="true"></i></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                </f7-card-header>

            </f7-card>

            <f7-card>
                   <f7-card-header>
                        Check-Lists
                   </f7-card-header>
                        <f7-list accordion  v-for="check in this.audit.check_list"  :key="check.id"  :id="check.id" >
                            <f7-list-item accordion-item :title="check.name" :after="realStatus(check.status)">
                                <f7-accordion-content>
                                    <f7-list form>
                                        <f7-list-item checkbox v-for="list in check.list_to_check" :key="list.id" name="checkbox"  :title="list.discription" :checked="list.status"></f7-list-item>
                                        <f7-list-item>
                                            <div class="row" style="width:100%; padding:15px 0 15px 0">
                                                <div class="col-50">
                                                    <f7-button @click="abort_check_list(check)" class="abort_button" color="gray"><i class="fa fa-undo" aria-hidden="true"></i> </f7-button>
                                                </div>
                                                <div class="col-50">
                                                    <f7-button fill @click="check_list_status(check)"><i class="fa fa-check" aria-hidden="true"></i> </f7-button>
                                                </div>
                                            </div>
                                        </f7-list-item>
                                    </f7-list>
                                </f7-accordion-content>
                            </f7-list-item>
                        </f7-list>
                </f7-card>

            <f7-card>
                <f7-card-content>
                    <f7-list accordion >
                        <f7-list-item accordion-item title="Comments" :after="commentsCount">
                            <f7-accordion-content >
                                <f7-block inner class="comments" v-for="comments in this.audit.comments"  :key="comments.id">
                                <comment :data_comments="comments" ></comment>
                                </f7-block>
                                <f7-block inner class="comment_text_zone">
                                  <f7-list form>
                                      <f7-list-item>
                                          <f7-input type="text" placeholder="Title" class="title_input" v-model="comment_title"/>
                                      </f7-list-item>
                                      <f7-list-item>
                                          <f7-input type="textarea" placeholder="Message" v-model="comment_text"></f7-input>
                                      </f7-list-item>
                                      <f7-block v-show="hasAttach">
                                          <div class="attach" v-for="attach in this.attachment" :key="attach.index" :style="attachImg(attach.url)" @click="photolook(attachment,attach.index)">
                                              <div class="img_top_back">img</div>
                                              <div class="img_bot_back"></div>
                                          </div>
                                      </f7-block>
                                      <f7-block>
                                         <div class="row">
                                             <div class="col-50 attachment_button">
                                                <button> <i class="fa fa-paperclip fa-2x" aria-hidden="true"></i></button>
                                                 <button> <i class="fa fa-camera fa-2x" aria-hidden="true"></i></button>
                                             </div>
                                             <div class="col-50">
                                                <f7-button fill @click="send_comments"> Отправить</f7-button>
                                             </div>
                                         </div>
                                      </f7-block>
                                  </f7-list>
                                </f7-block>
                            </f7-accordion-content>
                        </f7-list-item>
                    </f7-list>
                </f7-card-content>
            </f7-card>

        </div>
    </f7-page>
</template>

<script>
    var $$=Dom7;
    import comment from '../../Components/comment.vue'
    export default {
        components:{
          comment:comment
        },
        name: "audit",
        props: {
            id: { type: String, default: '' }
        },
        data:function() {
            return {
                audit:'',
                object_audit:'',
                comment_text:'',
                comment_title:'',
                acordianId:0,
                attachment:[
                ]
            }
        },
        created:function(){
           let self=this;
            this.$root.list.forEach(function (items,i,arr) {
                items.audits.forEach(function(item,i,arr){
                    if(item.id===self.id){
                        self.audit=item;
                        self.object_audit=items;



                    }
                })
            })
        },
        computed:{
            status(){
                let result="";
                switch (this.audit.status){
                    case '':
                        result='';
                        break;
                    case 'new':
                        result="";
                        break;
                    case 'ok':
                        result="fa fa-check fa-2x audit_good";
                        break;
                    case 'error':
                        result="fa fa-chain-broken fa-2x audit_error>";
                        break;
                    case 'wrong':
                        result="fa fa-times fa-2x audit_wrong>";
                        break;
                }
                return result;
            },
            commentsCount(){
                let str="<i class='fa fa-commenting-o' aria-hidden='true'></i> ";
                str+=this.audit.comments.length;
                return str;
            },
            hasAttach(){
                return (this.attachment.length>0);
            }


        },
        methods:{
            attachImg(attach_img) {
                return {
                    'background-image': this.hasAttach ? 'url(' + attach_img + ')' : 'none'
                }
            },
            photolook(attach,id){
                let photos =this.$f7.photoBrowser({
                        type: 'popup',
                        photos:this.photoArray(attach),
                        theme:'dark'
                    }
                );
                photos.open(id);


            },
            photoArray(array){
                let resultArray=new Array();
                array.forEach(function (items,i,arr){
                    resultArray[items.index]=items.url;
                });
                return resultArray;



            },
            send_comments(){
               let current=this.audit;
               let now= new Date();
               let comment= {
                   "id":this.getOfflineID(current),
                   "create_date": now.getDate()+"/"+now.getMonth()+1+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds(),
                   "from":this.$root.auth_info.name,
                   "title":this.comment_title,
                   "text":this.comment_text,
                   "attachments":this.attachment
               }
               this.comment_title='';
                this.comment_text='';
                    this.attachment=[];
               current.comments.push(comment);
            },
            getOfflineID(current){
                let lastId;
                (current.comments.length>0)?
                    lastId=current.comments[current.comments.length-1].id:
                    lastId=0;
                return ++lastId;
            },
            check_list_status(obj){
                let status=true;
                let result=''
                let acord=$$('#'+obj.id).find('.accordion-item');
                   acord.each(function(){
                   if ($$(this).length>0){
                        let inputs=$$(this).find('form').find('li').find('input');
                        inputs.each(function(){
                            if($$(this).prop('checked')){
                            }else{
                                status=false;
                            }
                        })
                      if (status){
                          result= "ok";
                      }else{
                          result="wrong";
                      }
                   }
                 });
               obj.status=result;
                this.audit_change_status()

            },
            abort_check_list(obj){
                let acord=$$('#'+obj.id);
                acord.each(function(){
                    if ($$(this).length>0){
                        let inputs=$$(this).find('form').find('li').find('input');
                        inputs.each(function(){
                            $$(this).prop('checked',false);
                        })
                    }
                })
                obj.status='new';
                this.audit_change_status();
            },
            audit_change_status(){
               let list =this.audit.check_list;
               let status="new";
               list.forEach(function(item,i,arr){
                       if(item.status==="ok") status="ok";
                       if(item.status==="wrong") status="wrong";
                })
                this.audit.status=status;
            },
            realStatus(str){
                let result="";
                switch (str){
                    case '':
                        result="";
                        break;
                    case 'new':
                        result="";
                        break;
                    case 'ok':
                        result="<i class='fa fa-check fa-2x audit_good' aria-hidden='true'></i>";
                        break;
                    case 'error':
                        result="<i class='fa fa-chain-broken fa-2x audit_error' aria-hidden='true'></i>";
                        break;
                    case 'wrong':
                        result="<i class='fa fa-times fa-2x audit_wrong' aria-hidden='true'></i>";
                        break;
                }
                return result;
            }

        }
    }
</script>

<style scoped>
.status{
    display: inline-block;
    background-color: transparent;
    text-align: center;
    padding-top:6%;
}
    .status table{
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        margin: 0;
        padding: 0;
        color:#ddd;
    }
    .check-list-acord{
        padding:0;
    }
    .comment_zone{
        margin-bottom: 30px;
    }
    .attachment_button{
        display:flex;
        justify-content: flex-start;
        height: 36px;
    }
    .attachment_button button{
        padding-top:5px;
        background-color: transparent;
        border:unset;
        color: #868686;
        margin:0 7px 0 5px;
    }
.abort_button{
    border:1px solid #ddd;

}
</style>