$(function() {

    // 请求所有文章类别
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // 模板引擎渲染页面
            $('table>tbody').html(template('category_list', backData));
        }
    });

    // 给模态框注册弹出事件
    $('#exampleModal').on('show.bs.modal', function(e) {
        if ($(e.relatedTarget).text() == '新增分类') {
            $('.modal-confirm').text('新增');
        } else {
            $('.modal-confirm').text('编辑');
            // 获取他父亲的哥哥的哥哥的文本
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text());
            // 获取他父亲哥哥的文本
            $('#message-text').val($(e.relatedTarget).parent().prev().text());
            // 取出id值，赋值给确认按钮
            $('.modal-confirm').attr('data-id', $(e.relatedTarget).attr('data-id'));

        }
    })

    // 给模态框注册点击取消事件
    $('.modal-cancel').click(function() {
        // 点击取消清空value
        $('#recipient-name').val('')
        $('#message-text').val('')
    })

    // 给模态框注册点击确定事件
    $('.modal-confirm').click(function() {
        if ($('.modal-confirm').text() == '新增') {
            // 请求新增ajax
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: {
                    // 优化去空格
                    name: $('#recipient-name').val().trim(),
                    slug: $('#message-text').val().trim()
                },
                success: function(backData) {
                    console.log(backData);
                    if (backData.code == 201) {
                        alert('新增成功');

                        // 刷新页面
                        window.location.reload();
                    }
                }
            });
        } else {
            // 请求编辑ajax
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: {
                    // 优化去空格
                    name: $('#recipient-name').val().trim(),
                    slug: $('#message-text').val().trim(),
                    id: $('.modal-confirm').attr('data-id')
                },
                success: function(backData) {
                    console.log(backData)
                    if (backData.code == 200) {
                        alert('编辑成功');

                        window.location.reload();
                    }

                }
            });
        };
    });


    // 删除分类
    $('table>tbody').on('click', '.btn-delete', function() {

        $(this).attr('data-id')

        // $(this).parents('tr').remove();

        // 优化删除确定框
        if (confirm('是否删除')) {
            $.ajax({
                url: BigNew.category_delete,
                type: 'post',
                dataType: 'json',
                data: {
                    id: $(this).attr('data-id')
                },
                success: function(backData) {

                    alert('删除成功');
                    window.location.reload();
                    // backData.code == 204
                }
            });
        }

    });
});