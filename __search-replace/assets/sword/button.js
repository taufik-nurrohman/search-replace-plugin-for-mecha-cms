(function(w, d, base) {
    if (!base.composer) return;
    var editor = base.composer,
        grip = editor.grip,
        mte = base.languages.MTE,
        speak = mte.plugin_search_replace,
        name = 'binoculars plugin-search-replace';
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
                        return editor.exit(true), false;
                    }
                    var match = new RegExp(pattern, flag);
                    if (!input[2].checked) {
                        var str = match.exec(area.value), index;
                        area.value = area.value.replace(match, input[1].value);
                        str = str !== null && str[0] ? str[0].replace(match, input[1].value) : "";
                        index = area.value.indexOf(str);
                        grip.select(index, index + str.length, true);
                    } else {
                        grip.replace(match, input[1].value);
                    }
                    return editor.close(true), false;
                }
                ok.innerHTML = mte.actions.ok;
                cancel.innerHTML = mte.actions.cancel;
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
                    var _this = this, k = grip.key(e);
                    if (k === 'enter') return replace.value = search.value, process();
                    if (k === 'arrowup') return false;
                    if (k === 'arrowdown') return replace.focus(), false;
                    if (k === 'escape' || e.ctrlKey && k === 'f') return editor.exit(true), false;
                    w.setTimeout(function() {
                        var _regex = _this.value.match(/^\/.*?\/[gimuy]*$/);
                        _this.style.backgroundColor = _regex ? '#DBFFD6' : "";
                        _this.style.color = _regex ? '#000' : "";
                    }, .1);
                });
                editor.event("keydown", replace, function(e) {
                    var k = grip.key(e);
                    if (k === 'enter') return process();
                    if (k === 'escape') return editor.exit(true), false;
                    if (k === 'arrowup') return search.focus(), false;
                    if (k === 'arrowdown') return ok.focus(), false;
                });
                editor.event("click", ok, process);
                editor.event("click", cancel, function() {
                    return editor.exit(true), false;
                });
                editor.event("keydown", ok, function(e) {
                    var k = grip.key(e);
                    if (k === 'enter') return process();
                    if (k === 'escape') return editor.exit(true), false;
                    if (k === 'arrowup') return replace.focus(), false;
                    if (k.match(/^arrow(right|down)$/)) return cancel.focus(), false;
                });
                editor.event("keydown", cancel, function(e) {
                    var k = grip.key(e);
                    if (k.match(/^enter|escape$/)) return editor.exit(true), false;
                    if (k.match(/^arrow(left|up)$/)) return ok.focus(), false;
                    if (k === 'arrowdown') return false;
                });
                header.innerHTML = speak[0][0];
                content.appendChild(search);
                content.appendChild(replace);
                content.appendChild(option);
                footer.appendChild(ok);
                footer.appendChild(cancel);
                w.setTimeout(function() {
                    search.focus();
                }, .2);
            });
        }
    });
    // `Ctrl + F` to "search/replace"
    editor.shortcut('ctrl+f', function() {
        return base.composer.grip.config.buttons[name].click(), false;
    });
})(window, document, DASHBOARD);