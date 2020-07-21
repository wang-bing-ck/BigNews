$(function() {
    // 获取文章类型
    $.ajax({
        url: BigNew.index_category,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // console.log(backData)
            $('.level_two').html(template('index-category', backData));
        }
    });
    // 热门排行
    $.ajax({
        url: BigNew.index_rank,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // console.log(backData)
            $('.hotrank_list').html(template('index-rank', backData));
        }
    });

    // 最新评论
    $.ajax({
        url: BigNew.index_latest_comment,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // console.log(backData)
            $('.comment_list').html(template('latest-comment', backData));
        }
    });

    // 焦点关注
    $.ajax({
        url: BigNew.index_attention,
        type: 'get',
        dataType: 'json',
        success: function(backData) {
            // console.log(backData)
            $('.guanzhu_list').html(template('index-attention', backData));
        }
    });

})