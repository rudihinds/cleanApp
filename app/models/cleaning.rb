class Cleaning < ApplicationRecord
  belongs_to :cleaner
  belongs_to :user
  has_one :review

  scope :this_month_cleanings, -> { where(start_time: Time.now.beginning_of_month..Time.now.end_of_month) }
  scope :last_month_cleanings, -> { where(start_time: Time.now.beginning_of_month.last_month..Time.now.end_of_month.last_month) }
  scope :next_month_cleanings, -> { where(start_time: Time.now.beginning_of_month.next_month..Time.now.end_of_month.next_month) }
  
  
end
