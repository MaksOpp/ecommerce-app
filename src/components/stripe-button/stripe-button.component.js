import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const publishableKey = 'pk_test_51HeOFFByMb2JsM9muAtSIwxXnJ1sal6BHXCY8JpbIM7PCncO34BwoSaJ5KkqVPBV8pH5BZ6DH64BrcAQj8V7Op0l00Wkw1lq4P'
    const priceForStripe = price * 100;

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='Test App'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;

