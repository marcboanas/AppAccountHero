class AddAttachmentInvoiceToIncomes < ActiveRecord::Migration
  def self.up
    change_table :incomes do |t|
      t.has_attached_file :invoice
    end
  end

  def self.down
    drop_attached_file :incomes, :invoice
  end
end
