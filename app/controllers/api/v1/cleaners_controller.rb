class Api::V1::CleanersController < ApplicationController
    # skip_before_action :authorize
    # skip_before_action :authorize, only: [:available, :show]
    skip_before_action :authorize, only: [:available, :show, :get_this_months_earnings, :get_next_months_earnings, :get_last_months_earnings]


    
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

    def get_this_months_earnings
        earnings = Cleaner.this_months_earnings
        if earnings
            render json: { this_months_earnings: earnings }
        else
            render json: { errors: earnings.errors.full_messages }, status: :not_accepted
        end
    end

    def get_last_months_earnings
        earnings = Cleaner.last_months_earnings
        if earnings
            render json: { last_months_earnings: earnings }
        else
            render json: { errors: earnings.errors.full_messages }, status: :not_accepted
        end
    end

    def get_next_months_earnings
        earnings = Cleaner.next_months_earnings
        if earnings
            render json: { next_months_earnings: earnings }
        else
            render json: { errors: earnings.errors.full_messages }, status: :not_accepted
        end
    end

    

end
