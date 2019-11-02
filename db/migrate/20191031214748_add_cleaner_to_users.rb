class AddCleanerToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :cleaner, foreign_key: true
  end
end
