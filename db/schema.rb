# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_08_160502) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cleaners", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.integer "hourly_rate"
    t.integer "total_reviews"
    t.integer "average_rating"
    t.integer "total_cleans"
    t.integer "years_experience"
    t.boolean "ironing"
    t.boolean "windows"
    t.boolean "oven"
    t.boolean "id_check"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_cleaners_on_user_id"
  end

  create_table "cleanings", force: :cascade do |t|
    t.integer "duration"
    t.datetime "start_time"
    t.string "frequency"
    t.integer "hourly_rate"
    t.integer "total_cost"
    t.string "location"
    t.string "address_one"
    t.string "adress_two"
    t.string "postcode"
    t.boolean "ironing"
    t.boolean "windows"
    t.boolean "oven"
    t.boolean "booked"
    t.boolean "completed"
    t.bigint "cleaner_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "review_id"
    t.datetime "end_time"
    t.index ["cleaner_id"], name: "index_cleanings_on_cleaner_id"
    t.index ["review_id"], name: "index_cleanings_on_review_id"
    t.index ["user_id"], name: "index_cleanings_on_user_id"
  end

  create_table "customers", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_customers_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "rating"
    t.text "description"
    t.datetime "date"
    t.bigint "cleaning_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cleaning_id"], name: "index_reviews_on_cleaning_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "is_cleaner"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "cleaners", "users"
  add_foreign_key "cleanings", "cleaners"
  add_foreign_key "cleanings", "reviews"
  add_foreign_key "cleanings", "users"
  add_foreign_key "customers", "users"
  add_foreign_key "reviews", "cleanings"
  add_foreign_key "reviews", "users"
end
