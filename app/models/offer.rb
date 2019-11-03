class Offer < ApplicationRecord
  belongs_to :cleaner
  belongs_to :user

def self.sort_available_offers
  # first gets expired false offers (not previously set to :true by previous call)
  not_already_expired = Cleaner.find_by(id:12).offers.select{ |offer| !offer.expired }
  # not_already_expired = @current_user.cleaner.offers.select{ |offer| !offer.expired }
  start_time_passed = not_already_expired.select{|offer| offer.start_time.past? }
  # sets newly expired offers attribute to expired:true
    if !not_already_expired.empty?
       not_already_expired.each{ |offer| offer.get_expired ? offer['expired'] = true : nil} 
    else
      return
    end
  # sets start_time passed offers attribute to expired:true
    if !start_time_passed.empty?
      start_time_passed.each{ |offer| offer['expired'] = true } 
    else
      return
    end

end

def get_expired
  # returns true if is expired ie created over 24 hrs ago, false if created under 24 hrs ago
  diff = Time.current - self.created_at
  (diff/1.hour) > 24
end

# need method recently_expired which takes my offers and gives me the ones expired >24 hours ago
# but <7days ago

end

