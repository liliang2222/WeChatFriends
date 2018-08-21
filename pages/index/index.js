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
      wx.chooseImage({
        count: 3, // 默认9
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
      wx.previewImage({
        urls: that.data.imgPaths,
      })
    }
  }

})
