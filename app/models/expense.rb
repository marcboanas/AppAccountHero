class Expense < ActiveRecord::Base
    attr_accessible :amount, :date, :expense_type, :note, :payment_type, :receipt
    has_attached_file :receipt, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
    belongs_to :user
end
