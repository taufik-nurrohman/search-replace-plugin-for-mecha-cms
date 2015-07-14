<?php

$speak = Config::speak();
$speak_search_replace = Mecha::A($speak->plugin_search_replace);

Config::merge('DASHBOARD.languages', array(
    'plugin_search_replace' => $speak_search_replace
));

Weapon::add('SHIPMENT_REGION_BOTTOM', function() {
    echo Asset::javascript('cabinet/plugins/' . File::B(__DIR__) . '/assets/sword/button.js');
}, 20);