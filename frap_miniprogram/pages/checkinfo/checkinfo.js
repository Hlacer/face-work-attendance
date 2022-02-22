const app = getApp()

Page({
    data: {
        open_id: ""
    },

    onLoad: function () {
        // 获取openid
       this.setData({open_id:wx.getStorageSync('open_id')})
    },
    // 验证用户信息，同时存入openid，完成微信绑定
    checkUser(data){
        const that = this
        wx.request({
            url: 'http://192.168.0.114:8000/userinfo/openid/',
            method: 'PUT',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                user_id:data.user_id,
                user_name:data.user_name,
                user_dept:data.user_dept,
                wechat_openid:that.data.open_id
            },
            success(res){
                //验证成功 验证是否打开摄像头权限
                if(res.data.code===true){
                    wx.showModal({
                      title:"提示",
                      content:res.data.message,
                      showCancel:false,
                      success(res){
                          if(res.confirm){
                            //   打开摄像头跳转到信息采集页面
                            wx.authorize({
                                scope: 'scope.camera',
                                success() {
                                    wx.redirectTo({
                                        url: '/pages/camera/camera?type=collect',
                                    }) 
                                },
                                //么有摄像头权限跳转到授权页
                                fail() {
                                  wx.showModal({
                                    content: "请授权开启摄像头",
                                    showCancel: false,
                                    success(res) {
                                      if (res.confirm) {
                                        wx.navigateTo({
                                          url: '/pages/auth/auth?auth_type=摄像头',
                                        })
                                      }
                                    }
                                  })
                                }
                              })
                          }
                      }
                    })
                }else{
                    // 验证失败给出提示
                    wx.showModal({
                        title:"提示",
                        content:res.data.message,
                        showCancel:false
                    })
                }
            },
            fail(){
                wx.showToast({
                  title: '网络异常',
                  icon:"error"
                })
            }
        })
    },
    formSubmit(e) {
        const that = this
        const data = e.detail.value
        if (data.user_id === '' || data.user_name === '' || data.user_dept === '' || data.user_gender === '' || data.user_phone === '') {
            wx.showToast({
                title: '请填写完整',
                icon:"none"
            })
        }else{
            this.checkUser(data)
        }
    },
})