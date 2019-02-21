
// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:0,
    img: "/images/gobg.png",
    maskHidden: false,
    answer: null,
    testList: null,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.score)
    if (options.score > 120){
      this.setData({
        score: 120,
      })
    }else{
      this.setData({
        score: options.score,
      })

    }

    //console.log(this.data.score)


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
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    //创建画布，并填充颜色，设置大小
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#A62116")
    context.fillRect(30, 0, 305, 667)
    //上传海报背景图
    var path = "/images/gobg.png";
    context.drawImage(path, 0, 0, 375, 667);
    //绘制分数
    context.setTextAlign('center')    // 文字居中
    context.setFillStyle('black')  // 文字颜色：黑色
    context.setFontSize(80)         // 文字字号：22px
    context.fillText(this.data.score + "分", 182, 340)




    //绘制头像

    //context.drawImage(path1, 32, 160, 310, 310); // 在刚刚裁剪的园上画图
    context.draw();

    context.save(); // 保存当前context的状态
    context.stroke();

    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },

  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '你的测试报告已保存到相册啦~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              //console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          }, fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },

  //点击生成
  formSubmit: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '努力计算中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 1000)
  },

  clickSubmit: function (e) {
    wx.redirectTo({
      url: '/pages/index/index',
    })
    
  }
})