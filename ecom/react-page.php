<?php
if (!defined('CUSTOMER_PAGE')) {
    exit;
}
$vars = [
    '<?LANGUAGE?>' => $config['language'],
    '<?TITLE?>' => $sTitle.$config['title'],
    '<?DESCRIPTION?>' => $sDescription,
    '<?QUICKCART-VERSION?>' => $config['version'],
    '<?CSS?>' => $config['dir_skin'].$config['style'],
    '<?FONT-CSS?>' => $config['dir_skin'].'fonts/icofont/icofont.min.css',
    '<?JS?>' => $config['dir_skin'].'js/react-page.js',
    '<?WARNING?>' => $lang['cf_no_word'],
    '<?EMAIL?>' => $lang['cf_mail'],
    '<?WRONG-VALUE?>' => $lang['cf_wrong_value'],
    '<?IMG?>' => $config['dir_skin'].'img/',
    '<?CATEGORIES?>' => str_replace('"', '\"', $oPage->throwMenu( 3, $iContent, 1)),
    '<?IMAGES?>' =>  
        str_replace('"', '\"', $oFile->listImagesByTypes( $aData['iPage'], 1, false )).
        str_replace('"', '\"', $oFile->listImagesByTypes( $aData['iPage'], 2, false ))
];

if( isset( $aData['iProducts'] ) ){
    $oProduct = Products::getInstance( );
    $vars['<?PRODUCTS?>'] = str_replace(['"', "\r\n"], ['\"',''], $oProduct->listProducts( $aData['iPage'], 10 ));
}


$template = file_get_contents(__DIR__.'/react-page.html');
print str_replace(array_keys($vars), array_values($vars), $template);
