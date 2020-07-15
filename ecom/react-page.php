<?php
if (!defined('CUSTOMER_PAGE')) {
    exit;
}

require_once __DIR__."/utils/PagesExt.php";
require_once __DIR__."/utils/FilesExt.php";
require_once __DIR__."/utils/ProductsExt.php";

$oPage = PagesExt::getInstance();
$oFile = FilesExt::getInstance($iContent);

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
            $result = [
                'sName' => $aEntry['sName'],
                'sLinkName' => $aEntry['sLinkName'],
                'sSubContent' => null
            ];
            if(isset($aEntry['sSubContent'])) {
                $result['sSubContent'] = array_map(
                    function($aSubEntry){
                        return [
                            'sName' => $aSubEntry['sName'],
                            'sLinkName' => $aSubEntry['sLinkName']
                        ];
                    },
                    $aEntry['sSubContent']
                );
            }

            return $result;
        },
        $oPage->getMenuData(3, $iContent, 1)['items']
    )),
    '<?IMAGES?>' =>  json_encode([
        'left' => $oFile->getImageDataByTypes( $aData['iPage'], 1, false ),
        'right' => $oFile->getImageDataByTypes( $aData['iPage'], 2, false )
    ]),
    '<?ABOUTUS?>' => json_encode(array_map(
        function($aEntry) use ($oPage) {
            $aData = $oPage->aPages[$aEntry];

            $aData['sDescriptionShort'] = changeTxt( $aData['sDescriptionShort'], 'nlNds' );
            
            return [
                'sName' => $aData['sName'],
                'sDescriptionShort' => $aData['sDescriptionShort']
            ];
        },
        $oPage->aPagesChildrens[$aData['iPage']]
    )),
    '<?PAGES?>' => json_encode(array_map(
        function($aEntry) {
            $result = [
                'sName' => $aEntry['sName'],
                'sLinkName' => $aEntry['sLinkName'],
                'sSubContent' => null
            ];
            if(isset($aEntry['sSubContent'])) {
                $result['sSubContent'] = array_map(
                    function($aSubEntry){
                        return [
                            'sName' => $aSubEntry['sName'],
                            'sLinkName' => $aSubEntry['sLinkName']
                        ];
                    },
                    $aEntry['sSubContent']
                );
            }

            return $result;
        },
        $oPage->getMenuData(2, $iContent, 1)['items']
    ))
];

if( isset( $aData['iProducts'] ) ){
    $oProduct = ProductsExt::getInstance( );
    $vars['<?PRODUCTS?>'] = json_encode(array_map(
        function($aEntry) {
            return [
                'sName' => $aEntry['sName'],
                'mPrice' => $aEntry['mPrice'],
                'sLinkName' => $aEntry['sLinkName'],
                'sImage' => [
                    'sFileName' => DIR_FILES.$aEntry['sImage']['iSizeValue1'].'/'.$aEntry['sImage']['sFileName']
                ]
            ];
        },
        $oProduct->getAllProductListData( $aData['iPage'], 10 )
    ));
}


$template = file_get_contents(__DIR__.'/react-page.html');
print str_replace(array_keys($vars), array_values($vars), $template);

print "<!--";
var_dump($oPage->getMenuData(2, $iContent, 1));
print "-->";