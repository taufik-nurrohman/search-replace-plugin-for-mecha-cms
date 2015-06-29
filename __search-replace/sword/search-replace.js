(function(w, d, base) {
    if (typeof base.composer === "undefined") return;
    var editor = base.composer,
        speak = base.languages;
    editor.button('search', {
        title: speak.plugin_search_replace_title_search_replace,
        click: function(e) {
            editor.modal('search-replace', function(overlay, modal) {
                var s = editor.grip.selection(),
                    btn_1 = d.createElement('button'),
                    btn_2 = d.createElement('button');
                function process() {
                    var area = editor.grip.area,
                        escape = editor.grip.escape,
                        input = modal.children[1].getElementsByTagName('input'),
                        pattern = input[0].value,
                        flag = 'g',
                        is_regex = /^\/(.*?)\/([gimuy]*)$/.exec(pattern);
                    if (is_regex !== null) {
                        pattern = is_regex[1];
                        flag = is_regex[2];
                    } else {
                        pattern = pattern.replace(escape, '\\$1');
                    }
                    if (input[0].value === "") {
                        return editor.close(true), false;
                    }
                    if (!input[2].checked) {
                        var str = (new RegExp(pattern)).exec(area.value);
                        area.value = area.value.replace(new RegExp(pattern, flag), input[1].value);
                        str = str !== null && str[0] ? str[0].replace(new RegExp(pattern), input[1].value) : "";
                        editor.grip.select(area.value.indexOf(str), area.value.indexOf(str) + str.length);
                        editor.close(true);
                        editor.grip.updateHistory();
                    } else {
                        editor.grip.replace(new RegExp(pattern, flag), input[1].value);
                    }
                    editor.close(true);
                    return false;
                }
                btn_1.innerHTML = speak.MTE.buttons.ok;
                btn_2.innerHTML = speak.MTE.buttons.cancel;
                modal.children[0].innerHTML = speak.plugin_search_replace_title_search_replace;
                editor.event("click", btn_1, process);
                editor.event("click", btn_2, function() {
                    return editor.close(true), false;
                });
                var input_1 = d.createElement('input'),
                    input_2 = d.createElement('input'),
                    input_3 = d.createElement('label');
                input_1.type = 'text';
                input_2.type = 'text';
                input_1.title = speak.plugin_search_replace_description_find;
                input_2.title = speak.plugin_search_replace_description_replace;
                input_1.placeholder = input_1.title;
                input_2.placeholder = input_2.title;
                input_3.className = 'input';
                input_3.innerHTML = '<input type="checkbox"' + (s.value.length > 0 ? ' checked' : "") + '> ' + speak.plugin_search_replace_description_selection;
                editor.event("keydown", input_1, function(e) {
                    var _this = this;
                    if (e.keyCode === 40) return input_2.focus(), false;
                    if (e.keyCode === 38) return false;
                    if (e.keyCode === 13) {
                        input_2.value = input_1.value;
                        process();
                        input_2.value = "";
                        return false;
                    }
                    w.setTimeout(function() {
                        var _regex = _this.value.match(/^\/.*?\/[gimuy]*$/);
                        _this.style.backgroundColor = _regex ? '#DBFFD6' : "";
                        _this.style.color = _regex ? '#000' : "";
                    }, 1);
                });
                editor.event("keydown", input_2, function(e) {
                    if (e.keyCode === 40) return btn_1.focus(), false;
                    if (e.keyCode === 38) return input_1.focus(), false;
                    if (e.keyCode === 13) return process(), false;
                });
                editor.event("keydown", btn_1, function(e) {
                    if (e.keyCode === 40) return false;
                    if (e.keyCode === 38) return input_2.focus(), false;
                    if (e.keyCode === 13) return process(), false;
                });
                modal.children[1].appendChild(input_1);
                modal.children[1].appendChild(input_2);
                modal.children[1].appendChild(input_3);
                modal.children[2].appendChild(btn_1);
                modal.children[2].appendChild(btn_2);
                w.setTimeout(function() {
                    input_1.focus();
                }, 10);
            });
        }
    });
})(window, document, DASHBOARD);