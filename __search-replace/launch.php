<?php

Config::merge('DASHBOARD.languages.MTE.plugin_search_replace', $speak->plugin_search_replace);

Weapon::add('SHIPMENT_REGION_BOTTOM', function() {
    echo Asset::javascript(__DIR__ . DS . 'assets' . DS . 'sword' . DS . 'button.js', "", 'sword/editor.button.' . ltrim(File::B(__DIR__), '_') . '.min.js');
}, 20);