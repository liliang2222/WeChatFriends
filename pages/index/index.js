//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgPaths: ["../../image/add.png"],
  },

  onLoad: function () {
 
  },
  selectPic:function(event){
    console.log("点击事件:" + event.currentTarget.dataset['index']);
    var clickPos = event.currentTarget.dataset['index'];
    var that=this;
    if (clickPos =="../../image/add.png"){
      //点击选择图片
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          console.log("选择的图片路径:"+res.tempFilePaths);
          res.tempFilePaths.push("../../image/add.png");
          that.setData({
            imgPaths: res.tempFilePaths,
          })
        },
      })
    }else{
      //预览
      wx.previewImage({
        urls: that.data.imgPaths,
      })
    }
  },
  
  upload:function(){
    console.log("上传");
    var that = this;
    for(var i=0;i<this.data.imgPaths.length-1;i++){
      console.log("图片路径："+this.data.imgPaths[i]);
      this.uploadFile(this.data.imgPaths[i]);
    }
  
  },
  uploadFile(path){
    wx.uploadFile({
      url: 'http://127.0.0.1:8080/wechat/fileUpload2',
      filePath: path,
      name: 'file',
      header:{
        'content-type':'multipart/form-data',
      },
      success:function(res){
        console.log("上传成功："+res.data);
      },
      fail:function(res){
        console.log("上传失败:"+res.data);
      }
    })
  }

})
