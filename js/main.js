/* =========================================
   全局设置
   ========================================= */

:root {
  --toolbar-height: 50px;
  --footer-height: 28px;

  /*
    电脑端画册缩放比例。
    JavaScript会自动计算。
  */
  --book-scale: 1;
}


* {
  box-sizing: border-box;
}


html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}


body {
  overflow: hidden;

  color: #ffffff;
  background: #111111;

  font-family:
    "Microsoft YaHei",
    "PingFang SC",
    Arial,
    sans-serif;
}


button {
  font: inherit;
}


/* =========================================
   开屏页面
   ========================================= */

.splash {
  position: fixed;
  inset: 0;
  z-index: 100;

  display: grid;
  place-items: center;

  overflow: hidden;
  background: #f7f4ee;

  opacity: 1;
  visibility: visible;

  transition:
    opacity 0.7s ease,
    visibility 0.7s ease,
    transform 1s ease;
}


.splash.is-hidden {
  opacity: 0;
  visibility: hidden;
  transform: scale(1.03);

  pointer-events: none;
}


.splash__cover {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  user-select: none;
  -webkit-user-drag: none;
}


.splash__mask {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      to top,
      rgba(0, 0, 0, 0.46),
      rgba(0, 0, 0, 0) 45%
    );

  pointer-events: none;
}


.splash__content {
  position: absolute;
  left: 50%;
  bottom: max(5vh, 40px);
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  transform: translateX(-50%);
}


.enter-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  min-width: 190px;
  height: 54px;

  padding: 0 28px;

  border: 1px solid rgba(255, 255, 255, 0.76);
  border-radius: 999px;

  color: #ffffff;
  background: rgba(0, 0, 0, 0.30);

  font-size: 16px;
  letter-spacing: 4px;

  cursor: pointer;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.22);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}


.enter-button:hover {
  background: rgba(0, 0, 0, 0.50);

  transform: translateY(-2px);
}


.splash__tip {
  margin: 0;

  color: rgba(255, 255, 255, 0.78);

  font-size: 12px;
  letter-spacing: 2px;
  white-space: nowrap;
}


/* =========================================
   画册阅读页面
   ========================================= */

.reader {
  position: fixed;
  inset: 0;

  display: grid;

  grid-template-rows:
    var(--toolbar-height)
    minmax(0, 1fr)
    var(--footer-height);

  overflow: hidden;

  background-color: #f1efeb;

  /*
    注意：
    style.css在css文件夹中，
    所以背景图片需要使用../images
  */
  background-image:
    url("../images/11.webp");

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  opacity: 0;
  visibility: hidden;

  transition: opacity 0.6s ease;
}


.reader.is-active {
  opacity: 1;
  visibility: visible;
}


/*
  背景提亮层。

  0.10越大，背景越亮。
  例如可以改成0.16。
*/
.reader__mask {
  position: absolute;
  inset: 0;

  background:
    rgba(255, 255, 255, 0.10);

  pointer-events: none;
}


.toolbar,
.book-stage,
.reader-footer {
  position: relative;
  z-index: 2;
}


/* =========================================
   顶部工具栏
   ========================================= */

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  min-height:
    var(--toolbar-height);

  padding:
    0
    clamp(10px, 2.4vw, 28px);

  border-bottom:
    1px solid
    rgba(255, 255, 255, 0.20);

  background:
    rgba(40, 40, 44, 0.22);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}


.toolbar__brand {
  overflow: hidden;

  color:
    rgba(255, 255, 255, 0.94);

  font-size: 13px;
  letter-spacing: 3px;

  white-space: nowrap;
  text-overflow: ellipsis;
}


.toolbar__actions {
  display: flex;
  align-items: center;

  gap: 8px;
}


.toolbar-button {
  min-width: 36px;
  height: 36px;

  padding: 0 12px;

  border:
    1px solid
    rgba(255, 255, 255, 0.34);

  border-radius: 999px;

  color: #ffffff;

  background:
    rgba(0, 0, 0, 0.24);

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}


.toolbar-button:hover {
  background:
    rgba(255, 255, 255, 0.16);

  border-color:
    rgba(255, 255, 255, 0.56);

  transform:
    translateY(-1px);
}


.toolbar-button--text {
  min-width: 62px;

  font-size: 12px;
}


.page-status {
  min-width: 64px;

  color:
    rgba(255, 255, 255, 0.92);

  font-size: 12px;
  text-align: center;
}


.page-status__divider {
  margin: 0 5px;

  opacity: 0.55;
}


/* =========================================
   画册展示区域
   ========================================= */

.book-stage {
  position: relative;

  width: 100%;
  min-width: 0;
  min-height: 0;

  overflow: hidden;
}


/*
  电脑端双页逻辑尺寸：

  单页：749 × 1000
  双页：1498 × 1000

  JavaScript会根据浏览器大小，
  自动计算缩放比例。
*/
.desktop-book {
  position: absolute;

  left: 50%;
  top: 50%;

  width: 1498px;
  height: 1000px;

  transform:
    translate(-50%, -50%)
    scale(var(--book-scale));

  transform-origin: center;

  filter:
    drop-shadow(
      0
      22px
      38px
      rgba(0, 0, 0, 0.34)
    );
}


#book {
  width: 1498px;
  height: 1000px;
}


/* =========================================
   StPageFlip自动生成的元素
   ========================================= */

.stf__parent {
  margin: 0 auto !important;
}


.stf__item {
  background: #ffffff;
}


.stf__block {
  box-shadow: none !important;
}


/* =========================================
   手机端单页画册
   ========================================= */

.mobile-book {
  display: none;
}


.mobile-book__page {
  display: block;

  width: 100%;
  height: auto;

  background: #ffffff;

  user-select: none;
  -webkit-user-drag: none;
}


/* =========================================
   左右点击翻页区域
   ========================================= */

.page-hotspot {
  position: absolute;

  top: 8%;
  bottom: 8%;

  z-index: 12;

  width: min(10vw, 110px);

  border: 0;
  outline: 0;

  background: transparent;

  cursor: pointer;
}


.page-hotspot--left {
  left: 0;
}


.page-hotspot--right {
  right: 0;
}


/* =========================================
   底部提示
   ========================================= */

.reader-footer {
  display: flex;
  align-items: center;
  justify-content: center;

  border-top:
    1px solid
    rgba(255, 255, 255, 0.15);

  color:
    rgba(255, 255, 255, 0.70);

  background:
    rgba(40, 40, 44, 0.20);

  font-size: 10px;
  letter-spacing: 1px;

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}


/* =========================================
   翻页插件加载失败备用模式
   ========================================= */

body.is-fallback .desktop-book {
  display: none;
}


body.is-fallback .mobile-book {
  display: block;

  width:
    min(74vh, 72vw);

  max-width: 749px;
  max-height:
    calc(100% - 16px);

  margin: auto;

  overflow-y: auto;

  background: transparent;

  box-shadow:
    0 18px 38px
    rgba(0, 0, 0, 0.28);
}


body.is-fallback .mobile-book__page {
  width: 100%;
  height: auto;
}


/* =========================================
   手机端适配
   ========================================= */

@media (max-width: 768px) {

  :root {
    --toolbar-height: 48px;
  }


  .reader {
    grid-template-rows:
      var(--toolbar-height)
      minmax(0, 1fr);
  }


  .toolbar {
    padding: 0 8px;
  }


  .toolbar__brand {
    max-width: 88px;

    font-size: 10px;
    letter-spacing: 1px;
  }


  .toolbar__actions {
    gap: 4px;
  }


  .toolbar-button {
    min-width: 32px;
    height: 32px;

    padding: 0 8px;

    font-size: 12px;
  }


  .toolbar-button--text {
    min-width: 50px;

    font-size: 11px;
  }


  .page-status {
    min-width: 48px;

    font-size: 11px;
  }


  /*
    手机端隐藏电脑双页画册。
  */
  .desktop-book {
    display: none !important;
  }


  /*
    手机端画册区域允许上下滚动。
  */
  .book-stage {
    overflow-x: hidden;
    overflow-y: auto;

    -webkit-overflow-scrolling: touch;
  }


  /*
    手机端显示单页画册。
  */
  .mobile-book {
    display: block !important;

    width: 100%;
    min-height: 100%;

    background: transparent;
  }


  /*
    每一页占满手机屏幕宽度。
  */
  .mobile-book__page {
    width: 100%;
    max-width: 100%;
    height: auto;

    object-fit: contain;

    box-shadow:
      0 10px 28px
      rgba(0, 0, 0, 0.24);
  }


  /*
    手机端隐藏底部提示，
    给画册留更多高度。
  */
  .reader-footer {
    display: none;
  }


  /*
    手机端左右翻页点击区域。
  */
  .page-hotspot {
    position: fixed;

    top:
      var(--toolbar-height);

    bottom: 0;

    width: 18vw;
  }


  .splash__content {
    bottom:
      max(4vh, 26px);
  }


  .enter-button {
    min-width: 166px;
    height: 48px;

    font-size: 13px;
  }


  .splash__tip {
    font-size: 10px;
  }
}


/* =========================================
   减少动画设置
   ========================================= */

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    transition-duration:
      0.01ms !important;

    animation-duration:
      0.01ms !important;
  }
}
