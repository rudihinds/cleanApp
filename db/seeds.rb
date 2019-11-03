# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Cleaning.destroy_all
# Cleaner.destroy_all




# 25.times do Cleaner.create(
#     first_name: Faker::Name.first_name,
#     last_name: Faker::Name.last_name,
#     hourly_rate: Faker::Number.between(from: 13, to: 16),
#     total_reviews: Faker::Number.between(from: 10, to: 50),
#     average_rating: Faker::Number.between(from: 3, to: 5),
#     total_cleans: Faker::Number.between(from: 10, to: 50),
#     years_experience: Faker::Number.between(from: 1, to: 10),
#     ironing: Faker::Boolean,
#     windows: Faker::Boolean,
#     oven: Faker::Boolean,
#     id_check: Faker::Boolean,
#     user_id: Faker::Boolean,
#     image: Faker::Avatar.image,
#     avatar: Faker::Avatar.image(slug: "my-own-slug", size: "50x50")
# )
# end

# 25.times do Cleaning.create(
#     start_time: Faker::Time.forward(days: 23, period: :morning),
#     duration: Faker::Number.between(from: 120, to: 240),
#     frequency: "weekly",
#     hourly_rate: Faker::Number.between(from: 13, to: 16),
#     total_cost: Faker::Number.between(from: 1, to: 10),
#     location: "London",
#     address_one: Faker::Address.street_address,
#     adress_two: Faker::Address.street_address,
#     postcode: Faker::Address.postcode,
#     ironing: Faker::Boolean,
#     windows: Faker::Boolean,
#     oven: Faker::Boolean,
#     booked: Faker::Boolean,
#     completed: Faker::Boolean,
#     cleaner_id: 1,
#     user_id: 1,
# )
# end

# 100.times do Offer.create(
#     start_time: Faker::Time.forward(days: 10, period: :morning),
#     duration: Faker::Number.between(from: 120, to: 240),
#     frequency: "weekly",
#     hourly_rate: Faker::Number.between(from: 13, to: 16),
#     total_cost: Faker::Number.between(from: 1, to: 10),
#     location: "London",
#     address_one: Faker::Address.street_address,
#     adress_two: Faker::Address.street_address,
#     postcode: Faker::Address.postcode,
#     ironing: Faker::Boolean.boolean(true_ratio: 0.2),
#     windows: Faker::Boolean.boolean(true_ratio: 0.2),
#     oven: Faker::Boolean.boolean(true_ratio: 0.2),
#     accepted: Faker::Boolean.boolean(true_ratio: 0.2),
#     expired: Faker::Boolean.boolean(true_ratio: 0.2),
#     cleaner_id: Faker::Number.between(from: 1, to: 12),
#     user_id: Faker::Number.between(from: 1, to: 12),
# )
# end

# 100.times do Offer.create(
#     start_time: Faker::Time.backward(days: 5, period: :morning),
#     duration: Faker::Number.between(from: 120, to: 240),
#     frequency: "weekly",
#     hourly_rate: Faker::Number.between(from: 13, to: 16),
#     total_cost: Faker::Number.between(from: 1, to: 10),
#     location: "London",
#     address_one: Faker::Address.street_address,
#     adress_two: Faker::Address.street_address,
#     postcode: Faker::Address.postcode,
#     ironing: Faker::Boolean.boolean(true_ratio: 0.2),
#     windows: Faker::Boolean.boolean(true_ratio: 0.2),
#     oven: Faker::Boolean.boolean(true_ratio: 0.2),
#     accepted: Faker::Boolean.boolean(true_ratio: 0.2),
#     expired: Faker::Boolean.boolean(true_ratio: 0.2),
#     cleaner_id: Faker::Number.between(from: 1, to: 12),
#     user_id: Faker::Number.between(from: 1, to: 12),
# )
# end

# t.integer "duration"
# t.datetime "start_time"
# t.datetime "end_time"
# t.string "frequency"
# t.integer "hourly_rate"
# t.integer "total_cost"
# t.string "location"
# t.string "address_one"
# t.string "adress_two"
# t.string "postcode"
# t.boolean "ironing"
# t.boolean "windows"
# t.boolean "oven"
# t.boolean "accepted"
# t.boolean "expired"
# t.bigint "cleaner_id"
# t.bigint "user_id"



# create_table "cleaners", force: :cascade do |t|
#     t.string "first_name"
#     t.string "last_name"
#     t.integer "hourly_rate"
#     t.integer "total_reviews"
#     t.integer "average_rating"
#     t.integer "total_cleans"
#     t.integer "years_experience"
#     t.boolean "ironing"
#     t.boolean "windows"
#     t.boolean "oven"
#     t.boolean "id_check"
#     t.bigint "user_id"

# t.integer "duration"
#     t.datetime "start_time"
#     t.string "frequency"
#     t.integer "hourly_rate"
#     t.integer "total_cost"
#     t.string "location"
#     t.string "address_one"
#     t.string "adress_two"
#     t.string "postcode"
#     t.boolean "ironing"
#     t.boolean "windows"
#     t.boolean "oven"
#     t.boolean "booked"
#     t.boolean "completed"
#     t.bigint "cleaner_id"
#     t.bigint "user_id"