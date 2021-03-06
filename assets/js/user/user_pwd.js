$(() => {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位且不能有空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) return '新旧密码不能相同'
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) return '新旧密码不一致'
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layui.layer.msg('更新密码失败')
                return layui.layer.msg('更新密码成功')
                // 重置表单
                // $('.layui-form')[0].reset()
            }
        })
        $('.layui-form')[0].reset()

    })
})
