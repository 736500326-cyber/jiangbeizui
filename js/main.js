document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ==============================
     基础设置
     ============================== */

  const PAGE_COUNT = 9;
  const MOBILE_BREAKPOINT = 768;

  const pageImages = Array.from(
    { length: PAGE_COUNT },
    function (_, index) {
      return "./images/" + (index + 1) + ".webp";
    }
  );


  /* ==============================
     获取页面元素
     ============================== */

  const splash =
    document.getElementById("splash");

  const reader =
    document.getElementById("reader");

  const enterBtn =
    document.getElementById("enterBtn");

  const desktopBook =
    document.getElementById("desktopBook");

  const bookElement =
    document.getElementById("book");

  const mobileBook =
    document.getElementById("mobileBook");

  const mobilePage =
    document.getElementById("mobilePage");

  const bookStage =
    document.getElementById("bookStage");

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


  /* ==============================
     检查HTML元素
     ============================== */

  const requiredElements = [
    splash,
    reader,
    enterBtn,
    desktopBook,
    bookElement,
    mobileBook,
    mobilePage,
    bookStage,
    prevBtn,
    nextBtn,
    leftHotspot,
    rightHotspot,
    fullscreenBtn,
    currentPage,
    totalPages
  ];


  const hasMissingElement =
    requiredElements.some(function (element) {
      return !element;
    });


  if (hasMissingElement) {
    alert(
      "网页结构没有匹配成功，请检查 index.html 是否完整。"
    );

    return;
  }


  totalPages.textContent =
    String(PAGE_COUNT);


  /* ==============================
     状态变量
     ============================== */

  let pageFlip = null;

  let desktopInitialized = false;

  let fallbackMode = false;

  let currentPageIndex = 0;

  let touchStartX = 0;

  let touchStartY = 0;

  let resizeTimer = null;


  /* ==============================
     判断手机端
     ============================== */

  function isMobileView() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }


  /* ==============================
     更新页码
     ============================== */

  function updatePageNumber() {
    currentPage.textContent =
      String(currentPageIndex + 1);
  }


  /* ==============================
     手机端更新页面
     ============================== */

  function updateMobilePage() {
    mobilePage.src =
      pageImages[currentPageIndex];

    mobilePage.alt =
      "画册第" +
      (currentPageIndex + 1) +
      "页";

    updatePageNumber();

    bookStage.scrollTop = 0;
  }


  /* ==============================
     电脑端自动计算画册大小
     ============================== */

  function fitDesktopBook() {
    if (isMobileView()) {
      return;
    }

    /*
      双页原始逻辑尺寸：
      1498 × 1000
    */

    const originalWidth = 1498;
    const originalHeight = 1000;

    const availableWidth =
      Math.max(
        bookStage.clientWidth - 24,
        320
      );

    const availableHeight =
      Math.max(
        bookStage.clientHeight - 16,
        260
      );

    const widthScale =
      availableWidth / originalWidth;

    const heightScale =
      availableHeight / originalHeight;

    let scale =
      Math.min(
        widthScale,
        heightScale
      );

    scale =
      Math.min(scale, 1.18);

    scale =
      Math.max(scale, 0.25);

    document.documentElement.style.setProperty(
      "--book-scale",
      String(scale)
    );
  }


  /* ==============================
     插件失败时使用单页备用模式
     ============================== */

  function enableFallbackMode() {
    fallbackMode = true;

    document.body.classList.add(
      "is-fallback"
    );

    desktopBook.style.display =
      "none";

    mobileBook.style.display =
      "block";

    updateMobilePage();
  }


  /* ==============================
     初始化电脑端翻页
     ============================== */

  function initializeDesktopBook() {
    if (desktopInitialized) {
      fitDesktopBook();
      return;
    }

    /*
      CDN翻页插件没有加载成功时，
      自动使用单页备用模式。
    */

    if (
      !window.St ||
      !window.St.PageFlip
    ) {
      enableFallbackMode();
      return;
    }


    pageFlip =
      new window.St.PageFlip(
        bookElement,
        {
          width: 749,
          height: 1000,

          size: "fixed",

          showCover: true,

          usePortrait: false,

          autoSize: false,

          drawShadow: true,

          maxShadowOpacity: 0.4,

          flippingTime: 850,

          mobileScrollSupport: false,

          swipeDistance: 24,

          showPageCorners: true,

          disableFlipByClick: false
        }
      );


    pageFlip.loadFromImages(
      pageImages
    );


    pageFlip.on(
      "flip",
      function (event) {
        currentPageIndex =
          Number(event.data) || 0;

        updatePageNumber();
      }
    );


    desktopInitialized = true;


    window.setTimeout(
      fitDesktopBook,
      100
    );


    window.setTimeout(
      fitDesktopBook,
      500
    );
  }


  /* ==============================
     切换电脑和手机模式
     ============================== */

  function updateResponsiveMode() {
    if (
      isMobileView() ||
      fallbackMode
    ) {
      desktopBook.style.display =
        "none";

      mobileBook.style.display =
        "block";

      updateMobilePage();

      return;
    }


    mobileBook.style.display =
      "none";

    desktopBook.style.display =
      "block";

    initializeDesktopBook();

    fitDesktopBook();
  }


  /* ==============================
     打开画册
     ============================== */

  function openReader() {
    /*
      先显示阅读页面。
    */

    reader.classList.add(
      "is-active"
    );

    reader.setAttribute(
      "aria-hidden",
      "false"
    );


    /*
      初始化画册。
    */

    window.requestAnimationFrame(
      function () {
        updateResponsiveMode();
        fitDesktopBook();
      }
    );


    /*
      开屏淡出。
    */

    splash.classList.add(
      "is-hidden"
    );


    /*
      动画结束后彻底隐藏开屏。
    */

    window.setTimeout(
      function () {
        splash.style.display =
          "none";

        updateResponsiveMode();

        fitDesktopBook();
      },
      720
    );
  }


  /* ==============================
     上一页
     ============================== */

  function previousPage() {
    if (
      isMobileView() ||
      fallbackMode
    ) {
      if (currentPageIndex > 0) {
        currentPageIndex -= 1;

        updateMobilePage();
      }

      return;
    }


    if (pageFlip) {
      pageFlip.flipPrev();
    }
  }


  /* ==============================
     下一页
     ============================== */

  function nextPage() {
    if (
      isMobileView() ||
      fallbackMode
    ) {
      if (
        currentPageIndex <
        PAGE_COUNT - 1
      ) {
        currentPageIndex += 1;

        updateMobilePage();
      }

      return;
    }


    if (pageFlip) {
      pageFlip.flipNext();
    }
  }


  /* ==============================
     全屏
     ============================== */

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn(
        "浏览器未允许全屏：",
        error
      );
    }
  }


  /* ==============================
     点击事件
     ============================== */

  enterBtn.addEventListener(
    "click",
    openReader
  );


  prevBtn.addEventListener(
    "click",
    previousPage
  );


  nextBtn.addEventListener(
    "click",
    nextPage
  );


  leftHotspot.addEventListener(
    "click",
    previousPage
  );


  rightHotspot.addEventListener(
    "click",
    nextPage
  );


  fullscreenBtn.addEventListener(
    "click",
    toggleFullscreen
  );


  /* ==============================
     键盘翻页
     ============================== */

  document.addEventListener(
    "keydown",
    function (event) {
      if (
        !reader.classList.contains(
          "is-active"
        )
      ) {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();

          openReader();
        }

        return;
      }


      if (event.key === "ArrowLeft") {
        previousPage();
      }


      if (event.key === "ArrowRight") {
        nextPage();
      }


      if (
        event.key === "f" ||
        event.key === "F"
      ) {
        toggleFullscreen();
      }
    }
  );


  /* ==============================
     手机左右滑动
     ============================== */

  mobileBook.addEventListener(
    "touchstart",
    function (event) {
      const touch =
        event.changedTouches[0];

      touchStartX =
        touch.screenX;

      touchStartY =
        touch.screenY;
    },
    {
      passive: true
    }
  );


  mobileBook.addEventListener(
    "touchend",
    function (event) {
      const touch =
        event.changedTouches[0];

      const distanceX =
        touch.screenX -
        touchStartX;

      const distanceY =
        touch.screenY -
        touchStartY;


      /*
        纵向滚动大于横向滑动时，
        不执行翻页。
      */

      if (
        Math.abs(distanceX) <
        Math.abs(distanceY)
      ) {
        return;
      }


      if (distanceX > 55) {
        previousPage();
      }


      if (distanceX < -55) {
        nextPage();
      }
    },
    {
      passive: true
    }
  );


  /* ==============================
     浏览器大小改变
     ============================== */

  window.addEventListener(
    "resize",
    function () {
      window.clearTimeout(
        resizeTimer
      );


      resizeTimer =
        window.setTimeout(
          function () {
            updateResponsiveMode();

            fitDesktopBook();
          },
          150
        );
    }
  );


  /* ==============================
     全屏状态变化
     ============================== */

  document.addEventListener(
    "fullscreenchange",
    function () {
      fullscreenBtn.textContent =
        document.fullscreenElement
          ? "退出"
          : "全屏";


      window.setTimeout(
        function () {
          updateResponsiveMode();

          fitDesktopBook();
        },
        120
      );
    }
  );


  /*
    用于确认main.js已经成功运行。

    打开浏览器控制台时，
    应该能看到这句话。
  */

  console.log(
    "江北嘴电子画册 main.js 已成功加载"
  );
});
