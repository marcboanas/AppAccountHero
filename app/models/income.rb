class Income < ActiveRecord::Base
    attr_accessible :amount, :date, :note, :payment_type, :pupil, :client_id, :invoice
    has_attached_file :invoice, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  belongs_to :client
end
