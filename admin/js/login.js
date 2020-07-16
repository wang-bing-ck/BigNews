// 入口函数
$(function() {
    $('.input_sub').click(function(e) {
        // 阻止默认行为
        e.preventDefault();
        var username = $('.input_txt').val().trim();
        var password = $('.input_pass').val().trim();

        // 必须要加非空判断
        if (username.length == 0 || password.length == 0) {
            $('.modal-body>p').text('想啥呢，没有输入账号密码');
            $('#myModal').modal({
                keyboard: true
            });
            return;
        }

        // 接口
        $.ajax({
            url: BigNew.user_login,
            type: 'post',
            dataType: 'json',
            data: {
                username: username,
                password: password
            },
            success: function(backData) {
                console.log(backData);
                if (backData.code == 200) {
                    // 模态框
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal({
                        keyboard: true
                    })
                    $('#myModal').on('hidden.bs.modal', function(e) {

                        // 储存token令牌
                        localStorage.setItem('token', backData.token)
                            // 跳转页面
                        window.location.href = './index.html';
                    })
                } else {
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal({
                        keyboard: true
                    })
                }
            }
        });
    })
})