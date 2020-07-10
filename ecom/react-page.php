<?php
if (!defined('CUSTOMER_PAGE')) {
    exit;
}

require_once __DIR__."/utils/PagesExt.php";
require_once __DIR__."/utils/FilesExt.php";

$oPage = PagesExt::getInstance();
$oFile = FilesExt::getInstance();

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
    '<?CATEGORIES?>' => json_encode(array_map(
        function($aEntry) {
            return [
                'sName' => $aEntry['sName'],
                'sLinkName' => $aEntry['sLinkName'],
                'sSubContent' => array_map(
                    function($aSubEntry){
                        return [
                            'sName' => $aSubEntry['sName'],
                            'sLinkName' => $aSubEntry['sLinkName']
                        ];
                    },
                    $aEntry['sSubContent']
                )
            ];
        },
        $oPage->getMenuData(3, $iContent, 1)['items']
    )),
    '<?IMAGES?>' =>  json_encode([
        'left' => $oFile->getImageDataByTypes( $aData['iPage'], 1, false ),
        'right' => $oFile->getImageDataByTypes( $aData['iPage'], 2, false )
    ])
];

if( isset( $aData['iProducts'] ) ){
    $oProduct = Products::getInstance( );
    $vars['<?PRODUCTS?>'] = str_replace(['"', "\r\n"], ['\"',''], $oProduct->listProducts( $aData['iPage'], 10 ));
}


$template = file_get_contents(__DIR__.'/react-page.html');
print str_replace(array_keys($vars), array_values($vars), $template);
print "<!--";
var_dump($oFile->getImageDataByTypes( $aData['iPage'], 1, false ));
var_dump($oFile->getImageDataByTypes( $aData['iPage'], 2, false ));
print "//-->";