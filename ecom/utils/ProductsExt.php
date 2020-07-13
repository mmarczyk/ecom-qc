<?php

class ProductsExt extends Products
{
    protected static $oInstance;

    public static function getInstance()
    {
        if (!isset(self::$oInstance)) {
            self::$oInstance = new ProductsExt();
        }
        return self::$oInstance;
    } // end function getInstance

    private function __construct()
    {
        $this->generateCache();
    } // end function __construct   

    public function getAllProductListData($mData, $iList = null, $bPagination = true)
    {
        global $config, $lang;

        $oFile = FilesExt::getInstance();
        $oPage = Pages::getInstance();
        $content = null;
        $sUrlExt = null;
        $this->aPages = null;

        if (is_numeric($mData)) {
            $iPage = $mData;
            if (isset($GLOBALS['sPhrase']) && !empty($GLOBALS['sPhrase'])) {
                $aProducts = $this->generateProductsSearchListArray($GLOBALS['sPhrase']);
                $aUrlExt['sPhrase'] = 'sPhrase=' . $GLOBALS['sPhrase'];
            } else {
                if (DISPLAY_SUBCATEGORY_PRODUCTS === true) {
                    // return all pages and subpages
                    $oPage->mData = null;
                    $aData = $oPage->throwAllChildrens($iPage);
                    if (isset($aData)) {
                        foreach ($aData as $iValue) {
                            $this->aPages[$iValue] = $iValue;
                        }
                    }
                }
                $this->aPages[$iPage] = $iPage;
                $aProducts = $this->generateProductsListArray();
            }
        } else {
            $aProducts = $mData;
        }

        $aProductList = [];
        if (isset($aProducts) && is_array($aProducts)) {
            $iCount = count($aProducts);
            if (!isset($iList)) {
                $iList = $config['products_list'];
            }

            for ($i = 0; $i < $iCount && $i < $iList; $i++) {
                $aData = $this->aProducts[$aProducts[$i]];

                if (!empty($aData['sDescriptionShort'])) {
                    $aData['sDescriptionShort'] = changeTxt($aData['sDescriptionShort'], 'nlNds');
                }

                if (isset($oFile) && isset($oFile->aImagesDefault[2][$aData['iProduct']])) {
                    $aData['sImage'] = $oFile->aImagesDefault[2][$aData['iProduct']];
                }

                $aProductList[] = $aData;
            } // end for

        }

        return $aProductList;
    }
}
