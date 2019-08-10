class AddColumnImageToCleaners < ActiveRecord::Migration[5.2]
  def change
    add_column :cleaners, :image, :string
  end
end
