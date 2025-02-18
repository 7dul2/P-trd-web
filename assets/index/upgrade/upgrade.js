(function() {
    function anim_play() {
        _ie({
            tag: "img",
            src: "../assets/upgrade_new_in.png",
            alt: "apng",
        }, document.getElementById("upgrade_animation"));

        setTimeout(function() {
            document.getElementById("upgrade_animation").children[2].style.display = "none";
            document.getElementById("upgrade_animation").children[1].style.display = "";
        }, 6000);
    }

    var drag_handle = document.getElementById("upgrade_popup_drag");
    var pop_up_card = document.getElementById("upgrade_popup_card");
    var start_y, initial_y;
    drag_handle.addEventListener('touchstart', start_drag);

    function start_drag(e) {
        e.preventDefault();
        start_y = e.touches[0].clientY;
        initial_y = parseFloat(getComputedStyle(pop_up_card).bottom);
        document.addEventListener('touchmove', on_drag);
        document.addEventListener('touchend', stop_drag);
    }

    function on_drag(e) {
        e.preventDefault();
        let delta_y = e.touches[0].clientY - start_y;
        let new_y = initial_y - delta_y;
        if (new_y > 0) {
            new_y = 0;
        }
        pop_up_card.style.bottom = `${new_y}px`;
    }

    function stop_drag(e) {
        document.removeEventListener('touchmove', on_drag);
        document.removeEventListener('touchend', stop_drag);
        let current_y = parseFloat(getComputedStyle(pop_up_card).bottom);
        if (current_y < 0) {
            pop_back();
        }
    }

    function pop_up(){
        const mask = document.getElementById("upgrade_popup_mask");
        mask.style.display = "block";
        setTimeout(() => {
            mask.style.opacity = 1;
        }, 10);

        gsap.to(pop_up_card, {duration: 0.3, bottom: '0%', ease: "power2.inOut"});

        setTimeout(() => {
            pop_up_card.style.boxShadow = '0px 0px 1.25rem var(--box-shadow-color)';
        }, 400);
    }

    function pop_back(){
        DataBase.executeSQL(`
            DELETE FROM config WHERE name = ?
        `, ["new_version"]);

        pop_up_card.style.boxShadow = '0px 0px 1.25rem #00000000';

        const mask = document.getElementById("upgrade_popup_mask");
        mask.style.opacity = 0;
        setTimeout(() => {
            mask.style.display = "none";
        }, 310);

        gsap.to(pop_up_card, {duration: 0.3, bottom: '-60%', ease: "power2.inOut"});
    }

    var new_version = DataBase.query("SELECT * FROM config WHERE name = ?", ["new_version"]);
    var new_features = DataBase.query("SELECT * FROM config WHERE name = ?", ["new_features"]);
    var bug_fixes = DataBase.query("SELECT * FROM config WHERE name = ?", ["bug_fixes"]);

    console.log(new_features);

    if (new_version.length != 0) {
        new_version = new_version.replace(" ","").split('\n').map(item => item.split(','))[0][1];
        new_features = new_features.replace(" ","").split('\n').map(item => item.split(','))[0][1];
        bug_fixes = bug_fixes.replace(" ","").split('\n').map(item => item.split(','))[0][1];

        document.getElementById("new_version").innerHTML = new_version;
        document.getElementById("upgrade_logs").innerHTML = "<b>内容更新:</b><br>" + new_features + "<br><br><b>问题修复:</b><br>" + bug_fixes;

        setTimeout(function(){
            pop_up();
            anim_play();
        },1000)
    }

    document.getElementById("upgrade_now").addEventListener('touchstart', function(){
        pop_back();
        Jump.jump("web","https://ptrd.pen-net.cn/download");
    });

    document.getElementById("upgrade_pass").addEventListener('touchstart', function(){
        pop_back();
    });

    document.getElementById("upgrade_ignore").addEventListener('touchstart', function(){
        pop_back();
        DataBase.executeSQL(`
            INSERT INTO config (name, value)
            VALUES (?, ?)
            ON CONFLICT(name) DO UPDATE SET value = excluded.value
        `, ["upgrade_ignored", new_version]);
    });
})();
