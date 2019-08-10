class AddColumnToCleaners < ActiveRecord::Migration[5.2]
  def change
    add_column :cleaners, :avatar, :string
  end
end
