const utils = require("../../utils/util")
const amap = require("../../utils/amap-wx.130")
const time = new Date
// oAG4L5q1vx6s_5eYT_L57Xhsvx5Q
Page({
  data: {
    isFirst: true,
    adSuccess: false,
    outSuccess:false,
    goAd: false,
    goOut: false,
    address: '',
    adTime: '',
    longitude: '',
    latitude: '',
    inAdPlace: true
  },

  onLoad: function (options) {
    this.setTitle()
  },
  onShow(){
    this.checkLocation()
    setTimeout(()=>{
      this.setData({
        isFirst: wx.getStorageSync('isFirst')
      })
    },1000)  
    this.isAttendance()
  },
  //设置页面标题
  setTitle() {
    wx.setNavigationBarTitle({
      title: `考勤(${utils.formDate(new Date)})`
    })
  },
  //计算两点之间距离
  Distance(start_lat, start_lon, end_lat, end_lon) {
    let radLat1 = (start_lat * Math.PI) / 180.0;
    let radLat2 = (end_lat * Math.PI) / 180.0;
    let a = radLat1 - radLat2;
    let b = (start_lon * Math.PI) / 180.0 - (end_lon * Math.PI) / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // 地球半径;
    s = Math.round(s * 10000) / 10000;
    return s;
  },
  //今日是否考勤
  isAttendance(){
    const that = this
    const hour = time.getHours()
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(()=>{
      wx.request({
        url: 'http://10.197.38.27:8000/attendance/face/',
        method:'PUT',
        data:{
          openid:wx.getStorageSync('open_id'),
          date:utils.formDate(new Date)
        },
        success(res){
          if(res.data.isAd===true){
            if(hour>=0 && hour<13){
              that.setData({
                outSuccess:false,
                adTime:res.data.data.attendance_time,
                adSuccess:true,
                goAd: false,
                goOut: false,
              })
            }else{
              if(res.data.data.attendance_out_time!=="00:00:00"){
                that.setData({
                  adSuccess:false,
                  adTime:res.data.data.attendance_out_time,
                  outSuccess:true,
                  goAd: false,
                  goOut: false,
                })
              }else{
                that.setData({
                  adSuccess:false,
                  adTime:res.data.data.attendance_out_time,
                  outSuccess:false,
                  goAd: false,
                  goOut: true,
                })
              }
            }
          }else{
            if(that.data.isFirst===true){
              that.setData({
                isFirst:true,
                adSuccess: false,
                outSuccess:false,
                goAd: false,
                goOut: false,
              })
            }else {
              that.setData({
                adSuccess:false,
                adTime:'00:00:00',
                outSuccess:false,
                goAd: true,
                goOut: false,
              })
            }
          }
        }
      })
      wx.hideLoading()
    },1000)
  },
  //检测是否获得定位权限
  checkLocation() {
    const that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] !== true && res.authSetting['scope.userLocation'] !== undefined) {
          wx.redirectTo({
            url: '/pages/auth/auth?auth_type=定位',
          })
        } else {
          that.getLocation()
        }
      }
    })
  },
  //  获取定位，经纬度和地名
  getLocation() {
    wx.showLoading({
      title: '加载中',
    })
    const that = this
    const AMap = new amap.AMapWX({
      key: 'ed3f8f1e8b4349b2d815ff66b90e5304'
    })
    wx.getLocation({
      success() {
        AMap.getRegeo({
          success(data) {
            that.setData({
              address: data[0].name,
              latitude: data[0].latitude,
              longitude: data[0].longitude
            })
            //获取数据库中的考勤信息
            wx.request({
              url: 'http://10.197.38.27:8000/attendance/',
              method: 'GET',
              success(res) {
                const coordinate = res.data.attendance_coordinate.split(',')
                const distance = that.Distance(coordinate[1], coordinate[0], that.data.latitude, that.data.longitude)
                if (distance < 50) {
                  that.setData({
                    inAdPlace: true
                  })
                } else {
                  that.setData({
                    inAdPlace: false
                  })
                }
                wx.hideLoading()
              }
            })
          },
          fail(err) {
            console.log(err)
          }
        })
      },
      fail(err) {
        wx.showModal({
          title: '提示',
          content: '请打开定位权限',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/auth/auth?auth_type=定位',
              })
            }
          }
        })
      }
    })
  },

//采集信息
  collectInfo() {
    wx.redirectTo({
      url: '/pages/checkinfo/checkinfo',
    })
  },
  //考勤
  goToAd() {
    if (this.data.inAdPlace) {
      //获取摄像头权限
      wx.authorize({
        scope: 'scope.camera',
        success() {
          wx.redirectTo({
            url: '/pages/camera/camera?type=ad',
          })
        },
        //获取失败去开启摄像头
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
    } else {
      wx.showToast({
        title: '不在考勤范围',
        icon: 'error'
      })
    }
  },
  //签退
  goToOutAd() {
    if (this.data.inAdPlace) {
      //获取摄像头权限
      wx.authorize({
        scope: 'scope.camera',
        success() {
          wx.redirectTo({
            url: '/pages/camera/camera?type=out',
          })
        },
        //获取失败去开启摄像头
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
    } else {
      wx.showToast({
        title: '不在考勤范围',
        icon: 'error'
      })
    }
  }
})