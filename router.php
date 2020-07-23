<?php

if($_SERVER['PATH_INFO'] === '/json/') {
    unlink($_SERVER['PATH_INFO']);
    $_SERVER['QUERY_STRING'] = 'json&'.$_SERVER['QUERY_STRING'];
    $_SERVER['REQUEST_URI'] = '?'.$_SERVER['QUERY_STRING'];
    $_GET['json'] = '';
}

return false;