var container = document.getElementById("container");

var temp_token = "";

function get_cookies() {
    return new Map(
        document.cookie.split("; ").map(cookie => cookie.split("=").map(decodeURIComponent))
    );
}

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
                attribute: { hint: "邮箱"}
            },
            {
                tag: "ru_input",
                attribute: { hint: "密码",mask: "pw" }
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

    sign_card.children[2].onclick = function(){
        sign_switch("reset_pw");
    }
    sign_card.children[5].children[0].onclick = function(){
        sign_switch("sign_up");
    }

    function submit(email, pw) {
        var url = "https://ptrd.pen-net.cn/api/sign_in";
    
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ email: email, password: pw })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.data === null) {
                return [false, data.message];
            }
            return [true, data.data];
        })
        .catch(error => {
            return [false, "网络错误"];
        });
    }

    setTimeout(() => {
        let hint =  sign_card.children[4].children[0];
        var err1 = false;
        var err2 = false;

        var value1 = "";
        var value2 = "";

        sign_card.children[0].value(function(value){
            value1 = value;
            const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(com|cn|net|org)$');
            if (regex.test(value)) {
                sign_card.children[0].setAttribute("alert", "false");
                hint.innerHTML = ""
                err1 = false;
            } else {
                sign_card.children[0].setAttribute("alert", "true");
                hint.innerHTML = "邮箱格式不正确"
                err1 = true;
            }
        },500);

        sign_card.children[1].value(function(value) {
            value2 = value;
            let hasLetter = false;
            let hasDigit = false;
        
            if (value.length < 8 || value.length > 32) {
                sign_card.children[1].setAttribute("alert", "true");
                hint.innerHTML = "密码长度应为8到32位";
                err2 = true;
                return;
            }
        
            for (let i = 0; i < value.length; i++) {
                const ch = value.charAt(i);
                if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                    hasLetter = true;
                } else if (ch >= '0' && ch <= '9') {
                    hasDigit = true;
                } else {
                    sign_card.children[1].setAttribute("alert", "true");
                    hint.innerHTML = "密码仅允许字母和数字";
                    err2 = true;
                    return;
                }
            }
        
            if (hasLetter && hasDigit) {
                sign_card.children[1].setAttribute("alert", "false");
                hint.innerHTML = "";
                err2 = false;
            } else {
                sign_card.children[1].setAttribute("alert", "true");
                hint.innerHTML = "密码必须同时包含字母和数字";
                err2 = true;
            }
        }, 500);

        sign_card.children[3].touch(function(event) {
            if (err1 || err2) {
                hint.innerHTML = "邮箱或者密码格式存在错误";
                return;
            }
            
            if (value1 == "" || value2 == "") {
                hint.innerHTML = "邮箱或者密码为空";
                return;
            }

            submit(value1, value2).then(resp => {
                if (resp[0] === true) {
                    document.cookie = `auth=${resp[1]}; path=/;`;
                    window.history.back();
                } else {
                    hint.innerHTML = resp[1];
                }
            });
        });
    }, 300);
    
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
                attribute: { hint: "新密码" ,mask: "pw"}
            },
            {
                tag: "ru_input",
                attribute: { hint: "确认密码",mask: "pw" }
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

    sign_card.children[5].children[0].onclick = function(){
        sign_switch("sign_in");
    }

    function submit(email, pw) {
        var url = "https://ptrd.pen-net.cn/api/reset_pw";
    
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ email: email, new_password: pw })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.data === null) {
                return [false, data.message];
            }
            return [true, data.data];
        })
        .catch(error => {
            return [false, "网络错误"];
        });
    }

    setTimeout(() => {
        let hint =  sign_card.children[4].children[0];
        var err1 = false;
        var err2 = false;
        var err3 = false;

        var value1 = "";
        var value2 = "";
        var value3 = "";

        sign_card.children[0].value(function(value){
            value1 = value;
            const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(com|cn|net|org)$');
            if (regex.test(value)) {
                sign_card.children[0].setAttribute("alert", "false");
                hint.innerHTML = ""
                err1 = false;
            } else {
                sign_card.children[0].setAttribute("alert", "true");
                hint.innerHTML = "邮箱格式不正确"
                err1 = true;
            }
        },500);

        sign_card.children[1].value(function(value) {
            value2 = value;
            let hasLetter = false;
            let hasDigit = false;
        
            if (value.length < 8 || value.length > 32) {
                sign_card.children[1].setAttribute("alert", "true");
                hint.innerHTML = "密码长度应为8到32位";
                err2 = true;
                return;
            }
        
            for (let i = 0; i < value.length; i++) {
                const ch = value.charAt(i);
                if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                    hasLetter = true;
                } else if (ch >= '0' && ch <= '9') {
                    hasDigit = true;
                } else {
                    sign_card.children[1].setAttribute("alert", "true");
                    hint.innerHTML = "密码仅允许字母和数字";
                    err2 = true;
                    return;
                }
            }
        
            if (hasLetter && hasDigit) {
                sign_card.children[1].setAttribute("alert", "false");
                hint.innerHTML = "";
                err2 = false;
            } else {
                sign_card.children[1].setAttribute("alert", "true");
                hint.innerHTML = "密码必须同时包含字母和数字";
                err2 = true;
            }
        }, 500);

        sign_card.children[2].value(function(value) {
            value3 = value;
        
            if (value == value2) {
                sign_card.children[2].setAttribute("alert", "false");
                hint.innerHTML = "";
                err3 = false;
            } else {
                sign_card.children[2].setAttribute("alert", "true");
                hint.innerHTML = "两次密码不一致";
                err3 = true;
            }
        }, 500);

        sign_card.children[3].touch(function(event) {
            if (err1 || err2 || err3) {
                hint.innerHTML = "邮箱或者密码格式存在错误";
                return;
            }
            
            if (value1 == "" || value2 == "" || value3 == "") {
                hint.innerHTML = "邮箱或者密码为空";
                return;
            }

            submit(value1, value2).then(resp => {
                if (resp[0] === true) {
                    temp_token = resp[1];
                    sign_switch("reset_pw_verify");
                } else {
                    hint.innerHTML = resp[1];
                }
            });
        });
    }, 300);
    
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
                    { tag: "p", innerHTML: "取消验证?<b>返回</b>" }
                ]
            },
        ]
    }, container);

    setTimeout(() => {
        if (!sign_card.querySelector("input")) {
            ru_input_init(sign_card.children[1]);
        }
    
        if (!sign_card.children[2].querySelector("label")) {
            ru_button_init(sign_card.children[2]);
        }
    }, 100);

    sign_card.children[4].onclick = function(){
        sign_switch("reset_pw");
    }
    
    function submit(code, token) {
        var url = "https://ptrd.pen-net.cn/api/verify";
    
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "auth" : token, 
            },
            body: new URLSearchParams({code: code, type: "reset_pw" })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.data === null) {
                return [false, data.message];
            }
            return [true, data.data];
        })
        .catch(error => {
            return [false, "网络错误"];
        });
    }

    setTimeout(() => {
        let hint =  sign_card.children[3].children[0];
        var err1 = false;

        var value1 = "";

        sign_card.children[1].value(function(value) {
            value1 = value;
            
            // 验证码长度必须为 8
            if (value.length !== 8) {
                sign_card.children[1].setAttribute("alert", "true");
                hint.innerHTML = "验证码长度必须为8位";
                err1 = true;
                return;
            }
        
            // 检查是否只包含字母或数字
            for (let i = 0; i < value.length; i++) {
                const ch = value.charAt(i);
                if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9'))) {
                    sign_card.children[1].setAttribute("alert", "true");
                    hint.innerHTML = "验证码仅允许字母和数字";
                    err1 = true;
                    return;
                }
            }
        
            // 验证成功
            sign_card.children[1].setAttribute("alert", "false");
            hint.innerHTML = "";
            err1 = false;
        }, 500);

        sign_card.children[2].touch(function(event) {
            if (err1) {
                hint.innerHTML = "验证码格式错误";
                return;
            }
            
            if (value1 == "") {
                hint.innerHTML = "验证码输入为空";
                return;
            }

            submit(value1, temp_token).then(resp => {
                if (resp[0] === true) {
                    sign_switch("sign_in");
                } else {
                    hint.innerHTML = resp[1];
                }
            });
        });
    }, 300);
    
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
                attribute: { hint: "密码",mask: "pw" }
            },
            {
                tag: "ru_input",
                attribute: { hint: "确认密码",mask: "pw" }
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

    sign_card.children[5].children[0].onclick = function(){
        sign_switch("sign_in");
    }

    function submit(email, password) {
        var url = "https://ptrd.pen-net.cn/api/sign_up";
    
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.data === null) {
                return [false, data.message];
            }
            return [true, data.data];
        })
        .catch(error => {
            return [false, "网络错误"];
        });
    }

    setTimeout(() => {
        let hint =  sign_card.children[4].children[0];
        var err1 = false;
        var err2 = false;
        var err3 = false;

        var value1 = "";
        var value2 = "";
        var value3 = "";

        sign_card.children[0].value(function(value){
            value1 = value;
            const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(com|cn|net|org)$');
            if (regex.test(value)) {
                sign_card.children[0].setAttribute("alert", "false");
                hint.innerHTML = ""
                err1 = false;
            } else {
                sign_card.children[0].setAttribute("alert", "true");
                hint.innerHTML = "邮箱格式不正确"
                err1 = true;
            }
        },500);

        sign_card.children[1].value(function(value) {
            value2 = value;
            let hasLetter = false;
            let hasDigit = false;
        
            if (value.length < 8 || value.length > 32) {
                sign_card.children[1].setAttribute("alert", "true");
                hint.innerHTML = "密码长度应为8到32位";
                err2 = true;
                return;
            }
        
            for (let i = 0; i < value.length; i++) {
                const ch = value.charAt(i);
                if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                    hasLetter = true;
                } else if (ch >= '0' && ch <= '9') {
                    hasDigit = true;
                } else {
                    sign_card.children[1].setAttribute("alert", "true");
                    hint.innerHTML = "密码仅允许字母和数字";
                    err2 = true;
                    return;
                }
            }
        
            if (hasLetter && hasDigit) {
                sign_card.children[1].setAttribute("alert", "false");
                hint.innerHTML = "";
                err2 = false;
            } else {
                sign_card.children[1].setAttribute("alert", "true");
                hint.innerHTML = "密码必须同时包含字母和数字";
                err2 = true;
            }
        }, 500);

        sign_card.children[2].value(function(value) {
            value3 = value;
        
            if (value == value2) {
                sign_card.children[2].setAttribute("alert", "false");
                hint.innerHTML = "";
                err3 = false;
            } else {
                sign_card.children[2].setAttribute("alert", "true");
                hint.innerHTML = "两次密码不一致";
                err3 = true;
            }
        }, 500);

        sign_card.children[3].touch(function(event) {
            if (err1 || err2 || err3) {
                hint.innerHTML = "邮箱或者密码格式存在错误";
                return;
            }
            
            if (value1 == "" || value2 == "" || value3 == "") {
                hint.innerHTML = "邮箱或者密码为空";
                return;
            }

            submit(value1, value2).then(resp => {
                if (resp[0] === true) {
                    temp_token = resp[1];
                    sign_switch("sign_up_verify");
                } else {
                    hint.innerHTML = resp[1];
                }
            });
        });
    }, 300);
    
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
                    { tag: "p", innerHTML: "取消验证?<b>返回</b>" }
                ]
            },
        ]
    }, container);

    setTimeout(() => {
        if (!sign_card.querySelector("input")) {
            ru_input_init(sign_card.children[1]);
        }
    
        if (!sign_card.children[2].querySelector("label")) {
            ru_button_init(sign_card.children[2]);
        }
    }, 100);

    function submit(code, token) {
        var url = "https://ptrd.pen-net.cn/api/verify";
    
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "auth" : token, 
            },
            body: new URLSearchParams({code: code, type: "sign_up" })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.data === null) {
                return [false, data.message];
            }
            return [true, data.data];
        })
        .catch(error => {
            return [false, "网络错误"];
        });
    }

    setTimeout(() => {
        let hint =  sign_card.children[3].children[0];
        var err1 = false;

        var value1 = "";

        sign_card.children[1].value(function(value) {
            value1 = value;
            
            // 验证码长度必须为 8
            if (value.length !== 8) {
                sign_card.children[1].setAttribute("alert", "true");
                hint.innerHTML = "验证码长度必须为8位";
                err1 = true;
                return;
            }
        
            // 检查是否只包含字母或数字
            for (let i = 0; i < value.length; i++) {
                const ch = value.charAt(i);
                if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9'))) {
                    sign_card.children[1].setAttribute("alert", "true");
                    hint.innerHTML = "验证码仅允许字母和数字";
                    err1 = true;
                    return;
                }
            }
        
            // 验证成功
            sign_card.children[1].setAttribute("alert", "false");
            hint.innerHTML = "";
            err1 = false;
        }, 500);

        sign_card.children[2].touch(function(event) {
            if (err1) {
                hint.innerHTML = "验证码格式错误";
                return;
            }
            
            if (value1 == "") {
                hint.innerHTML = "验证码输入为空";
                return;
            }

            submit(value1, temp_token).then(resp => {
                if (resp[0] === true) {
                    sign_switch("update_name");
                } else {
                    hint.innerHTML = resp[1];
                }
            });
        });
    }, 300);

    sign_card.children[4].children[0].onclick = function(){
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
                    { tag: "p", innerHTML: "" }
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

    function submit(name) {
        var url = "https://ptrd.pen-net.cn/api/update_name";
    
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "auth" : get_cookies().get("auth"), 
            },
            body: new URLSearchParams({username : name})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.data === null) {
                return [false, data.message];
            }
            return [true, data.data];
        })
        .catch(error => {
            return [false, "网络错误"];
        });
    }

    setTimeout(() => {
        let hint =  sign_card.children[2].children[0];
        var err1 = false;

        var value1 = "";

        sign_card.children[0].value(function(value) {
            value1 = value;
            
            // 验证码长度必须为 8
            if (value.length < 3 || value.length > 16) {
                sign_card.children[1].setAttribute("alert", "true");
                hint.innerHTML = "新用户名长度必须为3-16位";
                err1 = true;
                return;
            }
        
            // 验证成功
            sign_card.children[1].setAttribute("alert", "false");
            hint.innerHTML = "";
            err1 = false;
        }, 500);

        sign_card.children[1].touch(function(event) {
            if (err1) {
                hint.innerHTML = "用户名格式错误";
                return;
            }
            
            if (value1 == "") {
                hint.innerHTML = "用户名输入为空";
                return;
            }

            submit(value1, temp_token).then(resp => {
                if (resp[0] === true) {
                    document.cookie = `auth=${resp[1]}; path=/;`;
                    window.history.back();
                } else {
                    hint.innerHTML = resp[1];
                }
            });
        });
    }, 300);
    
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

        setTimeout(function(){
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
        }, 1000);
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
