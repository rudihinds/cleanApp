class Api::V1::StripeAccountController < ApplicationController

   
    def create 
        Stripe.api_key = 'sk_test_HE8fjQ7rFrvd8EKvcWWaf3w900AYtYs1UL'
       

        acct = Stripe::Account.create({
        country: 'US',
        type: 'custom',
    })
        # render json: acct
    end

end
