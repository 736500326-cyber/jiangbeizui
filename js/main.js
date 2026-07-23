(() => {
  "use strict";


  /* =====================================
     画册页数
     当前为1.webp—9.webp
     ===================================== */

  const PAGE_COUNT = 9;


  /* =====================================
     自动生成画册图片路径
     结果为：
     images/1.webp
     images/2.webp
     ...
     images/9.webp
     ===================================== */

  const pageImages = Array.from(
    { length: PAGE_COUNT },
    (_, index) => {
      return `./images/${index + 1}.webp`;
    }
  );


  /* =====================================
     获取网页中的元素
     ===================================== */

  const splash =
    document.getElementById("splash");

  const reader =
    document.getElementById("reader");

  const enterBtn =
    document.getElementById("enterBtn");

  const prevBtn =
    document.getElementById("prevBtn");

  const nextBtn =
    document.getElementById("nextBtn");

  const leftHotspot =
    document.getElementById("leftHotspot");

  const rightHotspot =
    document.getElementById("rightHotspot");

  const fullscreenBtn =
    document.getElementById("fullscreenBtn");

  const currentPage =
    document.getElementById("currentPage");

  const totalPages =
    document.getElementById("totalPages");


  /* 设置总页数 */

  totalPages.textContent =
    String(PAGE_COUNT);


  /* 翻页组件实例 */

  let pageFlip = null;


  /* 防止重复创建画册 */

  let bookInitialized = false;


  /* =====================================
     初始化电子画册
     ===================================== */

  function initBook() {

    /* 已经初始化后不再重复初始化 */

    if (bookInitialized) {
      return;
    }


    /* 检查翻页组件是否加载成功 */

    if (
      !window.St ||
      !window.St.PageFlip
    ) {
      alert(
        "翻页组件加载失败，请检查网络后刷新页面。"
      );

      return;
    }


    /* ===================================
       创建翻页组件

       原图尺寸：
       2362 × 3153

       原图比例：
       2362 ÷ 3153 ≈ 0.749

       网页基础尺寸：
       749 × 1000

       比例基本一致，因此不会拉伸
       =================================== */

    pageFlip = new St.PageFlip(
      document.getElementById("book"),
      {

        /* 单页基础宽度 */

        width: 749,


        /* 单页基础高度 */

        height: 1000,


        /*
          stretch：
          根据屏幕大小自动等比例调整
        */

        size: "stretch",


        /* 最小单页宽度 */

        minWidth: 280,


        /* 最大单页宽度 */

        maxWidth: 749,


        /* 最小单页高度 */

        minHeight: 374,


        /* 最大单页高度 */

        maxHeight: 1000,


        /*
          第一页作为封面单独显示
          后续页面双页展开
        */

        showCover: true,


        /*
          手机竖屏时使用单页模式
        */

        usePortrait: true,


        /*
          自动调整画册容器大小
        */

        autoSize: true,


        /*
          手机滑动画册时禁止网页滚动
        */

        mobileScrollSupport: false,


        /*
          是否显示翻页阴影
        */

        drawShadow: true,


        /*
          阴影透明度
          数值范围0—1
        */

        maxShadowOpacity: 0.38,


        /*
          翻页动画时间
          单位：毫秒
        */

        flippingTime: 820,


        /*
          允许页面中的点击事件
        */

        clickEventForward: true,


        /*
          手机滑动多少距离触发翻页
        */

        swipeDistance: 24,


        /*
          鼠标经过页面角落时
          显示翻页效果
        */

        showPageCorners: true,


        /*
          允许点击页面翻页
        */

        disableFlipByClick: false
      }
    );


    /* =====================================
       加载1.webp—9.webp
       ===================================== */

    pageFlip.loadFromImages(pageImages);


    /* =====================================
       每次翻页后更新页码
       ===================================== */

    pageFlip.on(
      "flip",
      (event) => {

        /*
          event.data从0开始计算

          第1页：
          event.data = 0

          所以显示时需要加1
        */

        const index =
          Number(event.data) || 0;

        currentPage.textContent =
          String(index + 1);
      }
    );


    /* 标记为已初始化 */

    bookInitialized = true;
  }


  /* =====================================
     打开电子画册
     ===================================== */

  function openReader() {

    /* 初始化画册 */

    initBook();


    /* 显示阅读区域 */

    reader.classList.add(
      "is-active"
    );


    reader.setAttribute(
      "aria-hidden",
      "false"
    );


    /* 开屏封面执行离场动画 */

    splash.classList.add(
      "is-leaving"
    );


    /*
      进入动画过程中重新计算画册尺寸
      避免画册位置偏移
    */

    setTimeout(
      () => {
        window.dispatchEvent(
          new Event("resize")
        );
      },
      180
    );


    /*
      开屏动画完成后彻底隐藏封面
    */

    setTimeout(
      () => {

        splash.hidden = true;

        window.dispatchEvent(
          new Event("resize")
        );

      },
      720
    );
  }


  /* =====================================
     上一页
     ===================================== */

  function flipPrev() {

    if (pageFlip) {
      pageFlip.flipPrev();
    }
  }


  /* =====================================
     下一页
     ===================================== */

  function flipNext() {

    if (pageFlip) {
      pageFlip.flipNext();
    }
  }


  /* =====================================
     全屏与退出全屏
     ===================================== */

  async function toggleFullscreen() {

    try {

      /*
        当前不在全屏状态
      */

      if (!document.fullscreenElement) {

        await document
          .documentElement
          .requestFullscreen();

        fullscreenBtn.textContent =
          "退出";
      }

      /*
        当前已经处于全屏状态
      */

      else {

        await document
          .exitFullscreen();

        fullscreenBtn.textContent =
          "全屏";
      }

    }

    catch (error) {

      console.warn(
        "当前浏览器不支持全屏，或者全屏请求被拒绝：",
        error
      );
    }
  }


  /* =====================================
     点击开启画册
     ===================================== */

  enterBtn.addEventListener(
    "click",
    openReader
  );


  /* =====================================
     点击上一页按钮
     ===================================== */

  prevBtn.addEventListener(
    "click",
    flipPrev
  );


  /* =====================================
     点击下一页按钮
     ===================================== */

  nextBtn.addEventListener(
    "click",
    flipNext
  );


  /* =====================================
     点击画册左侧区域
     ===================================== */

  leftHotspot.addEventListener(
    "click",
    flipPrev
  );


  /* =====================================
     点击画册右侧区域
     ===================================== */

  rightHotspot.addEventListener(
    "click",
    flipNext
  );


  /* =====================================
     点击全屏按钮
     ===================================== */

  fullscreenBtn.addEventListener(
    "click",
    toggleFullscreen
  );


  /* =====================================
     监听全屏状态变化
     ===================================== */

  document.addEventListener(
    "fullscreenchange",
    () => {

      /*
        修改全屏按钮文字
      */

      fullscreenBtn.textContent =
        document.fullscreenElement
          ? "退出"
          : "全屏";


      /*
        全屏尺寸改变后
        重新计算画册大小
      */

      setTimeout(
        () => {

          window.dispatchEvent(
            new Event("resize")
          );

        },
        120
      );
    }
  );


  /* =====================================
     键盘操作
     ===================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      /*
        还没有进入画册时：

        Enter键进入
        空格键进入
      */

      if (
        !reader.classList.contains(
          "is-active"
        )
      ) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          openReader();
        }

        return;
      }


      /*
        左方向键：
        上一页
      */

      if (
        event.key === "ArrowLeft"
      ) {

        flipPrev();
      }


      /*
        右方向键：
        下一页
      */

      if (
        event.key === "ArrowRight"
      ) {

        flipNext();
      }


      /*
        按F键：
        进入或退出全屏
      */

      if (
        event.key === "f" ||
        event.key === "F"
      ) {

        toggleFullscreen();
      }
    }
  );

})();
