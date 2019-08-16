class Api::V1::CleanersController < ApplicationController
    skip_before_action :authorize

    
    def available
        start_time = DateTime.parse(params[:datetime].split('GMT').first)
        # start_time = DateTime.parse(params[:datetime])
        end_time = start_time + params[:duration].to_i.minutes
        render json: Cleaner.available(start_time, end_time)
    end

    def show
        cleaner = Cleaner.find_by(id: params[:id])
        render json: cleaner
    end

    

end
