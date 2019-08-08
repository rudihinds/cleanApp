class Cleaning < ApplicationRecord
  belongs_to :cleaner
  belongs_to :user
  has_one :review
  
end
