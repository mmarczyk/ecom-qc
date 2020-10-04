<?php
if (!defined('CUSTOMER_PAGE')) {
    exit;
}

require_once __DIR__ . "/utils/PagesExt.php";
require_once __DIR__ . "/utils/FilesExt.php";
require_once __DIR__ . "/utils/ProductsExt.php";
require_once __DIR__ . "/utils/renderers.php";

$oPage = PagesExt::getInstance();
if( isset( $iProduct ) ){
  $oFile = FilesExt::getInstance( $iProduct, true );
}
else{
  $oFile = FilesExt::getInstance( $iContent );
}

$vars = [
    '<?LANGUAGE?>' => $config['language'],
    '<?TITLE?>' => $sTitle . $config['title'],
    '<?DESCRIPTION?>' => $sDescription,
    '<?QUICKCART-VERSION?>' => $config['version'],
    '<?CSS?>' => $config['dir_skin'] . $config['style'],
    '<?FONT-CSS?>' => $config['dir_skin'] . 'fonts/icofont/icofont.min.css',
    '<?JS?>' => $config['dir_skin'] . 'js',
    '<?WARNING?>' => $lang['cf_no_word'],
    '<?EMAIL?>' => $lang['cf_mail'],
    '<?WRONG-VALUE?>' => $lang['cf_wrong_value'],
    '<?IMG?>' => $config['dir_skin'] . 'img/',
    '<?CATEGORIES?>' => json_encode(array_map(
        function ($aEntry) {
            $result = [
                'sName' => $aEntry['sName'],
                'sLinkName' => $aEntry['sLinkName'],
                'sSubContent' => null
            ];
            if (isset($aEntry['sSubContent'])) {
                $result['sSubContent'] = array_map(
                    function ($aSubEntry) {
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
    '<?MENU?>' => json_encode(array_map(
        function ($aEntry) {
            $result = [
                'sName' => $aEntry['sName'],
                'sLinkName' => $aEntry['sLinkName'],
                'sSubContent' => null
            ];
            if (isset($aEntry['sSubContent'])) {
                $result['sSubContent'] = array_map(
                    function ($aSubEntry) {
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
    )),
    '<?CARTPAGE?>' => $oPage->aPages[$config['basket_page']]['sLinkName']
];

$aData = renderProducts($aData);
$aData = renderImages($aData, $oFile);
$aData = renderPages($aData, $oPage, $oFile);
$aData = renderCart($aData, $oOrder, $config);
$vars['<?DATA?>'] = json_encode($aData);

if(isset($_GET['json'])) {
    print $vars['<?DATA?>'];
} else {
    $template = file_get_contents(__DIR__ . '/react-page.html');
    print str_replace(array_keys($vars), array_values($vars), $template);
}