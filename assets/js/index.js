$(function () {
  getUserInfo()

  //退出板块
  const layer = layui.layer
  //点击按钮，实现退出功能
  $('#btnLogout').on('click', function () {
    //提示用户是否确定退出
    layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
      //1.清空
      localStorage.removeItem('token')
      //2.重新跳转登录页面
      location.href = '/login.html'
      // 关闭confirm 询问框
      layer.close(index)
    })
  })

  //获取用户信息
  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        //console.log(res)
        if (res.status !== 0) return
        renderAvatar(res.data)
      },
    })
  }

  //渲染用户头像
  function renderAvatar(user) {
    //1.获取用户的名称
    const name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需渲染用户头像
    if (user.user_pic !== null) {
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()
    } else {
      $('.layui-nav-img').hide()
      const first = name[0].toUpperCase()
      $('.text-avatar').html(first).show()
    }
  }
})
