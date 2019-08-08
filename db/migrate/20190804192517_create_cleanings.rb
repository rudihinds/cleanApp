class CreateCleanings < ActiveRecord::Migration[5.2]
  def change
    create_table :cleanings do |t|
      t.integer :duration
      t.datetime :time
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
      t.boolean :booked
      t.boolean :completed
      t.references :cleaner, foreign_key: true
      t.references :user, foreign_key: true
      

      t.timestamps
    end
  end
end
