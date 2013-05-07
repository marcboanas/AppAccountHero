class CreateIncomes < ActiveRecord::Migration
  def change
    create_table :incomes do |t|
      t.date :date
      t.float :amount
      t.text :note
      t.string :payment_type
      t.integer :client_id

      t.timestamps
    end
  end
end
