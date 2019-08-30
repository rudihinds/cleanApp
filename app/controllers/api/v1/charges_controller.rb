require 'stripe'

class Api::V1::ChargesController < ApplicationController

def create
    byebug
    Stripe.api_key: "sk_test_HE8fjQ7rFrvd8EKvcWWaf3w900AYtYs1UL"

    begin
        byebug
        customer = Stripe::Customer.create(
            :email => @current_user.email,
            :source => params[:charge][:token]
        )

        charge = Stripe.Charge.create({
            :customer => customer.id,
            :amount => params[:charge][:amount],
            :description => params[:charge][:description],
            :currency => params[:charge][:currency]
        }, {
            :idempotency_key => ip_key
        })

    rescue Stripe::CardError => e
        render json: {message: "oops!"}, status, :not_acceptable
    end
end

end
