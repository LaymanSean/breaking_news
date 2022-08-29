$(function () {
  $(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
      $('.login-box').hide()
      $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
      $('.login-box').show()
      $('.reg-box').hide()
    })
  })

  //从layui中获取form 对象
  const form = layui.form
  //通过form.verify()函数自定义校验规则
  form.verify({
    //自定义了一个叫做pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    //验证密码
    repwd: function (value) {
      const pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) return '两次密码不一致'
    },
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()

    // 2. 发起Ajax的POST请求
    const data = {
      username: $('#form_reg [name=username]').val().trim(),
      password: $('#form_reg [name=password]').val().trim(),
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link_login').click()
      $('#form_reg [name=username]').val('')
      $('#form_reg [name=password]').val('')
      $('#form_reg [name="repassword"]').val('')
    })
  })

  //监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('登录失败！')
        layer.msg('登录成功！')
        //存储token本地
        localStorage.setItem('token', JSON.stringify(res.token))
        location.href = '/index.html'
      },
    })
  })
})
