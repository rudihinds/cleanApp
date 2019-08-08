class User < ApplicationRecord
    has_secure_password
    has_many :cleanings
    has_many :cleaners, through: :cleanings

    validates :first_name, :password, presence: true
end
