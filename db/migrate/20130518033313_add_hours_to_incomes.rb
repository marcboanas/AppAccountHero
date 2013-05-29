class AddHoursToIncomes < ActiveRecord::Migration
  def change
    add_column :incomes, :hours, :float
  end
end
