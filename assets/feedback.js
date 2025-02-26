// 从右往左快速滑动三次，会触发反馈弹窗

let _swipe_count = 0; // 记录右滑次数
let _start_x = 0; // 触摸起始 X 坐标
let _end_x = 0; // 触摸结束 X 坐标
let _swipe_time = 0; // 记录滑动开始时间
const _swipe_threshold = 50; // 最小滑动距离
const _max_swipe_time = 300; // 限制单次滑动时间，防止误触

// 监听触摸开始事件
document.addEventListener("touchstart", (e) => {
    _start_x = e.touches[0].clientX;
    _swipe_time = new Date().getTime(); // 记录滑动开始时间
});

// 监听触摸结束事件
document.addEventListener("touchend", (e) => {
    _end_x = e.changedTouches[0].clientX;
    let _delta_x = _start_x - _end_x;
    let _elapsed_time = new Date().getTime() - _swipe_time;

    // 判断是否为有效的快速右滑
    if (_delta_x > _swipe_threshold && _elapsed_time < _max_swipe_time) {
        _swipe_count++; // 记录有效滑动
        console.log(`右到左滑动次数: ${_swipe_count}`);

        if (_swipe_count >= 3) {
            _execute_action(); // 执行操作
            _swipe_count = 0; // 重置计数
        }
    } else {
        _swipe_count = 0; // 如果滑动不满足条件，重置
    }
});

// 执行操作
function feedback_popup() {
    console.log("检测到三次右到左滑动，执行操作！");
    alert("执行操作！");
}
