class Api::V1::UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :my_cleanings]
  
    def create
      user = User.create( user_params )
      if user.valid?
        render json: { user: user, token: issue_token(user_id: user.id) }, status: :created
        # render json: { user: user }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :not_accepted
      end
    end

    def my_cleanings
      user = User.find_by(id: params[:id])
      cleanings = user.cleanings
      if cleanings
          render json: cleanings, :include => :cleaner
      else
          render json: { errors: cleanings.errors.full_messages }, status: :not_accepted
      end
      
    end

    def index
        users = User.all
        render json: users
     end
  
    private 
  
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :is_cleaner)
    end
  end
  