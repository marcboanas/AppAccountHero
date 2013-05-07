class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.date :date
      t.string :name
      t.integer :house_number
      t.string :postcode
      t.string :phone_number
      t.string :email
      t.integer :user_id

      t.timestamps
    end
  end
end
