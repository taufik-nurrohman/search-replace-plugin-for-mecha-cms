<?php

Config::merge('DASHBOARD.languages.MTE', array(
    'plugin_search_replace' => (array) $speak->plugin_search_replace
));

Weapon::add('SHIPMENT_REGION_BOTTOM', function() {
    echo Asset::javascript(__DIR__ . DS . 'assets' . DS . 'sword' . DS . 'button.js');
}, 20);