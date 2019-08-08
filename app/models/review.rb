class Review < ApplicationRecord
  belongs_to :cleaning
  belongs_to :user
end
