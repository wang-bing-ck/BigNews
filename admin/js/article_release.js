$(function() {
    // 渲染已有类别
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            console.log(backData)
            $('.category').html(template('list_List', backData));
        }
    });

    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function() {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });

    // 优化获取焦点清空value值
    $('.title').focus(function() {
        $(this).val('');
    });


    // 发布文章
    $('.btn-release,.btn-draft').on('click', function(e) {
        //禁用表单默认提交事件
        var state = $(this).hasClass('btn-release') ? '已发布' : '草稿';
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('form')[0]);

        // 手动添加属性
        fd.append('state', state);
        fd.append('content', editor.txt.html());
        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function(backData) {
                if (state == '已发布') {
                    if (backData.code == 200) {
                        alert('文章发布成功');
                        window.location.href = './article_list.html';
                    };
                } else {
                    if (backData.code == 200) {
                        alert('文章已存至草稿箱');
                        window.location.href = './article_list.html';
                    };
                };
            }
        });
    });
});