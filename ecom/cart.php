<?php

$config['this_is_basket_page'] = true;

if( isset( $aData['sName'] ) && !empty( $config['basket_page'] ) && $config['basket_page'] == $iContent ){ // basket actions
  // basket
  if( isset( $_POST['aProducts'] ) ){
    if( !isset( $aUrls ) )
      $aUrls = throwSiteUrls( );
    // save basket
    $oOrder->saveBasket( $_POST['aProducts'] );
  }

  if( isset( $iProductDelete ) && is_numeric( $iProductDelete ) ){
    // delete product from basket
    $oOrder->deleteFromBasket( $iProductDelete );
  }

  if( isset( $_POST['iProductAdd'] ) && isset( $_POST['iQuantity'] ) ){
    $iProductAdd = $_POST['iProductAdd'];
    $iQuantity = $_POST['iQuantity'];
  }
  if( isset( $iProductAdd ) && is_numeric( $iProductAdd ) && isset( $iQuantity ) && is_numeric( $iQuantity ) ){
    if( !isset( $oProduct ) )
      $oProduct = Products::getInstance( );

    if( isset( $oProduct->aProducts[$iProductAdd] ) && is_numeric( $oProduct->aProducts[$iProductAdd]['mPrice'] ) ){
      // add product to basket
      $oOrder->saveBasket( Array( $iProductAdd => $iQuantity ), true );
    }
  }

  $oOrder->generateBasket( );
}

require_once __DIR__."/page.php";