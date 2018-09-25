// pages/storageConsole/storageConsole.js

const app = getApp()

Page({

  data: {
    score:'',
    state:'',
    fileid:'',
    imagepath:'',
    fileID: '',
    cloudPath: '',
    imagePath: '',
  },

  onLoad: function (options) {

    const {
      fileID,
      cloudPath,
      imagePath,
    } = app.globalData

    this.setData({
      fileID,
      cloudPath,
      imagePath,
    })

    console.group('文件存储文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    console.groupEnd()
  },

  onAdd: function (e) {
    const db = wx.cloud.database()
    db.collection('counters').add({
      data: {
        score: e.detail.value.score,
        state:e.detail.value.state,
        fileid: app.globalData.fileID,
        imagepath: app.globalData.imagePath
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          // sinput: e.detail.value.input
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },


})