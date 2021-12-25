import React from 'react'
import "./PaymentRight.css"

const PaymentRight = ({paymentOrderSubmitHandler, totalItem, allItemsPrice, shipping, promotionComponentShow,previousPrice,totalPriceAfterAddedShippingCost}) => {
    return (
        <div className="payment__right">
        <div className="payment__right__order">
          <button onClick={paymentOrderSubmitHandler}>Place your order</button>
          <h5>By placing your order ...... privacy things</h5>
        </div>
        <div className="payment__right__info">
          <h3>Order Summary</h3>
          <div>
            <p>Items ({totalItem}):</p>
            <p>{allItemsPrice}</p>
          </div>
          <div>
            <p>Shipping:</p>
            <p>USD {shipping === "standard" ? "$0.00" : "$15.99"}</p>
          </div>
          {promotionComponentShow && (
            <div className="payment__right__info__discount">
              <p>Discount:</p>
              <p>USD $15</p>
            </div>
          )}

          <div className="payment__right__totalPrice">
            {promotionComponentShow && (
              <div>
                {" "}
                <h6>Price</h6> <h6>${previousPrice}</h6>
              </div>
            )}
            <div className="payment__right__finalPrice">
              <h5 className="payment__right__finalPrice__p">Order total:</h5>
              <h5 className="payment__right__finalPrice__p">USD ${totalPriceAfterAddedShippingCost.toFixed(2)}</h5>
            </div>
          </div>
        </div>
      </div>
    )
}

export default PaymentRight
