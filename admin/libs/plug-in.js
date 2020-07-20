$(function() {
    // 日期插件
    jeDate("#testico", {
        valiDate: ["0[4-7]$,1[1-5]$,2[58]$", true],
        format: "YYYY年MM月DD日",
        isinitVal: true,
        zIndex: 10002
    });


    // 富文本插件
    var E = window.wangEditor;
    //把创建的editor作为全局变量
    window.editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();
})