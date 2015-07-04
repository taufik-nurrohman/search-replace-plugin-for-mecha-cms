<?php

$speak = Config::speak();
$speak_SR = Mecha::A($speak->plugin_search_replace);

Config::merge('DASHBOARD.languages', array(
    'plugin_search_replace_title_search_replace' => $speak_SR[0],
    'plugin_search_replace_description_find' => $speak_SR[1],
    'plugin_search_replace_description_replace' => $speak_SR[2],
    'plugin_search_replace_description_selection' => $speak_SR[3]
));

Weapon::add('SHIPMENT_REGION_BOTTOM', function() {
    echo Asset::javascript('cabinet/plugins/' . basename(__DIR__) . '/sword/button.js');
}, 20);