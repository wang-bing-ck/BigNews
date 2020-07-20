$(function() {

    // 获取评论列表
    $.ajax({
        url: BigNew.comment_list,
        type: 'get',
        dataType: 'json',
        data: {
            page: 1,
            perpage: 10
        },
        success: function(backData) {
            console.log(backData)
                // 渲染页面
            $('table>tbody').html(template('comment-list', backData));

            // 先销毁旧插件
            // $('#pagination').twbsPagination('destroy');
            // 重新加载新插件
            $('#pagination').twbsPagination({
                totalPages: backData.data.totalPage, //总页数
                visiblePages: 8, //可见页数
                startPage: 1, //起始页
                first: '首页',
                prev: '上一页',
                next: '下一页',
                last: '尾页',
                onPageClick: function(event, page) {

                    // 再次渲染
                    $.ajax({
                        url: BigNew.comment_list,
                        type: 'get',
                        dataType: 'json',
                        data: {
                            page: page,
                            perpage: 10
                        },
                        success: function(backData) {
                            $('table>tbody').html(template('comment-list', backData))
                        }
                    });
                }
            });
        }
    });

    // 删除、批准、拒绝
    $('table>tbody').on('click', '.btn-danger,.btn-warning,.btn-info', function() {
        if ($(this).hasClass('btn-warning')) {
            website = BigNew.comment_pass;
        } else if ($(this).hasClass('btn-info')) {
            website = BigNew.comment_reject;
        } else if ($(this).hasClass('btn-danger')) {
            website = BigNew.comment_delete;
        }

        $.ajax({
            url: website,
            type: 'post',
            dataType: 'json',
            data: {
                id: $(this).attr('data-id')
            },
            success: function(backData) {
                console.log(backData)
                if (backData.code == 200) {
                    alert(backData.msg);
                    window.location.reload();
                };
            }
        });
    });
});