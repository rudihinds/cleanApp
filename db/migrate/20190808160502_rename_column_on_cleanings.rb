class RenameColumnOnCleanings < ActiveRecord::Migration[5.2]
  def change
    rename_column :cleanings, :endTime, :end_time
  end
end
