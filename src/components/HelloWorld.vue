<template>
<el-container style="height:850px; border: 1px solid #eee">
  <el-container>
    <el-main>
      <el-button type="primary" @click="add">新增</el-button>
      <el-table   align="center" height="640" :data="tableData">
        <el-table-column  prop="title" label="商品名称" width="250">

      </el-table-column>
        <el-table-column  prop="sellPoint" label="商品卖点" width="250">

        </el-table-column>
        <el-table-column  prop="price" label="商品价格" width="250">

        </el-table-column>
        <el-table-column  prop="num" label="库存数量" width="250">

        </el-table-column>
        <el-table-column  prop="image" label="商品图片" width="250">
          <template   slot-scope="scope">
            <img :src="scope.row.image"  min-width="70" height="70" />
          </template>
        </el-table-column>
        <el-table-column  prop="tbItemCat.name" label="所属类别" width="250">

        </el-table-column>

       <el-table-column
             label="操作"
             >
             <template slot-scope="scope">
               <el-button

                 @click="handleDelete(scope.$index, scope.row)"
                 type="text"
                 size="small">
                 移除
               </el-button>
             </template>
           </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :current-page="currentPage"
        :total="total"
        :size="pageSize"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default{
  name: 'HelloWorld',
    data(){
      return{
        currentPage:1,
        pageSize:10,
        total:100,
        tableData:[]
      }
    },
  methods:
    {
      getUserList(){
         var _this=this;
         this.$http.get('/TbItem/list'
           ,{
              params:{
                pageNo:_this.currentPage,
                pageSize:_this.pageSize
              }
            }
         ).then(function(responese){
           _this.tableData=responese.data.itemList;
           window.console.log(_this.tableData)
           _this.total=responese.data.total;
         })

      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserList();
      },
      add(){
        this.$router.push({ path: '/formDemo' });
      },
      //删除
      handleDelete(index, row) {
        var _this = this;
        _this.$confirm('是否要删除此商品', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
            //删除
             _this.$http.post("/TbItem/delete",{
                  id:row.id,
             }).then((responese)=>{
               window.console.log(responese)
               if(responese.data.success=="success") {
                 //弹出消息提示框并跳转到列表页
                 _this.$message({
                   title: '',
                   message: '删除成功',
                   type: 'success',
                   center: true

                 });
                 this.getUserList();
               }

             });
        })

      }
  },
    mounted(){
      this.getUserList();
      /*this.$http.get("http://mockjs.com/api/posts").then(res => {
        console.log(res);
      });*/

    }
  }
</script>

