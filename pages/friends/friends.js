// pages/friends/friends.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_img: ["../../image/pic1.jpg", "../../image/pic2.jpg", "../../image/pic3.jpg",
     "../../image/pic4.jpg", "../../image/pic5.jpg"],
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:300,
    content:[],
    url: app.globalData.BASE_URL + "/upload/",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow")
    const that=this;
    wx.request({
      url: app.globalData.BASE_URL +"/getAllFriends",
      success:function(res){
        if(res.data.data.length==0){
          console.log("暂时没有数据！！")
        }else{
          that.setData({
            content: res.data.data,
          })
        }
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})