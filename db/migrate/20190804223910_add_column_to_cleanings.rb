class AddColumnToCleanings < ActiveRecord::Migration[5.2]
  def change
    add_reference :cleanings, :review, foreign_key: true
  end
end
