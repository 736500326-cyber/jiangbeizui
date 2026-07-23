$("#book").turn({
    width: 1200,
    height: 1600,
    autoCenter: true,
    elevation:50,
    gradients:true
});
$("#next").click(()=>$("#book").turn("next"));
$("#prev").click(()=>$("#book").turn("previous"));
