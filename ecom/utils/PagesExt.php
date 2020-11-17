<?php

class PagesExt extends Pages
{
    protected static $oInstance;

    public static function getInstance( ){  
        if( !isset( self::$oInstance ) ){  
            self::$oInstance = new PagesExt( );  
        }  
        return self::$oInstance;  
    } // end function getInstance

    private function __construct( ){
        $this->generateCache( );
    } // end function __construct
    
    public function getSubMenuData( $iPageParent, $iPageCurrent, $iDepth = 1 ){
        if( isset( $this->mData[$iPageParent] ) ){
            $aJson = [];

            foreach( $this->mData[$iPageParent] as $iPage => $bValue ){
                $aData = $this->aPages[$iPage];

                $aData['sSubContent'] = isset( $this->aPagesChildrens[$iPage] ) ? $this->getSubMenuData( $iPage, $iPageCurrent, $iDepth + 1 ) : null;
                $aData['iDepth'] = $iDepth;
                $aData['iPage'] = $iPage;

                $aJson[] = $aData;
            }

            return $aJson;
        }
    } // end function throwSubMenu
    
    public function getMenuData($iType, $iPageCurrent = null, $iDepthLimit = 1) {
        if( !isset( $this->aPagesParentsTypes[$iType] ) )
            return null;
        $this->mData = null;

        if( isset( $iPageCurrent ) )
            $this->generatePageParents( $iPageCurrent );

        $this->generateMenuData( $iType, $iPageCurrent, $iDepthLimit, 0 );
        if( isset( $this->mData[0] ) ){
            $aJson = [
                'title' => $GLOBALS['aMenuTypes'][$iType],
                'items' => []
            ];

            foreach( $this->mData[0] as $iPage => $bValue ){
                $aData = $this->aPages[$iPage];

                $aData['sSubContent'] = isset( $this->mData[$iPage] ) ? $this->getSubMenuData( $iPage, $iPageCurrent, 1 ) : null;
                $aData['iDepth'] = 0;

                $aJson['items'][] = $aData;
            } // end foreach

            return $aJson;
        }
    }
}