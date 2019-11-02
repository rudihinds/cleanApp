class CreateOffers < ActiveRecord::Migration[5.2]
  def change
    CREATE TABLE offers LIKE cleanings;
  end
end
