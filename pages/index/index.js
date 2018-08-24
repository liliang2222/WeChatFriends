//index.js
//获取应用实例
const app = getApp();
var utils=require("../../utils/util.js");
Page({
  data: {
    imgPaths: ["../../image/add.png"],
    pathFromServer:"",
    uploadFinish:0,
    totalImg:0,
    content:"",
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
          that.data.totalImg=res.tempFilePaths.length;
          console.log("总共需要上传的图片有:"+that.data.totalImg+"张!");
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
    if(this.data.imgPaths.length>1){
      this.uploadFile(this.data.imgPaths[0]);
    }
  },
  uploadFile(path){
    var that = this;
    wx.uploadFile({
      url: 'http://127.0.0.1:8080/wechat/fileUpload2',
      filePath: path,
      name: 'file',
      header:{
        'content-type':'multipart/form-data',
      },
      success:function(res){
        that.data.uploadFinish++;
        console.log("路径"+res.data);
        that.data.pathFromServer += (res.data + ",");
        if(that.data.uploadFinish!=that.data.totalImg){
          //还没有上传完成
          that.uploadFile(that.data.imgPaths[that.data.uploadFinish])
        }else{
          //所有图片已上传
          console.log("上传成功,图片路径：" + that.data.pathFromServer);
          that.publish();
        }
      },
      fail:function(res){
        console.log("上传失败:"+res.data);
      }
    })
  },
  publish(){
    wx.request({
      url: 'http://127.0.0.1:8080/wechat/publish',
      data:{
        "paths":this.data.pathFromServer,
        "content":this.data.content,
        "create_date": utils.formatTime(new Date()),
      },
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success:function(res){
        console.log("发表成功：" + res.data + "时间：" + utils.getDateDiff(utils.getDateTimeStamp(utils.formatTime(new Date()))));
      }
    })
  },
  getInput:function(e){
    this.setData({
      content:e.detail.value,
    })
  }

})
