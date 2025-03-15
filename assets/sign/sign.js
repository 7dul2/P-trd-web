var container = document.getElementById("container");

// 登陆
function sign_in(){
    var sign_title = _ie({
        tag: "div",
        className: "sign_title",
        children: [
            {
                tag: "img",
                attribute: {
                    alt: "logo",
                    src: "../assets/logo_apng_256.png"
                }
            },
            {
                tag: "p",
                innerHTML: "欢迎回来"
            }
        ]
    }, container);
    
    var sign_card = _ie({
        tag: "div",
        className: "sign_card",
        children: [
            {
                tag: "ru_input",
                attribute: { hint: "邮箱" }
            },
            {
                tag: "ru_input",
                attribute: { hint: "密码" }
            },
            {
                tag: "div",
                className: "sign_hint_1",
                children: [
                    { tag: "p", innerHTML: "忘记密码" }
                ]
            },
            {
                tag: "ru_button",
                attribute: { text: "继续" }
            },

            {
                tag: "div",
                className: "sign_hint_3",
                children: [
                    { tag: "p", innerHTML: "" }
                ]
            },
            {
                tag: "div",
                className: "sign_hint_2",
                children: [
                    { tag: "p", innerHTML: "没有账号?<b>注册</b>" }
                ]
            }
        ]
    }, container);


    setTimeout(() => {
        if (!sign_card.querySelector("input")) {
            ru_input_init(sign_card.children[0]);
            ru_input_init(sign_card.children[1]);
        }
    
        if (!sign_card.children[3].querySelector("label")) {
            ru_button_init(sign_card.children[3]);
        }
    }, 100);

    sign_card.children[5].onclick = function(){
        sign_switch("sign_up");
    }

    
    var sign_policy = _ie({
        tag: "div",
        className: "sign_policy",
        children: [
            { tag: "p", innerHTML: "使用条款" },
            { tag: "p", innerHTML: "隐私政策" }
        ]
    }, container);
}

// 重置密码
function reset_pw(){
    var sign_title = _ie({
        tag: "div",
        className: "sign_title",
        children: [
            {
                tag: "img",
                attribute: {
                    alt: "logo",
                    src: "../assets/logo_apng_256.png"
                }
            },
            {
                tag: "p",
                innerHTML: "重置密码"
            }
        ]
    }, container);
    
    var sign_card = _ie({
        tag: "div",
        className: "sign_card",
        children: [
            {
                tag: "ru_input",
                attribute: { hint: "注册邮箱" }
            },
            {
                tag: "ru_input",
                attribute: { hint: "新密码" }
            },
            {
                tag: "ru_input",
                attribute: { hint: "确认密码" }
            },
            {
                tag: "ru_button",
                attribute: { text: "继续" }
            },
            {
                tag: "div",
                className: "sign_hint_3",
                children: [
                    { tag: "p", innerHTML: "密码错误" }
                ]
            },
            {
                tag: "div",
                className: "sign_hint_2",
                children: [
                    { tag: "p", innerHTML: "取消改密?<b>返回</b>" }
                ]
            },
        ]
    }, container);

    setTimeout(() => {
        if (!sign_card.querySelector("input")) {
            ru_input_init(sign_card.children[0]);
            ru_input_init(sign_card.children[1]);
            ru_input_init(sign_card.children[2]);
        }
    
        if (!sign_card.children[3].querySelector("label")) {
            ru_button_init(sign_card.children[3]);
        }
    }, 100);

    sign_card.children[5].onclick = function(){
        sign_switch("sign_in");
    }
    
    var sign_policy = _ie({
        tag: "div",
        className: "sign_policy",
        children: [
            { tag: "p", innerHTML: "使用条款" },
            { tag: "p", innerHTML: "隐私政策" }
        ]
    }, container);
}

// 重置密码验证
function reset_pw_verify(){
    var sign_title = _ie({
        tag: "div",
        className: "sign_title",
        children: [
            {
                tag: "img",
                attribute: {
                    alt: "logo",
                    src: "../assets/logo_apng_256.png"
                }
            },
            {
                tag: "p",
                innerHTML: "改密验证"
            }
        ]
    }, container);
    
    var sign_card = _ie({
        tag: "div",
        className: "sign_card",
        children: [
            {
                tag: "div",
                className: "sign_hint_2",
                children: [
                    { tag: "p", innerHTML: "我们已向您的邮箱发送了改密验证码,注意检查垃圾桶" }
                ]
            },
            {
                tag: "ru_input",
                attribute: { hint: "验证码" }
            },
            {
                tag: "div",
                className: "sign_hint_1",
                children: [
                    { tag: "p", innerHTML: "" },
                    { tag: "p", innerHTML: "重新发送" }
                ]
            },
            {
                tag: "ru_button",
                attribute: { text: "继续" }
            },
            {
                tag: "div",
                className: "sign_hint_3",
                children: [
                    { tag: "p", innerHTML: "密码错误" }
                ]
            },
            {
                tag: "div",
                className: "sign_hint_2",
                children: [
                    { tag: "p", innerHTML: "取消验证?<b>返回</b>" }
                ]
            },
        ]
    }, container);

    setTimeout(() => {
        if (!sign_card.querySelector("input")) {
            ru_input_init(sign_card.children[1]);
        }
    
        if (!sign_card.children[3].querySelector("label")) {
            ru_button_init(sign_card.children[3]);
        }
    }, 100);

    sign_card.children[5].onclick = function(){
        sign_switch("reset_pw");
    }
    
    var sign_policy = _ie({
        tag: "div",
        className: "sign_policy",
        children: [
            { tag: "p", innerHTML: "使用条款" },
            { tag: "p", innerHTML: "隐私政策" }
        ]
    }, container);
}

// 注册
function sign_up(){
    var sign_title = _ie({
        tag: "div",
        className: "sign_title",
        children: [
            {
                tag: "img",
                attribute: {
                    alt: "logo",
                    src: "../assets/logo_apng_256.png"
                }
            },
            {
                tag: "p",
                innerHTML: "欢迎加入"
            }
        ]
    }, container);
    
    var sign_card = _ie({
        tag: "div",
        className: "sign_card",
        children: [
            {
                tag: "ru_input",
                attribute: { hint: "邮箱" }
            },
            {
                tag: "ru_input",
                attribute: { hint: "密码" }
            },
            {
                tag: "ru_input",
                attribute: { hint: "确认密码" }
            },
            {
                tag: "ru_button",
                attribute: { text: "继续" }
            },

            {
                tag: "div",
                className: "sign_hint_3",
                children: [
                    { tag: "p", innerHTML: "密码错误" }
                ]
            },
            {
                tag: "div",
                className: "sign_hint_2",
                children: [
                    { tag: "p", innerHTML: "已有账号?<b>登陆</b>" }
                ]
            },
        ]
    }, container);

    setTimeout(() => {
        if (!sign_card.querySelector("input")) {
            ru_input_init(sign_card.children[0]);
            ru_input_init(sign_card.children[1]);
            ru_input_init(sign_card.children[2]);
        }
    
        if (!sign_card.children[3].querySelector("label")) {
            ru_button_init(sign_card.children[3]);
        }
    }, 100);

    sign_card.children[5].onclick = function(){
        sign_switch("sign_in");
    }
    
    var sign_policy = _ie({
        tag: "div",
        className: "sign_policy",
        children: [
            { tag: "p", innerHTML: "使用条款" },
            { tag: "p", innerHTML: "隐私政策" }
        ]
    }, container);
}

// 注册验证
function sign_up_verify(){
    var sign_title = _ie({
        tag: "div",
        className: "sign_title",
        children: [
            {
                tag: "img",
                attribute: {
                    alt: "logo",
                    src: "../assets/logo_apng_256.png"
                }
            },
            {
                tag: "p",
                innerHTML: "邮箱验证"
            }
        ]
    }, container);
    
    var sign_card = _ie({
        tag: "div",
        className: "sign_card",
        children: [
            {
                tag: "div",
                className: "sign_hint_2",
                children: [
                    { tag: "p", innerHTML: "我们已向您的邮箱发送了注册验证码,注意检查垃圾桶" }
                ]
            },
            {
                tag: "ru_input",
                attribute: { hint: "验证码" }
            },
            {
                tag: "div",
                className: "sign_hint_1",
                children: [
                    { tag: "p", innerHTML: "" },
                    { tag: "p", innerHTML: "重新发送" }
                ]
            },
            {
                tag: "ru_button",
                attribute: { text: "继续" }
            },
            {
                tag: "div",
                className: "sign_hint_3",
                children: [
                    { tag: "p", innerHTML: "密码错误" }
                ]
            },
            {
                tag: "div",
                className: "sign_hint_2",
                children: [
                    { tag: "p", innerHTML: "取消验证?<b>返回</b>" }
                ]
            },
        ]
    }, container);

    setTimeout(() => {
        if (!sign_card.querySelector("input")) {
            ru_input_init(sign_card.children[1]);
        }
    
        if (!sign_card.children[3].querySelector("label")) {
            ru_button_init(sign_card.children[3]);
        }
    }, 100);

    sign_card.children[5].onclick = function(){
        sign_switch("sign_up");
    }
    
    var sign_policy = _ie({
        tag: "div",
        className: "sign_policy",
        children: [
            { tag: "p", innerHTML: "使用条款" },
            { tag: "p", innerHTML: "隐私政策" }
        ]
    }, container);
}

// 更新昵称
function update_name(){
    var sign_title = _ie({
        tag: "div",
        className: "sign_title",
        children: [
            {
                tag: "img",
                attribute: {
                    alt: "logo",
                    src: "../assets/logo_apng_256.png"
                }
            },
            {
                tag: "p",
                innerHTML: "设置昵称"
            }
        ]
    }, container);
    
    var sign_card = _ie({
        tag: "div",
        className: "sign_card",
        children: [
            {
                tag: "ru_input",
                attribute: { hint: "新昵称" }
            },
            {
                tag: "ru_button",
                attribute: { text: "完成" }
            },
            {
                tag: "div",
                className: "sign_hint_3",
                children: [
                    { tag: "p", innerHTML: "密码错误" }
                ]
            }
        ]
    }, container);

    setTimeout(() => {
        if (!sign_card.querySelector("input")) {
            ru_input_init(sign_card.children[0]);
        }
    
        if (!sign_card.children[1].querySelector("label")) {
            ru_button_init(sign_card.children[1]);
        }
    }, 100);
    
    var sign_policy = _ie({
        tag: "div",
        className: "sign_policy",
        children: [
            { tag: "p", innerHTML: "使用条款" },
            { tag: "p", innerHTML: "隐私政策" }
        ]
    }, container);
}

// 功能切换
function sign_switch (key){
    var delay = 0;

    if (container.children.length > 0) {
        anim_fade_out();
        delay = 1000;
    }

    setTimeout(function(){
        if (key == "sign_in") {
            sign_in();
        }

        if (key == "sign_up") {
            sign_up();
        }

        if (key == "sign_up_verify") {
            sign_up_verify();
        }

        if (key == "update_name") {
            update_name();
        }

        if (key == "reset_pw") {
            reset_pw();
        }

        if (key == "reset_pw_verify") {
            reset_pw_verify();
        }

        anim_fade_in((1001-delay)/1000);

        // 绑定所有 input 元素的 focus 和 blur 事件
        document.querySelectorAll("input, ru_input").forEach(input => {
            input.addEventListener("focus", function() { 
                document.body.style.height = "200vh"; // 增加滚动空间
                input_focus(this);
            });

            input.addEventListener("blur", function() { 
                input_blur(this);
            });
        });
    }, delay);
}

// 入场动画
function anim_fade_in(delay=0){
    console.log("in");
    gsap.from(container.children[0], {
        duration: 0.9, 
        y: -500, 
        opacity: 0,
        ease: "power3.out",
        delay: delay,
    });
    
    gsap.from(container.children[1], {
        duration: 0.9, 
        x: 500, 
        opacity: 0,
        ease: "power3.out",
        delay: delay,
    });
    gsap.from(container.children[2], {
        duration: 0.9, 
        y: 500, 
        opacity: 0,
        ease: "power3.out",
        delay: delay,
    });
}

// 离场动画
function anim_fade_out(){
    console.log("out");

    gsap.to(container.children[0], {
        duration: 0.9, 
        y: 500, 
        opacity: 0,
        ease: "power3.inOut",
    });
    
    gsap.to(container.children[1], {
        duration: 0.9, 
        x: -500, 
        opacity: 0,
        ease: "power3.inOut",
    });

    gsap.to(container.children[2], {
        duration: 0.9, 
        y: -500, 
        opacity: 0,
        ease: "power3.inOut",
    });

    // 让动画结束后再清空内容
    setTimeout(() => {
        container.innerHTML = "";
    }, 900);
}

sign_switch("sign_in");

let blurTimeout; // 存储定时器 ID

function input_focus(element) {
    if (blurTimeout) clearTimeout(blurTimeout); // 取消之前的 `blur` 计时器

    setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
}

function input_blur(element) {
    blurTimeout = setTimeout(() => {
        document.body.style.height = "100vh"; // 还原高度
    }, 300);
}
