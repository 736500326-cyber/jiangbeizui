$("#book").turn({
    width: 1200,
    height: 1600,
    autoCenter: true,
    elevation:50,
    gradients:true
});
$("#next").click(()=>$("#book").turn("next"));
$("#prev").click(()=>$("#book").turn("previous"));

// 封面点击：隐藏封面、显示画册、生成左右点击区域
$("#cover-layer").click(function(){
    $(this).fadeOut();
    $("#book-container").show();
    // 创建左右可点击区域
    $("body").append('<div class="left-click-area"></div><div class="right-click-area"></div>');
    // 左侧背景点击上一页
    $(".left-click-area").click(()=>$("#book").turn("previous"));
    // 右侧背景点击下一页
    $(".right-click-area").click(()=>$("#book").turn("next"));
});
