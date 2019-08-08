class CreateCleaners < ActiveRecord::Migration[5.2]
  def change
    create_table :cleaners do |t|
      t.string :first_name
      t.string :last_name
      t.integer :hourly_rate
      t.integer :total_reviews
      t.integer :average_rating
      t.integer :total_cleans
      t.integer :years_experience
      t.boolean :ironing
      t.boolean :windows
      t.boolean :oven
      t.boolean :id_check
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
