class User < ApplicationRecord
    has_secure_password
    has_many :cleanings
    has_many :offers
    has_many :cleaners, through: :cleanings
    belongs_to :cleaner

    validates :first_name, :password, presence: true
end
