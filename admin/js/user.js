$(function() {
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            console.log(backData);
            // // 用户名称
            // $('.username').val(backData.data.username);
            // // 用户昵称
            // $('.nickname').val(backData.data.nickname);
            // // 邮箱
            // $('.email').val(backData.data.email);
            // // 密码
            // $('.password').val(backData.data.password);

            // 遍历对象语法解决代码冗余
            for (var key in backData.data) {
                $('.' + key).val(backData.data[key]);
            };
            // 头像
            $('.user_pic').attr('src', backData.data.userPic);
        }
    });

    // 文件预览
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function() {
        //1.2 获取用户选择的图片
        //1.3 将文件转为src路径
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', URL.createObjectURL(this.files[0]));
    });


    // 文件上传
    $('.btn-edit').on('click', function(e) {
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('form')[0])
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function(backData) {
                // 修改成功
                if (backData.code == 200) {
                    alert(backData.msg);
                    // 由于页面嵌套原因
                    // window : 当前页面      user.html
                    // window.parent: 父页面  index.html
                    // 需要刷新父页面
                    window.parent.location.reload();
                } else {
                    alert(backData.msg);
                };

            }
        });
    });
});