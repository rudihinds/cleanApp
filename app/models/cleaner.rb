class Cleaner < ApplicationRecord
  has_many :cleanings
  has_many :offers
  has_many :reviews, through: :cleanings
  has_many :users, through: :cleanings
  has_one :user

  def self.available(start_time, end_time)
    self.all.select{ |c| c.available(start_time, end_time) }
  end

  def available(start_time, end_time)
    # finds if at least one booking on each cleaner clashes with the booking request, it will return true for clashes
    # and hence false for available, so we add the bang ! to get the cleaners that return false for clashes and hence true for available
      this_clashes_with_one_of_my_cleanings = self.cleanings.find do |cleaning|
      cleaning_end_time = cleaning.start_time + cleaning.duration.minutes

      clashes = cleaning.start_time < start_time && cleaning_end_time > start_time ||
      cleaning.start_time > start_time && cleaning.start_time < end_time

      clashes
    end

    !this_clashes_with_one_of_my_cleanings
  end

  def self.this_months_earnings
    # cleaner = Cleaner.find_by(id: @current_user.cleaner_id)
    cleaner = Cleaner.find_by(id: 12)
    my_cleanings = Cleaning.this_month_cleanings.select{|cleaning| cleaning.cleaner_id === cleaner.id }
    earnings = my_cleanings.map{|clean| clean.total_cost }.reduce(0){|acc, num| acc+num }
    earnings
  end

  def self.last_months_earnings
    # cleaner = Cleaner.find_by(id: @current_user.cleaner_id)
    cleaner = Cleaner.find_by(id: 12)
    my_cleanings = Cleaning.last_month_cleanings.select{|cleaning| cleaning.cleaner_id === cleaner.id }
    earnings = my_cleanings.map{|clean| clean.total_cost }.reduce(0){|acc, num| acc+num }
    earnings
  end

  def self.next_months_earnings
    # cleaner = Cleaner.find_by(id: @current_user.cleaner_id)
    cleaner = Cleaner.find_by(id: 12)
    my_cleanings = Cleaning.next_month_cleanings.select{ |cleaning| cleaning.cleaner_id === cleaner.id }
    earnings = my_cleanings.map{|clean| clean.total_cost }.reduce(0){|acc, num| acc+num }
    earnings
  end


  def get_available_offers
    # future_offers = @current_user.cleaner.offers.select{|offer| offer.start_time.future?}
    # should be able to just query expired false...
    future_offers = Cleaner.find_by(id: 12).offers.select{ |offer| offer.start_time.future? }
    available_offers = future_offers.select{ |offer| offer.expired === false && offer.accepted === false }

    available_offers
  end

  def get_recently_expired_offers
    # //get all offers with my id on it that start_time are >24hrs but <7days old, this is currently wrong
    expired_offers = Cleaner.find_by(id: 12).offers.select{ |offer| offer.start_time.future? }
  end


  # def self.next_month_cleanings
  #   self.next_month_cleanings.where(cleaner_id: 12)
  # end

  # def self.last_month_cleanings
  #   self.last_month_cleanings.where(cleaner_id: 12)
  # end

  # def total_earnings_in_month(cleanings)
  #   cleanings.map{|clean| clean.total_cost }.reduce(0){|acc, num| acc+num }
  # end

end
