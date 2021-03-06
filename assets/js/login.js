$(() => {
    //点击去注册账号的链接
    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录的链接
    $('#link_login').on('click', () => {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //从 layui中获取 form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify 自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容 还需要拿到密码框中的内容 进行判断 如果判断失败return错误消息
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', (e) => {
        //1.阻止默认提交行为
        e.preventDefault()
        // 2.发起ajax post请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }

        $.post('/api/reguser', data, (res) => {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功,请登录')
            //自动去登录界面
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('登录失败')
                layer.msg('登陆成功')
                // 将token字符串保存到 localStorage 中
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })

    })

})
//