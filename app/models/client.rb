class Client < ActiveRecord::Base
  attr_accessible :date, :email, :house_number, :name, :phone_number, :postcode
  has_many :incomes, :dependent => :destroy
  belongs_to :user
end
