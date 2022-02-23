// pages/camera/camera.js
Page({
  data: {
    count: 5,
    isFace: false,
    isOut: false,
    isAd:false,
    btnInfo: "",
    isCollect: false,
    message: ''
  },
  onLoad: function (options) {
    // 根据参数判断是采集信息还是考勤
    if (options.type === "collect") {
      wx.setNavigationBarTitle({
        title: "采集"
      })
      this.setData({
        isCollect: true
      })
      this.showInfo()
    }
    if (options.type === "ad") {
      wx.setNavigationBarTitle({
        title: "考勤"
      })
      this.setData({
        isAd: true
      })
      this.checkCamera()
    }
    if (options.type === "out") {
      wx.setNavigationBarTitle({
        title: "签退"
      })
      this.setData({
        isOut: true
      })
      this.checkCamera()
    }
  },
  // 完成采集后训练模型
  train_models() {
    wx.request({
      url: 'http://192.168.0.114:8000/userinfo/face/',
      method: "GET",
      success(res) {
        console.log(res.data)
      }
    })
  },
  // 采集信息前给出提示
  showInfo() {
    const that = this
    wx.showModal({
      title: "提示",
      content: "为了保证图像采集的准确性，请满足以下条件：免冠、无墨镜、面部清晰、光线均匀",
      showCancel: false,
      success(res) {
        if (res.confirm) {
          that.checkCamera()
        }
      }
    })
  },
  // 验证是否开启摄像头权限
  checkCamera() {
    const that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.camera'] !== true) {
          wx.redirectTo({
            url: '/pages/auth/auth?auth_type=摄像头'
          })
        } else {
          that.takeCamera()
        }
      }
    })
  },
  // 创建摄像头实例
  takeCamera() {
    this.ctx = wx.createCameraContext()
  },
  // 采集信息
  collectFace() {
    const ctx = this.ctx
    const that = this
    wx.showLoading({
      title: '请稍后',
    })
    const timer = setInterval(function () {
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          wx.uploadFile({
            filePath: res.tempImagePath,
            name: 'face_img',
            formData: {
              open_id: wx.getStorageSync('open_id'),
              file_name: "face" + that.data.count
            },
            url: 'http://192.168.0.114:8000/userinfo/face/',
            success(res) {
              wx.hideLoading()
              if (JSON.parse(res.data).code === true) {
                that.setData({
                  isFace: true,
                  count: that.data.count - 1
                })
                if (that.data.count === 0) {
                  clearInterval(timer)
                  that.setData({
                    count: 5
                  })
                  wx.showToast({
                    title: '采集成功',
                    icon: 'success',
                    duration: 3000,
                    success() {
                      wx.setStorageSync('isFirst', false)
                      that.train_models()
                      wx.redirectTo({
                        url: '/pages/index/index',
                      })
                    }
                  })
                }
                // 没有检测到人脸 中断采集过程
              } else {
                clearInterval(timer)
                that.setData({
                  count: 5,
                  isFace: false
                })
                wx.showModal({
                  title: '错误',
                  content: '采集异常,请重试',
                  showCancel: false
                })
              }
            }
          })
        }
      })
    }, 1000)
  },
  // 考勤
  adFace() {
    const ctx = this.ctx
    const that = this
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.uploadFile({
          filePath: res.tempImagePath,
          name: 'face_img',
          formData: {
            type: '考勤',
            open_id:wx.getStorageSync('open_id')
          },
          url: 'http://192.168.0.114:8000/attendance/face/',
          success(res) {
            const data = JSON.parse(res.data)
            if (data.code === true) {
              wx.showToast({
                icon: 'success',
                title: data.message,
                duration: 500,
                success() {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: `/pages/index/index`,
                    })
                  }, 500)
                }
              })
            } else {
              wx.showToast({
                icon: 'error',
                title: data.message,
              })
            }
          }
        })
      }
    })
  },
  // 签退
  adOut() {
    const ctx = this.ctx
    const that = this
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.uploadFile({
          filePath: res.tempImagePath,
          name: 'face_img',
          formData: {
            type: '签退',
            open_id:wx.getStorageSync('open_id')
          },
          url: 'http://192.168.0.114:8000/attendance/face/',
          success(res) {
            const data = JSON.parse(res.data)
            if (data.code === true) {
              wx.showToast({
                icon: 'success',
                title: data.message,
                duration: 500,
                success() {
                  setTimeout(() => {
                    wx.redirectTo({
                      url: `/pages/index/index`,
                    })
                  }, 500)
                }
              })
            } else {
              wx.showToast({
                icon: 'error',
                title: data.message,
              })
            }
          }
        })
      }
    })
  },
})