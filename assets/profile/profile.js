// 个性化

// 涨跌颜色
document.getElementById("trend_color_preference").onclick = function(){
    var status = load_trend_color_preference();
    if (status == "bearish"){
        DataBase.executeSQL("INSERT OR REPLACE INTO config (name, value) VALUES (?, ?)",["trend_color_preference","bullish"]);
    }else {
        DataBase.executeSQL("INSERT OR REPLACE INTO config (name, value) VALUES (?, ?)",["trend_color_preference","bearish"]);
    }
    trend_color_load();
}

// 主题颜色
function theme_color_load(){
    var icons = document.getElementById("theme_color").children[0].children;
    var status = load_theme_color_preference();
    if (status == "dark"){
        document.getElementById("theme_color_text").innerHTML = "<a>深色</a>"
        icons[0].style.display = "none";
        icons[1].style.display = "";
        icons[2].style.display = "none";
    }
    if (status == "light"){
        document.getElementById("theme_color_text").innerHTML = "<a>浅色</a>"
        icons[0].style.display = "";
        icons[1].style.display = "none"
        icons[2].style.display = "none";
    }
    if (status == "system"){
        document.getElementById("theme_color_text").innerHTML = "<a>跟随系统</a>"
        icons[0].style.display = "none";
        icons[1].style.display = "none"
        icons[2].style.display = "";
    }
    if (status == "nailong"){
        document.getElementById("theme_color_text").innerHTML = "<a>奶龙</a>"
        icons[0].style.display = "none";
        icons[1].style.display = "none"
        icons[2].style.display = "";
    }
}
theme_color_load();
document.getElementById("theme_color").onclick = function(){
    var status = load_theme_color_preference();
    if (status == "dark"){
        DataBase.executeSQL("INSERT OR REPLACE INTO config (name, value) VALUES (?,?)",["theme_color_preference","light"]);
    }
    if (status == "light"){
        DataBase.executeSQL("INSERT OR REPLACE INTO config (name, value) VALUES (?,?)",["theme_color_preference","system"]);
    }
    if (status == "system"){
        DataBase.executeSQL("INSERT OR REPLACE INTO config (name, value) VALUES (?,?)",["theme_color_preference","nailong"]);
    }
    if (status == "nailong"){
        DataBase.executeSQL("INSERT OR REPLACE INTO config (name, value) VALUES (?,?)",["theme_color_preference","dark"]);
    }
    theme_color_load();
}


// 赞助我们
document.getElementById("sponsor").onclick = function(){
    Jump.jump("web","https://afdian.com/a/7dul2")
}

// 赞助鸣谢
document.getElementById('thanks_sponsors').addEventListener('click', function() {
    window.location.href = 'sponsor.html';
});