<?php

function renderProducts($aData)
{
    if (isset($aData['iProducts'])) {
        $oProduct = ProductsExt::getInstance();
        $aData['aProducts'] = array_map(
            function ($aEntry) {
                $result = [
                    'sName' => $aEntry['sName'],
                    'mPrice' => $aEntry['mPrice'],
                    'sLinkName' => $aEntry['sLinkName']
                ];
                if (isset($aEntry['sImage'])) {
                    $result['sImage'] = [
                        'sFileName' => DIR_FILES . $aEntry['sImage']['iSizeValue1'] . '/' . $aEntry['sImage']['sFileName']
                    ];
                }

                return $result;
            },
            $oProduct->getAllProductListData($aData['iPage'], 10)
        );
    }

    return $aData;
}
function renderImages($aData, $oFile)
{
    $iItem = -1;
    if(isset($aData['iPage']))
        $iItem = $aData['iPage'];
    else if(isset($aData['iProduct']))
        $iItem = $aData['iProduct'];
    else
        return $aData;


    $left = $oFile->getImageDataByTypes($iItem, 1, false);
    $right = $oFile->getImageDataByTypes($iItem, 2, false);  

    $images = [];

    if (isset($left) && !is_null($left)) {
        $images['left'] = $left;
    }
    if (isset($right) && !is_null($right)) {
        $images['right'] = $right;
    }

    if (!empty($images)) {
        $aData['aImages'] = $images;
    }

    return $aData;
}

function renderPages($aData, $oPage, $oFile)
{
    if (isset($aData['iSubpagesShow']) && $aData['iSubpagesShow'] > 0 && isset($oPage->aPagesChildrens[$aData['iPage']])) {
        $aData['aPages'] = array_map(
            function ($aEntry) use ($oPage, $oFile) {
                $aData = $oPage->aPages[$aEntry];

                $result = [
                    'iPage' => $aData['iPage'],
                    'sName' => $aData['sName'],
                    'sLinkName' => $aData['sLinkName']
                ];

                if(isset($aData['sDescriptionShort'])) {
                    $result['sDescriptionShort'] = changeTxt($aData['sDescriptionShort'], 'nlNds');
                }

                if(isset($oFile->aImagesDefault[1][$aData['iPage']]['sFileName']) && !empty($oFile->aImagesDefault[1][$aData['iPage']]['sFileName'])) {
                    $result['sImage']['sFileName'] = 
                        DIR_FILES .
                        $oFile->aImagesDefault[1][$aData['iPage']]['iSizeValue1'] . '/' .
                        $oFile->aImagesDefault[1][$aData['iPage']]['sFileName'];
                }

                return $result;
            },
            $oPage->aPagesChildrens[$aData['iPage']]
        );
    }

    return $aData;
}
