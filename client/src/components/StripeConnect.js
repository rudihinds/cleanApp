import React from 'react';
import Container from '@material-ui/core/Container'
import NavLink from 'react-router-dom'

const StripeConnect = () => {


    return (
        <div>
            {/* <br/>
            <br/>
            <br/>
            <br/>
            <br/> */}
            <Container>
                <br/>
            <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FhF70Qhprz4NZkmp4xBpmsgUgJogGeCu&scope=read_write" class="stripe-connect dark">
                <span>
                    Connect with Stripe
                </span>
            </a>
            </Container>
        </div>
    );
};

export default StripeConnect;