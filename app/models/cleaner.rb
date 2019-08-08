class Cleaner < ApplicationRecord
  has_many :cleanings
  has_many :reviews, through: :cleanings
  has_many :users, through: :cleanings
end
