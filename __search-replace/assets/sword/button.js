(function(w, d, base) {
    if (!base.composer) return;
    var editor = base.composer,
        grip = editor.grip,
        mte = base.languages.MTE,
        speak = base.languages.plugin_search_replace,
        name = 'search plugin-search-replace';
    editor.button(name, {
        title: speak[0],
        click: function() {
            editor.modal('search-replace', function(overlay, modal, header, content, footer) {
                var s = grip.selection(),
                    ok = d.createElement('button'),
                    cancel = d.createElement('button');
                function process() {
                    var area = grip.area,
                        escape = grip.escape,
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
                    var match = new RegExp(pattern, flag);
                    if (!input[2].checked) {
                        var str = match.exec(area.value), index;
                        area.value = area.value.replace(match, input[1].value);
                        str = str !== null && str[0] ? str[0].replace(match, input[1].value) : "";
                        index = area.value.indexOf(str);
                        grip.select(index, index + str.length);
                        editor.close(true);
                        grip.updateHistory();
                    } else {
                        grip.replace(match, input[1].value);
                    }
                    editor.close(true);
                    return false;
                }
                ok.innerHTML = mte.buttons.ok;
                cancel.innerHTML = mte.buttons.cancel;
                var search = d.createElement('input'),
                    replace = d.createElement('input'),
                    option = d.createElement('label');
                search.type = 'text';
                replace.type = 'text';
                search.title = speak[1];
                replace.title = speak[2];
                search.placeholder = search.title;
                replace.placeholder = replace.title;
                option.className = 'input';
                option.innerHTML = '<input type="checkbox"' + (s.value.length > 0 ? ' checked' : "") + '> ' + speak[3];
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
                header.innerHTML = speak[0];
                content.appendChild(search);
                content.appendChild(replace);
                content.appendChild(option);
                footer.appendChild(ok);
                footer.appendChild(cancel);
                w.setTimeout(function() {
                    search.focus();
                }, 10);
            });
        }
    });
    editor.shortcut('CTRL+70', function() {
        return base.composer.grip.config.buttons[name].click(), false;
    });
})(window, document, DASHBOARD);