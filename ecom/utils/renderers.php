<?php

function renderProductImage($sImage) {
    if($sImage)
        return DIR_FILES . $sImage['iSizeValue1'] . '/' . $sImage['sFileName'];

    return null;
}

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
                        'sFileName' => renderProductImage($aEntry['sImage'])
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

function renderCart($aData, $oOrder, $config, $oFile)
{
    if(isset($config['this_is_basket_page']) && $config['this_is_basket_page'] === true) {
        $aCart = [];
        $fTotalAmount = 0;
        if( isset( $oOrder->aProducts ) ){
            foreach( $oOrder->aProducts as $aProductData ){
                $aProductData['sPrice'] = displayPrice(
                    normalizePrice( $aProductData['fPrice']
                ));
                $aProductData['sSummary'] = displayPrice(
                    normalizePrice( $aProductData['fSummary']
                ));
                $aProductData['sImage'] = renderProductImage(
                    $oFile->aImagesDefault[2][$aProductData['iProduct']]
                );
                $aProductData['sLinkDelete'] = htmlspecialchars_decode(
                    $aProductData['sLinkDelete']
                );

                $aCart[] = $aProductData;
                $fTotalAmount += $aProductData['fPrice']*$aProductData['iQuantity'];
            }

            $aData['aCart'] = [
                'aProducts' => $aCart,
                'fTotalAmount' => displayPrice(
                    normalizePrice($fTotalAmount)
                ),
                'oOrder' => [
                    'name' => '',
                    'email' => '',
                    'phone' => '',
                    'street' => '',
                    'zip' => '',
                    'city' => '',
                    'payment' => -1,
                    'shipping' => [
                        'price' => 0.0,
                        'id' => -1
                    ],
                    'comment' => ''
                ],
                'bAcceptRules' => false,
                'bAcceptGdpr' => false
            ];
        } else {
            $aData['aCart'] = 'empty';
        }
    }

    return $aData;
}

function renderShipping($aData, $oOrder)
{
    $oOrder = new OrdersExt();
    $aData['aShipping'] = array_map(
        function($aEntry) {
            return [
                'iIdShipping' => $aEntry['iId'],
                'sName' => $aEntry['sName'],
                'fPrice' => displayPrice($aEntry['fPrice'])
            ];
        },
        $oOrder->getShippingData()
    );
    return $aData;
}

function renderPayments($aData, $oOrder)
{
    $oOrder = new OrdersExt();
    $aData['aPayments'] = array_map(
        function($aEntry) {
            return [
                'iIdPayment' => $aEntry['iId'],
                'sName' => $aEntry['sName']
            ];
        },
        $oOrder->getPaymentsData()
    );
    return $aData;
}

function renderOrder($aData, $oOrder, $config, $oFile, $iOrder) {
    if($config['this_is_order_page'] && $config['this_is_order_page'] === true && isset($iOrder) && $iOrder > 0) {
        $aData['aOrder'] = $oOrder->throwOrder($iOrder);

        $aData['aOrder']['aProducts'] = [];
        $fTotalAmount = 0;

        foreach($oOrder->aProducts as $iId => $aProductData) {
            $aEntry = [
                'iProduct' => $aProductData['iProduct'],
                'iQuantity' => $aProductData['iQuantity'],
                'sName' => $aProductData['sName'],
                'sImage' => $aProductData['sImage'],
                'sLinkName' => $aProductData['sLinkName'],
                'sLinkDelete' => $aProductData['sLinkDelete'],
                'fPrice' => $aProductData['fPrice'],
                'fSummary' => $aProductData['fSummary'],
                'sImage' => renderProductImage(
                    $oFile->aImagesDefault[2][$aProductData['iProduct']]
                )
            ];

            $aData['aOrder']['aProducts'][] = $aEntry;
            $fTotalAmount += $aProductData['fPrice']*$aProductData['iQuantity']; 
        }

        $aData['aOrder']['fTotalAmount'] = displayPrice(
            normalizePrice($fTotalAmount)
        );
    }

    return $aData;
}