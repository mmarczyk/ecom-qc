<?php

class FilesExt extends Files
{
    protected static $oInstance;

    public static function getInstance( $mValue = null, $bProduct = null ){  
        if( !isset( self::$oInstance ) ){
            self::$oInstance = new FilesExt( $mValue, $bProduct );  
        }  
        return self::$oInstance;  
    } // end function getInstance

    private function __construct( $mValue, $bProduct = null ){
        $this->generateCache( $mValue, $bProduct );
    } // end function __construct  

    public function getImageDataByTypes( $iLink, $iType = 1, $bLinks = true ){
        if( isset( $this->aImagesTypes[$iLink][$iType] ) ){
            $iCount = count( $this->aImagesTypes[$iLink][$iType] );
            $aDataList = [];

            for( $i = 0; $i < $iCount; $i++ ){
                $aData = $this->aFilesImages[$this->aImagesTypes[$iLink][$iType][$i]];
                $aData['sAlt'] = isset( $aData['sDescription'] ) ? $aData['sDescription'] : null;
                $aData['sFullImageLink'] = DIR_FILES.$aData['sFileName'];
                $aData['sSizedImageLink'] = DIR_FILES.$aData['iSizeValue2'].'/'.$aData['sFileName'];

                $aDataList[] = $aData;
            } // end for

            return $aDataList;
        }
    } // end function listImagesByTypes
}