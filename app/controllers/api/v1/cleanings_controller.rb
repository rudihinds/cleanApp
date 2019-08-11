class Api::V1::CleaningsController < ApplicationController
    skip_before_action :authorize
    skip_before_action :set_current_user



    def index
        cleanings = Cleaning.all
        render json: cleanings 
    end

    def create
        
        cleaning = Cleaning.create(cleaning_params)

            # user_id: params[:user_id], 
            # cleaner_id: params[:cleaner_id], 
            # start_time: params[:start_time],
            # duration: params[:duration],
            # frequency: params[:frequency],
            # location: params[:location],
            # address_one: params[:address_one],
            # adress_two: params[:address_two],
            # postcode: params[:postcode],
            # hourly_rate: params[:hourly_rate],
            # end_time: params[:end_time]
            
        if cleaning.valid?
            render json: cleaning
        else
            render json: { errors: cleaning.errors.full_messages }, status: :not_accepted
        end
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
