function ru_picker_wheel_init(element) {
    // 设置样式类名
    element.className = "ru_picker_wheel";

    // 存储初始的 HTML 内容
    var init_HTML = element.innerHTML;
    element.innerHTML = "";

    // 创建一个容器 div 用于存放选项，并将其附加到选择器元素中
    var container = ru_ie({
        tag: "div",
        innerHTML: init_HTML
    }, element);

    // 用于设置选择器内文本对齐方式的方法（左、右、居中）
    element.align = function(align) {
        if (align === "left") {
            element.setAttribute("align", "left");
            return;
        }

        if (align === "right") {
            element.setAttribute("align", "right");
            return;
        }

        element.setAttribute("align", "center");
    };

    // 应用初始对齐方式
    element.align(element.getAttribute('align'));

    var touchTimeout; // 用于存储定时器
    var LONG_PRESS_DURATION = 500; // 定义长按时间（单位毫秒）
    var on_touch = false; // 标记是否长按触发
    var savedScrollTop = 0; // 用于保存滚动位置
    
    container.addEventListener('touchstart', (e) => {
        // 设置一个定时器用于检测长按
        touchTimeout = setTimeout(() => {
            element.setAttribute("touched", "true");
            on_touch = true; // 长按状态设置为 true
        }, LONG_PRESS_DURATION);
    });
    
    container.addEventListener('touchmove', (e) => {
        if (on_touch) {
            // 如果长按触发了，允许执行移动逻辑
            option_centered();
            savedScrollTop = container.scrollTop;
        } else {
            // 未触发长按时取消定时器
            clearTimeout(touchTimeout);
        }
    });
    
    container.addEventListener('touchend', () => {
        if (on_touch) {
            // 如果长按触发了，允许执行结束逻辑
            option_centered();
            on_touch = false;

            // 禁用滚动后恢复滚动位置
            element.setAttribute("touched", "false");
            console.log( savedScrollTop)
            container.scrollTop = savedScrollTop;
        } else {
            // 未触发长按时取消定时器
            clearTimeout(touchTimeout);
        }
    });
    
    function option_centered() {
        const container_rect = container.getBoundingClientRect();
        const container_center_y = container_rect.top + container_rect.height / 2;
    
        let closest_element = null;
        let closest_distance = Infinity;
    
        container.querySelectorAll('p').forEach((element) => {
            element.setAttribute('selected', 'false');
    
            const element_rect = element.getBoundingClientRect();
            const element_center_y = element_rect.top + element_rect.height / 2;
            const distance = Math.abs(container_center_y - element_center_y);
    
            if (distance < closest_distance) {
                closest_distance = distance;
                closest_element = element;
            }
        });
    
        if (closest_element) {
            closest_element.setAttribute('selected', 'true');
            element.setAttribute('selected',closest_element.innerHTML)
        }
    }

    // 空传入是获取当前选择值
    // 如果没有当前选择值就选择第一个
    // 假如有参数传入就执行选中对应参数
    // 没有对应参数就忽略
    element.value = function(){

    }


}
