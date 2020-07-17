$(function() {

    // 渲染页面
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // 头像
            $('.user_info>img').attr('src', backData.data.userPic);
            // 名字
            $('.user_info>span').text(backData.data.nickname);
            // 头像
            $('.user_center_link>img').attr('src', backData.data.userPic);
        }
    });

    // 退出登录
    $('.logout').click(function() {
        localStorage.removeItem('token');
        window.location.href = './login.html';
    });

    // 导航栏点击事件
    // 一级导航栏事件
    $('.level01').click(function() {

        // 一级导航栏更改类名
        $(this).addClass('active').siblings().removeClass('active');

        // 当点击文章管理时
        if ($(this).index() == 1) {
            // 显示二级导航栏
            $('.level02').slideToggle();
            // 更改类名修改小图标的角度
            // 语法点：css的transform语法
            $('.level01 b').toggleClass('rotate0')

            // 点击文章管理，自动触发二级导航栏的第一个
            // 注意点：此处click不是jq语法，是原生dom语法
            // 1.jq的click：只能触发注册事件，不能触发默认跳转。
            // 2.原生click：同时触发注册事件 + 默认跳转事件
            // 3.只有a标签才有默认跳转，li元素是没有默认跳转的，所以给a标签注册click
            $('.level02>li:eq(0) a')[0].click();
        } else {
            // 如果点击其他一级菜单，取消所有二级导航栏的高亮
            $('.level02>li').removeClass('active')
        }
    })

    // 二级导航栏点击事件
    $('.level02>li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    })
});