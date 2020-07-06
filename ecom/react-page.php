<?php
if (!defined('CUSTOMER_PAGE')) {
    exit;
}

class PagesWrapper
{
    private $oPage;

    public function __construct($oPage)
    {
        $this->oPage = $oPage;    
    }

    public function getSubMenuData( $iPageParent, $iPageCurrent, $iDepth = 1 ){
        if( isset( $this->oPage ) ) {
            if( isset( $this->oPage->mData[$iPageParent] ) ){
                $aJson = [];

                foreach( $this->oPage->mData[$iPageParent] as $iPage => $bValue ){
                    $aData = $this->oPage->aPages[$iPage];

                    $aData['sSubContent'] = isset( $this->oPage->aPagesChildrens[$iPage] ) ? $this->getSubMenuData( $iPage, $iPageCurrent, $iDepth + 1 ) : null;
                    $aData['iDepth'] = $iDepth;

                    $aJson[] = $aData;
                }

                return $aJson;
            }
        }
    } // end function throwSubMenu
    
    public function getMenuData($iType, $iPageCurrent = null, $iDepthLimit = 1) {
        $this->oPage->throwMenu($iType, $iPageCurrent, $iDepthLimit);
        if( isset( $this->oPage->mData[0] ) ){
            $aJson = [
                'title' => $GLOBALS['aMenuTypes'][$iType],
                'items' => []
            ];

            foreach( $this->oPage->mData[0] as $iPage => $bValue ){
                $aData = $this->oPage->aPages[$iPage];

                $aData['sSubContent'] = isset( $this->oPage->mData[$iPage] ) ? $this->getSubMenuData( $iPage, $iPageCurrent, 1 ) : null;
                $aData['iDepth'] = 0;

                $aJson['items'][] = $aData;
            } // end foreach

            return $aJson;
        }
    }
}
$oPagesData = new PagesWrapper($oPage);

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
        $oPagesData->getMenuData(3, $iContent, 1)['items']
    )),
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