$(function() {
    // 获取所有类别
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // 渲染页面
            $('.category').html(template('data-List', backData));
        }
    });


    // 获取编辑信息
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        dataType: 'json',
        data: {
            id: window.location.href.split('=')[1]
        },
        success: function(backData) {

            // 渲染页面信息
            $('.title').val(backData.data.title);
            $('.category').val(backData.data.categoryId);
            $('.jeinput').val(backData.data.date);
            $('.cover').attr('src', backData.data.cover);

            // 调用插件的方法，直接添加
            editor.txt.html(backData.data.content);
        }
    });


    // 文件预览
    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function() {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.cover').attr('src', url);
    });

    // 文件上传
    // 修改文章
    $('.btn-edit,.btn-draft').on('click', function(e) {
        // jq语法判断类名，为true则已发布，为false则草稿
        var state = $(this).hasClass('btn-edit') ? '已发布' : '草稿';

        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        // 只会取出表单中有name得属性
        var fd = new FormData($('form')[0]);
        // console.log(fd)
        // 获取不到的需要手动添加
        fd.append('id', window.location.href.split('=')[1]);
        fd.append('date', $('#testico').val());
        fd.append('state', state);
        fd.append('content', editor.txt.html());

        // 请求修改
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function(backData) {
                // console.log(backData)
                if (backData.code == 200) {
                    alert(backData.msg);
                    // 修改后跳转回列表页
                    window.location.href = './article_list.html';
                };
            }
        });
    });
});