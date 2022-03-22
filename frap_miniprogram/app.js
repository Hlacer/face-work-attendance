// app.js
App({
  onLaunch() {
    wx.showLoading({
      title: '加载中'
    })
    this.login()
  },
  login() {
    const that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://10.197.48.99:8000/userinfo/openid/',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              code: res.code
            },
            success(res) {
              if(res.data.isOpenId===true){
                wx.setStorageSync("open_id",res.data.openid)
                wx.setStorageSync("isFirst",false)
              }else{
                wx.setStorageSync("open_id",res.data.openid)
                wx.setStorageSync("isFirst",true)
              }
              wx.hideLoading()
            },
            fail(){
              wx.showToast({
                title: '网络超时！',
                icon:"error"
              })
            },
            error(err) {
              console.log(err)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  checkFirst(){
    wx.request({
      url: 'http://10.197.38.27:8000/userinfo/check/',
      method:'POST',
      data:{
        open_id:wx.getStorageSync('open_id')
      },
      success(res){
        console.log(res)
        wx.setStorageSync('isFirst', res.data.isFirst)
      }
    })
  },
})
