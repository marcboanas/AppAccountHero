class User < ActiveRecord::Base
    attr_accessible :name, :email, :password, :password_confirmation, :photo
    has_secure_password
    has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
    has_many :clients, :dependent => :destroy
    has_many :incomes, :through => :clients
    has_many :expenses, :dependent => :destroy
    
    before_save { |user| user.email = email.downcase }
    before_save :create_remember_token
    
    validates :name, presence: true, length: { maximum: 50 }
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence:   true,
    format:     { with: VALID_EMAIL_REGEX },
    uniqueness: { case_sensitive: false }
    validates :password, presence: true, length: { minimum: 6 }
    validates :password_confirmation, presence: true
    
    def generate_token(column)
        begin
            self[column] = SecureRandom.urlsafe_base64
        end while User.exists?(column => self[column])
    end
    
    private
    
    def create_remember_token
        self.remember_token = SecureRandom.urlsafe_base64
    end
end