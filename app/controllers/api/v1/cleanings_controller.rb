class Api::V1::CleaningsController < ApplicationController
    skip_before_action :authorize


    def index
        cleanings = Cleaning.all
        render json: cleanings 
    end

end
