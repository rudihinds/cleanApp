class Cleaner < ApplicationRecord
  has_many :cleanings
  has_many :reviews, through: :cleanings
  has_many :users, through: :cleanings

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

end
