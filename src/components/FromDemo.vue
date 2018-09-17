<template>
  <el-container style="height:850px; border: 1px solid #eee">
    <el-main>
            <el-form ref="form" :model="form"  class="myForm"   :label-position="labelPosition" label-width="80px">
              <el-row>
                  <el-form-item label="商品类别">
                      <el-input   class="myinput" v-model="form.parentName"  placeholder="请选择商品分类" >
                        <i slot="suffix" class="el-icon-plus el-icon--right" @click="showDialog"></i>
                      </el-input>
                  </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="标题">
                  <el-input   class="myinput" v-model="form.title" ></el-input>

                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="商品卖点">
                  <el-input   class="myinput" v-model="form.sell_point" ></el-input>

                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="条形码">

                  <el-input   class="myinput" v-model="form.barcode" ></el-input>

                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="商品价格">
                  <el-input   class="myinput" v-model="form.price" ></el-input>

                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="库存数量">
                  <el-input  type="number"  min ="1" class="myinput" v-model="form.num" ></el-input>

                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="商品图片">
                  <el-upload
                    class="upload-demo"
                    action="/TbItem/uploadFile"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button  class="mybutton">上传图片  <i class="el-icon-upload el-icon--right"></i></el-button>
                  </el-upload>
                </el-form-item>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="goToList" >取消</el-button>
              </el-form-item>
            </el-form>

      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center  class="myDialog">

        <el-tree :data="treeData"   @node-click="handleNodeClick" ></el-tree>
        <span slot="footer" class="dialog-footer">
             <el-button @click="centerDialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
      </el-main>
  </el-container>
</template>

<style>
  .myForm{
    width:680px !important;
    margin-left:400px;
  }
  .myDialog{
    overflow: auto;
  }
  .myinput{
    width:60%;
    float:left
  }
  .mybutton{
    float:left;
    margin-left:10px
  }
  .upload-demo{
    float:left;
    margin-left:10px
  }

</style>

<script>

    export default {
      name:'FromDemo',
      data() {
        return {
          labelPosition: 'right',
          centerDialogVisible: false,
          treeData: [],
          fileList: [] ,//上传的图片
          form: {
            cid: '',//商品分类id
            title: '',//商品标题
            sell_point: '',//商品卖点
            price: '',//价格
            num: 1,//库存数量
            barcode:'',//条形码
            image:[],//上传的图片
            status: 1,//商品状态 1：正常，2下架,3 删除
          }
        }
      },
      methods: {
        getTreedata(){
          var _this=this
          //动态获取树形数据
          this.$http.get('/TbItemCart/ItemCatTree').then(function(responese){
            _this.treeData=responese.data.data;

          })
        },
        showDialog(){
          var _this=this
          _this.centerDialogVisible=true;
        },
        handleNodeClick(data) {
             var _this=this
             _this.form.cid=data.id
             _this.form.parentName=data.label
             _this.centerDialogVisible=false;
             window.console.log(data)
        },
        handleRemove(file, fileList){
          var _this=this
          window.console.log(fileList)
        },
        handleSuccess(response, file, fileList){
            var _this=this
          _this.form.image=fileList
           window.console.log(_this.form.image)
           window.console.log(response.fileName)

        },
        onSubmit(){
          //表单提交
          var _this=this
          var imagePath=""
          var url="http://localhost:8089/upload/"
          for(var i=0;i<_this.form.image.length;i++){
            imagePath+=""+url+_this.form.image[i].name+","
          }
          this.$http.post('/TbItem/save',
            {
               cid:_this.form.cid,
               title:_this.form.title,
               sellPoint:_this.form.sell_point,
               price:_this.form.price,
               barcode:_this.form.barcode,
               status:_this.form.status,
               num:_this.form.num,
               image:imagePath
             }
          ).then(function(responese){
            window.console.log(responese)
            if(responese.data.success=="success"){
              //弹出消息提示框并跳转到列表页
              _this.$message({
                title: '',
                message: '保存成功',
                type: 'success',
                center: true

              });
              _this.$router.push({ path: '/' });

            }

          })
        },
        goToList(){
          var _this=this
          _this.$router.push({ path: '/' });
        },
        getMockTreeData(){ //测试treeData
          this.$http.get("http://mockjs.com/api/treeposts").then(res => {
            console.log(res);
            var _this=this
            _this.treeData=res.data.posts
          });

        }
      },
      mounted(){
         this.getTreedata();
         //this.getMockTreeData();
      }
    }
</script>
