function ru_select_init(element){
    element.className = "ru_select";

    var hint_label = ru_ie({
        tag : "label",
    },element);

    var selected = ru_ie({
        tag : "p",
    },element);

    var icon = ru_ie({
        tag: 'svg',
        attribute : {
            viewBox: '64 64 896 896',
        },
        children: [
            {
                tag: 'path',
                attribute : {
                    d: 'M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z'
                }
            }
        ]
    },element);    
    
    var options = ru_ie({
        tag : "div",
    },element);

    // 记录聚焦状态
    var focused = false;
    // 当组件被点击,开始聚焦状态
    element.addEventListener('click', function() {
        element.setAttribute("focus", "true");
        focused = true
    });
    // 当其他地方被点击,结束聚焦
    document.addEventListener('click', function(event) {
        if (!element.contains(event.target)) {
            element.setAttribute("focus", "false");
            focused = false;
        }
    });

    // 修改hint提示
    element.hint = function(hint) {
        // 如果hint为空,就取消
        if (hint === ""){
            element.setAttribute("hintable", "false");
            element.setAttribute("hint", hint);
            return 
        }

        element.setAttribute("hintable", "true");

        element.setAttribute("hint", hint);

        hint_label.innerHTML = hint;
    };

    // 尝试获取hint参数
    var hint_text = element.getAttribute('hint');
    if (hint_text) {
        // 如果之前hint-label被屏蔽就移除屏蔽
        element.setAttribute("hintable", "true");

        // hint文本显示
        element.hint(hint_text);
    } else {
        // 没有hint就禁止显示hint
        element.setAttribute("hintable", "false");
    }

    // 当input被聚焦
    element.addEventListener('focus', () => {
        element.setAttribute("focus", "true");
    });

    // 当input失去焦点
    element.addEventListener('blur', () => {
        var value = element.value();
        if (value.trim() !== ""){
            // 当其中有内容,禁止收回
            element.setAttribute("focus", "true");
        }else {
            // 当其中无内容,允许收回
            element.setAttribute("focus", "false");
        }
    });
}