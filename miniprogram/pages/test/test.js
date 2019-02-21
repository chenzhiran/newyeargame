const db = wx.cloud.database()
const testInfo = db.collection('testInfo')
const testNum = ['XFEAZeSiwXKAQov_', 'XFEfYlsqTi00tmbz', 'XFFLXuSiwXKAQoxi', 'XFFLaYnnuWjciwRd', 'XFFLbVsqTi00tmce', 'XFFLcYnnuWjciwRe', 'XFFLdeSiwXKAQoxj', 'XFFLeVsqTi00tmcf', 'XFFLfFsqTi00tmcg', 'XFFLgHkPDdDCJ4WG', 'XFFLh-SiwXKAQoxk', 'XFFLhFsqTi00tmch', 'XFFLjOSiwXKAQoxl', 'XFFLk1sqTi00tmci', 'XFFLkHkPDdDCJ4WH', 'XFFLl-SiwXKAQoxm', 'XFFLm3kPDdDCJ4WI','XFFLn1sqTi00tmcj']

// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:0,
    i:2,
    j: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onRandom()

    wx.showLoading({
      title: '数据加载中...',
    })
    //查找题库
    testInfo.where({
      _id: testNum[this.data.j],
      //_id: "XFEAZeSiwXKAQov_",
    }).get().then(res => {
      //console.log(res.data[0]);
      this.setData({
        page: "/images/page1.png",
        title: res.data[0].title,
        a: res.data[0].a,
        b: res.data[0].b,
        c: res.data[0].c
      })
      wx.hideLoading()
    })
   

  },

  onRandom(){
    //Math.random()大于等于 0.0 且小于 1.0;Math.floor() 返回小于或等于一个给定数字的最大整数,randomwei 0-9之间的整数
    var random = Math.floor(Math.random() * 10)
    //console.log(random)
    this.setData({
      j: random
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
  //点击A测试跳转
  onTapTestA() {
    testInfo.where({
      _id: testNum[this.data.j],
    }).get().then(res => {
      //console.log(res.data[0]);
      this.setData({
        answer: res.data[0].answer,
      })
      
      if (res.data[0].alpha == "a") {
        this.setData({
          score: this.data.score + 10
        })
      }
      //console.log(this.data.score)
    })
     //点击后显示
    this.setData({
      answerbtn: "/images/next.png"
    })

  },
  //点击B测试跳转
  onTapTestB() {
    testInfo.where({
      _id: testNum[this.data.j],
    }).get().then(res => {
      //console.log(res.data[0]);
      this.setData({
        answer: res.data[0].answer,
      })

      if (res.data[0].alpha == "b") {
        this.setData({
          score: this.data.score + 10
        })
      }
      //console.log(this.data.score)
    })
    //点击后显示
    this.setData({
      answerbtn: "/images/next.png"
    })

  },
  //点击C测试跳转
  onTapTestC() {
    testInfo.where({
      _id: testNum[this.data.j],
    }).get().then(res => {
      //console.log(res.data[0]);
      this.setData({
        answer: res.data[0].answer,
      })

      if (res.data[0].alpha == "c") {
        this.setData({
          score: this.data.score + 10
        })
      }
      //console.log(this.data.score)
    })
    //点击后显示
    this.setData({
      answerbtn: "/images/next.png"
    })

  },

//点击下一页
  onTapAnswer() {

    if (this.data.i == 10){
      wx.redirectTo({
        url: '/pages/last/last?score=' + this.data.score,
      })
    }
    
    //let j = (this.data.j + Math.floor(Math.random() * 10))%20
    let j = (this.data.j + 1) % 20

    this.setData({
      j: j
    })

  

    wx.showLoading({
      title: '数据加载中...',
    })
    //查找题库
    testInfo.where({
      _id: testNum[this.data.j],
    }).get().then(res => {
      //console.log(res.data[0]);
      
      this.setData({
        answerbtn:null,
        answer:null,
        page: "/images/page"+this.data.i+".png",
        i: this.data.i + 1,
        title: res.data[0].title,
        a: res.data[0].a,
        b: res.data[0].b,
        c: res.data[0].c
      })
      
      wx.hideLoading()
    })
  }



})