class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :date
      t.string :expense_type
      t.float :amount
      t.text :note
      t.string :payment_type
      t.integer :user_id

      t.timestamps
    end
  end
end
