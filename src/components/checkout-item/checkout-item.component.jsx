import React from 'react';
import { connect } from 'react-redux';

import { removeItem, addItem, decreaseItemQuantity } from '../../redux/cart/cart.actions'

import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem, removeItem, addItem, decreaseItemQuantity }) => {
    const { name, price, imageUrl, quantity } = cartItem;
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt='item' />
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div onClick={() => decreaseItemQuantity(cartItem)}>&#10094;</div>
                <span>{quantity}</span>
                <div onClick={() => addItem(cartItem)}>&#10095;</div>
            </QuantityContainer>
            <TextContainer>{price}</TextContainer>
            <RemoveButtonContainer onClick={() => removeItem(cartItem)}>
                &#10005;
      </RemoveButtonContainer>

        </CheckoutItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    removeItem: item => dispatch(removeItem(item)),
    addItem: item => dispatch(addItem(item)),
    decreaseItemQuantity: item => dispatch(decreaseItemQuantity(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);