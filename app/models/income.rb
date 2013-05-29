class Income < ActiveRecord::Base
    attr_accessible :amount, :date, :note, :payment_type, :pupil, :client_id, :invoice, :hours
    has_attached_file :invoice, :styles => { :large => "1000x1000", :medium => "600x600>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  belongs_to :client
end
