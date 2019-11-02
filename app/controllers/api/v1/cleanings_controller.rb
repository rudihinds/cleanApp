class Api::V1::CleaningsController < ApplicationController
    skip_before_action :authorize
    skip_before_action :set_current_user

    def index
        cleanings = Cleaning.all
        render json: cleanings, :include => :cleaner
    end

    def create
        cleaning = Cleaning.create(cleaning_params)
        if cleaning.valid?
            render json: cleaning
        else
            render json: { errors: cleaning.errors.full_messages }, status: :not_accepted
        end
    end

    # def show
    #     user = User.find_by(id: params[:id])
    #     cleanings = user.cleanings
    #     if cleanings
    #         render json: cleanings, :include => :cleaner
    #     else
    #         render json: { errors: cleanings.errors.full_messages }, status: :not_accepted
    #     end
        
    # end

    def show
        cleaning = Cleaning.find_by(id: params[:id])
        if cleaning
            render json: cleaning, :include => :cleaner
        else
            render json: { errors: cleaning.errors.full_messages }, status: :not_accepted
        end
        
    end

    def destroy
        
        cleaning = Cleaning.find_by(id: params[:id])
        Cleaning.destroy(cleaning.id)
        render json: {action: "Deleted"}

    end
        

    private 
  
    def cleaning_params
      params.require(:cleaning).permit(
        :user_id, 
        :cleaner_id,
        :start_time,
        :duration, 
        :frequency, 
        :location, 
        :address_one, 
        :adress_two, 
        :postcode, 
        :hourly_rate,
        :end_time, 
      )
    end


end
