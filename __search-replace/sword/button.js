(function(w, d, base) {
    if (typeof base.composer === "undefined") return;
    var editor = base.composer,
        speak = base.languages;
    editor.button('search plugin-search-replace', {
        title: speak.plugin_search_replace_title_search_replace,
        click: function() {
            editor.modal('search-replace', function(overlay, modal) {
                var s = editor.grip.selection(),
                    ok = d.createElement('button'),
                    cancel = d.createElement('button');
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
                ok.innerHTML = speak.MTE.buttons.ok;
                cancel.innerHTML = speak.MTE.buttons.cancel;
                modal.children[0].innerHTML = speak.plugin_search_replace_title_search_replace;
                var search = d.createElement('input'),
                    replace = d.createElement('input'),
                    option = d.createElement('label');
                search.type = 'text';
                replace.type = 'text';
                search.title = speak.plugin_search_replace_description_find;
                replace.title = speak.plugin_search_replace_description_replace;
                search.placeholder = search.title;
                replace.placeholder = replace.title;
                option.className = 'input';
                option.innerHTML = '<input type="checkbox"' + (s.value.length > 0 ? ' checked' : "") + '> ' + speak.plugin_search_replace_description_selection;
                editor.event("keydown", search, function(e) {
                    var _this = this;
                    if (e.keyCode === 13) {
                        replace.value = search.value;
                        return process();
                    }
                    if (e.keyCode === 38) return false;
                    if (e.keyCode === 40) return replace.focus(), false;
                    if (e.keyCode === 27 || e.ctrlKey && e.keyCode === 70) return editor.close(true), false;
                    w.setTimeout(function() {
                        var _regex = _this.value.match(/^\/.*?\/[gimuy]*$/);
                        _this.style.backgroundColor = _regex ? '#DBFFD6' : "";
                        _this.style.color = _regex ? '#000' : "";
                    }, 1);
                });
                editor.event("keydown", replace, function(e) {
                    if (e.keyCode === 13) return process();
                    if (e.keyCode === 27) return editor.close(true), false;
                    if (e.keyCode === 38) return search.focus(), false;
                    if (e.keyCode === 40) return ok.focus(), false;
                });
                editor.event("click", ok, process);
                editor.event("click", cancel, function() {
                    return editor.close(true), false;
                });
                editor.event("keydown", ok, function(e) {
                    if (e.keyCode === 13) return process();
                    if (e.keyCode === 27) return editor.close(true), false;
                    if (e.keyCode === 38) return replace.focus(), false;
                    if (e.keyCode === 39 || e.keyCode === 40) return cancel.focus(), false;
                });
                editor.event("keydown", cancel, function(e) {
                    if (e.keyCode === 13 || e.keyCode === 27) return editor.close(true), false;
                    if (e.keyCode === 37 || e.keyCode === 38) return ok.focus(), false;
                    if (e.keyCode === 40) return false;
                });
                modal.children[1].appendChild(search);
                modal.children[1].appendChild(replace);
                modal.children[1].appendChild(option);
                modal.children[2].appendChild(ok);
                modal.children[2].appendChild(cancel);
                w.setTimeout(function() {
                    search.focus();
                }, 10);
            });
        }
    });
    // MTE & HTE >= 1.4.0
    if (typeof editor.shortcut === "function") {
        editor.shortcut('CTRL+70', function() {
            return base.composer.grip.config.buttons['search plugin-search-replace'].click(), false;
        });
    }
})(window, document, DASHBOARD);