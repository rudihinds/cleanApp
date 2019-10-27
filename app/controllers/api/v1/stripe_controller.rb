
class Api::V1::StripeController < ApplicationController
    # include HTTParty
    skip_before_action :authorize
    skip_before_action :set_current_user

 


    def connect
        user = User.find_by(id: 1)
        # this will be for redirect
        response = HTTParty.post("https://connect.stripe.com/oauth/token",
            query: {
                client_secret: "sk_test_HE8fjQ7rFrvd8EKvcWWaf3w900AYtYs1UL",
                code: params[:code],
                grant_type: "authorization_code"
            }
        )

    if response.parsed_response.key?("error")
        render json: { errors: response.parsed_response["error_description"] }
    else
        stripe_user_id = response.parsed_response["stripe_user_id"]
        user.update_column(:stripe_user_id, stripe_user_id)
        redirect_to( "http://localhost:3001/cleaners/stripe-redirect", :alert => "Something serious happened" )

    end


    # def dashboard
    #     # need to change the code for our client
    #     account = Stripe::Account.retrieve(@user.stripe_user_id)
    #     login_links = account.login_links.create
    
    #     redirect_to login_links.url
    # end
      
end

end
