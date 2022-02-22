// pages/auth/auth.js
Page({
    data: {
        auth_type: ''
    },
    onLoad: function (options) {
        //根据传参设置相应的授权
        this.setData({
            auth_type: options.auth_type
        })
    },
    auth() {
        const that = this
        //打开授权页
        wx.openSetting({
            success(res) {
                // 授权摄像头
                if (res.authSetting['scope.camera']) {
                    wx.showToast({
                        title: '授权成功',
                        duration: 500,
                        success() {
                            setTimeout(()=>{
                                wx.redirectTo({
                                    url: '/pages/index/index',
                                })
                            }, 500)
                        }
                    })
                    // 授权地理位置
                } else if (res.authSetting['scope.userLocation']) {
                    wx.showToast({
                        title: '授权成功',
                        duration: 500,
                        success() {
                            setTimeout(()=>{
                                wx.redirectTo({
                                    url: '/pages/index/index',
                                })
                            }, 500)
                        }
                    })
                } else {
                    //授权失败提示授权
                    wx.showToast({
                        title: '请先授权！',
                        icon: 'error'
                    })
                }
            }
        })
    },
})