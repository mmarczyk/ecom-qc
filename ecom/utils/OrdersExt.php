<?php

class OrdersExt extends Orders
{
    public function getShippingPaymentsData( ){
        $aShipping = $this->throwPaymentsShipping( 2 );
        $aPayments = $this->throwPaymentsShipping( 1 );
        if( isset( $aShipping ) && isset( $aPayments ) ){
            $aResult = [];
            foreach( $aShipping as $iShipping => $aData ){
                if( isset( $aData['aPayments'] ) ){
                    foreach( $aData['aPayments'] as $iPayment => $sPriceModify ){
                        if( isset( $aPayments[$iPayment] ) ){
                            $fShippingPaymentPrice = !empty( $sPriceModify ) ? generatePrice( $aData['fPrice'], $sPriceModify ) : $aData['fPrice'];
                            $aResult[] = $aData;
                        }
                    }
                }
            }
            return $aResult;
        }
    }

    public function getShippingData( ){
        $aShipping = $this->throwPaymentsShipping( 2 );
        if( isset( $aShipping ) ){
            $aResult = [];
            foreach( $aShipping as $iShipping => $aData ){
                $aResult[] = $aData;
            }
            return $aResult;
        }
    }

    public function getPaymentsData( ){
        $aPayments = $this->throwPaymentsShipping( 1 );
        if( isset( $aPayments ) ){
            $aResult = [];
            foreach( $aPayments as $aPayments => $aData ){
                $aResult[] = $aData;
            }
            return $aResult;
        }
    }
}
