// 获取元素
var container = document.querySelector('.container');
var imgBox = document.querySelector('.img-box');
var indexBox = document.querySelector('.index-box');
var arrowLeft = document.querySelector('.arrow-left');
var arrowRight = document.querySelector('.arrow-right');

// 定义变量
var index = 1; // 当前图片的索引
var timer = null; // 定时器的返回值
var flag = true; // 节流阀标志

// 定义常量
var IMG_WIDTH = 600; // 图片的宽度
var IMG_COUNT = 3; // 图片的数量
var INTERVAL = 2000; // 自动切换的间隔时间

// 定义函数

// 切换图片的函数，根据index的值改变imgBox的left值和indexBox的内容
function switchImg() {
    // 计算目标位置
    var target = -(index - 1) * IMG_WIDTH;

    // 设置imgBox的left值
    imgBox.style.left = target + 'px';

    // 设置indexBox的内容
    indexBox.textContent = index + '/' + IMG_COUNT;

    // 判断是否到达最后一张图片
    if (index == IMG_COUNT) {
        // 等待过渡效果结束后，瞬间切换到第一张图片
        setTimeout(function() {
            index = 1;

             // 设置imgBox的left值
             imgBox.style.left = '0px';

             // 设置indexBox的内容
             indexBox.textContent = index + '/' + IMG_COUNT;

             // 打开节流阀
             flag = true;
        }, 500);
    } else {
        // 打开节流阀
        flag = true;
    }
}

// 自动切换的函数，每隔一段时间让index自增，然后调用切换图片的函数
function autoPlay() {
    // 设置定时器
    timer = setInterval(function() {
        // index自增
        index++;

        // 调用切换图片的函数
        switchImg();
    }, INTERVAL);
}

// 添加事件监听

// 鼠标移入container时，停止自动切换，显示箭头
container.addEventListener('mouseenter', function() {
    // 清除定时器
    clearInterval(timer);

    // 显示箭头
    arrowLeft.style.display = 'block';
    arrowRight.style.display = 'block';
});

// 鼠标移出container时，开始自动切换，隐藏箭头
container.addEventListener('mouseleave', function() {
    // 开始自动切换
    autoPlay();

    // 隐藏箭头
    arrowLeft.style.display = 'none';
    arrowRight.style.display = 'none';
});

// 点击左箭头时，让index自减，然后调用切换图片的函数
arrowLeft.addEventListener('click', function() {
    // 判断节流阀是否打开
    if (flag) {
        // 关闭节流阀
        flag = false;

        // index自减
        index--;

        // 判断是否到达第一张图片
        if (index < 1) {
            // 瞬间切换到最后一张图片
            index = IMG_COUNT;
            imgBox.style.left = -IMG_COUNT * IMG_WIDTH + 'px';
        }

        // 调用切换图片的函数
        switchImg();
    }
});

// 点击右箭头时，让index自增，然后调用切换图片的函数
arrowRight.addEventListener('click', function() {
    // 判断节流阀是否打开
    if (flag) {
        // 关闭节流阀
        flag = false;

        // index自增
        index++;

        // 调用切换图片的函数
        switchImg();
    }
});

// 页面加载完成后，开始自动切换，并给每个圆点添加自定义属性data-index来存储索引值
window.addEventListener('load', function() {
    // 开始自动切换
    autoPlay();
});
