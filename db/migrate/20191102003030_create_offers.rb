class CreateOffers < ActiveRecord::Migration[5.2]
  def change
    create_table :offers do |t|
      t.integer :duration
      t.datetime :start_time
      t.datetime :end_time
      t.string :frequency
      t.integer :hourly_rate
      t.integer :total_cost
      t.string :location
      t.string :address_one
      t.string :adress_two
      t.string :postcode
      t.boolean :ironing
      t.boolean :windows
      t.boolean :oven
      t.boolean :accepted
      t.boolean :expired

      t.references :cleaner, foreign_key: true
      t.references :user, foreign_key: true
      

      t.timestamps
    end
  end
end
