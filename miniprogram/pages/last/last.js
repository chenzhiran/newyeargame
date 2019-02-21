const db = wx.cloud.database()
const testInfo = db.collection('testInfo')

// pages/last/last.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      score: options.score
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    //查找题库
    testInfo.where({
      _id: "XFFa7YnnuWjciwRv",
    }).get().then(res => {
      //console.log(res.data[0]);
      this.setData({
        page: "/images/page10.png",
        title: res.data[0].title,
        a: res.data[0].a,
        b: res.data[0].b,
        c: res.data[0].c,
        d: res.data[0].d,
        e: res.data[0].e
      })
      wx.hideLoading()
    })

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

  },

  //点击测试跳转
  onTapTest() {
    this.setData({
      score: parseInt(this.data.score) + 30,
    })

    wx.redirectTo({
      url: '/pages/result/result?score=' + this.data.score,
    })
  },
})