<template>
  <div id='tmpl'>
        <div id="postcomment">
            <h3>提交评论</h3>
            <p class="p"></p>
            <textarea placeholder="请输入您要评论的内容..." v-model="postcontent"></textarea>
            <mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
        </div>

        <div id="list">
            <h3>评论列表</h3>
            <p class="p"></p>
            <div v-for="(item,index) in list">
                <div class="title">
                    <span>第{{index + 1}}楼:</span>
                    <span>用户：{{item.user_name}}</span>
                    <span>发表时间：{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                </div>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-text="item.content"></li>
                </ul>
            </div>
        </div>
    
     <!--3.0 实现获取更多按钮-->
        <mt-button type="danger" size="large" plain @click="changePage">加载更多</mt-button>
  </div>
</template>
<script>

import { Toast } from 'mint-ui';


export default {
  name: "component_name",
  props : ['id'],
  data () {
    return {
        postcontent : "",
        pageindex : 1,
        list : []
    };
  },
  methods:{
    postcomment(){
         if(this.postcontent.trim().length <= 0){
                Toast("输入内容不能为空");
                return;
            }

        var url = this.$comment.apiWhere + '/api/postcomment/'+this.id;
        this.$http.post(url,{ content : this.postcontent },{ emulateJSON: true }).then(function(res){
            Toast(res.body.message);
        //    this.list =  [{
        //         "user_name": "匿名用户",
        //         "add_time": new Date(),
        //         "content": this.postcontent
        //     }].concat(this.list);
            //这里是把输入的数据插入在数组最前
            this.list.unshift({
                "user_name": "匿名用户",
                "add_time": new Date(),
                "content": this.postcontent
            })
        })
        this.postcontent = "";
    },
    getComment(pageindex){
        pageindex = pageindex || 1;
        var url = this.$comment.apiWhere + '/api/getcomments/' + this.id + '?pageindex=' + pageindex;
        this.$http.get(url).then(function(res){
            var data = res.body;
            if(data.status != 0){
                Toast(data.message);
                return;
            }
            this.list = this.list.concat(data.message);
           // this.list.push.apply(this.list,data.message)
        })
    },
    changePage(){
        this.pageindex++;
        this.getComment(this.pageindex);
    }
  },
  created(){
    this.getComment(this.pageindex);
  }
}
</script>
<style lang="css" scoped>
/* 1.0 实现提交评论样式 */

#postcomment {
    padding: 5px;
}

.p {
    height: 1px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}


</style>