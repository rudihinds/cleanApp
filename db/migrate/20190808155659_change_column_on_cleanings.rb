class ChangeColumnOnCleanings < ActiveRecord::Migration[5.2]
  def change
    rename_column :cleanings, :time, :start_time
  end
end
