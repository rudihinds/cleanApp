class Api::V1::OffersController < ApplicationController
  skip_before_action :authorize
  skip_before_action :set_current_user

  def index
      offers = Offer.all
      render json: offers, :include => :cleaner
  end

  def create
      offer = Offer.create(offer_params)
      if offer.valid?
          render json: offer
      else
          render json: { errors: offer.errors.full_messages }, status: :not_accepted
      end
  end

  # def show
  #     user = User.find_by(id: params[:id])
  #     offers = user.offers
  #     if offers
  #         render json: offers, :include => :cleaner
  #     else
  #         render json: { errors: offers.errors.full_messages }, status: :not_accepted
  #     end
      
  # end

  def show
      offer = Offer.find_by(id: params[:id])
      if offer
          render json: offer, :include => :cleaner
      else
          render json: { errors: offer.errors.full_messages }, status: :not_accepted
      end
      
  end

  def destroy
      
      offer = Offer.find_by(id: params[:id])
      Offer.destroy(offer.id)
      render json: {action: "Deleted"}

  end

  def sorted_offers
    Offer.sort_available_offers
    # my_offers = Cleaner.find_by(id:12).offers.select{|offer| offer.expired }
    render json:  Cleaner.find_by(id:12).offers

    # if offers
    #   render json: offers
    # else
    #   render json: { errors: offers.errors.full_messages }, status: :not_accepted
    # end

  end
      

  private 

  def offer_params
    params.require(:offer).permit(
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
      :accepted,
      :expired
    )
  end


end
