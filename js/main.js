$("#book").turn({
    width: 900,
    height: 1200,
    autoCenter: true,
    elevation:50,
    gradients:true
});
$("#next").click(()=>$("#book").turn("next"));
$("#prev").click(()=>$("#book").turn("previous"));

// 封面跳转逻辑保留
$("#cover-layer").click(function(){
    $(this).fadeOut();
    $("#book-container").show();
    $("body").append('<div class="left-click-area"></div><div class="right-click-area"></div>');
    $(".left-click-area").click(()=>$("#book").turn("previous"));
    $(".right-click-area").click(()=>$("#book").turn("next"));
});
