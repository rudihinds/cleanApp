class AddEndTimeToCleanings < ActiveRecord::Migration[5.2]
  def change
    add_column :cleanings, :endTime, :datetime
  end
end
