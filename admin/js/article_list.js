$(function() {

    // 获取所有类别
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // 渲染所有类别页面
            $('#selCategory').html(template('list_List', backData));
        }
    });

    // 点击筛选按钮、
    $('#btnSearch').click(function(e) {
        // 阻止跳转
        e.preventDefault();
        // $.ajax({
        //     url: BigNew.article_query,
        //     type: 'get',
        //     dataType: 'json',
        //     data: {
        //         type: $('#selCategory').val(),
        //         state: $('#selStatus').val(),
        //         page: 1,
        //         perpage: 10
        //     },
        //     success: function(backData) {
        //         // 渲染新闻页面
        //         $('table>tbody').html(template('query_List', backData));

        //         // 调用插件函数
        //         requestPagination(backData.data.totalPage, 1)
        //     }
        // });

        // 调用请求数据函数并传参
        requestList(1);
    });

    // 页面一加载请求数据
    $('#btnSearch').click();


    // 函数封装
    // 请求数据函数（起始页）
    function requestList(page) {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: page,
                perpage: 10
            },
            success: function(backData) {
                // 渲染新闻页面
                $('table>tbody').html(template('query_List', backData));

                // 调用插件函数并传参（ 总页数， 起始页）
                requestPagination(backData.data.totalPage, page);

                // requestPagination(backData.data.totalPage, page)
            }
        });
    };

    // 插件封装
    function requestPagination(totalPage, startPage) {
        // 分页插件
        // 先销毁旧插件
        $('#pagination').twbsPagination('destroy');
        // 重新加载新插件
        $('#pagination').twbsPagination({
            // 接受服务器返回的数据的总页数
            totalPages: totalPage, //总页数
            visiblePages: 8, //可见页数
            startPage: startPage, //起始页
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function(event, page) {
                $('#page-content').text('Page ' + page);
                // 调用函数
                // 当起始页与当前获取页数一样是，不在执行
                if (startPage != page) {
                    requestList(page);
                };

            }
        });
    };

    // 文章删除
    $('table>tbody').on('click', '.btn-delete', function() {
        if (confirm('是否删除')) {
            $.ajax({
                url: BigNew.article_delete,
                type: 'post',
                dataType: 'json',
                data: {
                    id: $('.btn-delete').attr('data-id')
                },
                success: function(backData) {
                    alert(backData.msg);
                    window.location.reload();
                }
            });
        };
    });

    // 点击右上角发布文章，跳转页面



});