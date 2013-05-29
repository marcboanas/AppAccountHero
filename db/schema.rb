# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130518224201) do

  create_table "clients", :force => true do |t|
    t.date     "date"
    t.string   "name"
    t.integer  "house_number"
    t.string   "postcode"
    t.string   "phone_number"
    t.string   "email"
    t.integer  "user_id"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
    t.boolean  "active",       :default => true
    t.text     "notes"
  end

  create_table "expenses", :force => true do |t|
    t.date     "date"
    t.string   "expense_type"
    t.float    "amount"
    t.text     "note"
    t.string   "payment_type"
    t.integer  "user_id"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "receipt_file_name"
    t.string   "receipt_content_type"
    t.integer  "receipt_file_size"
    t.datetime "receipt_updated_at"
  end

  create_table "incomes", :force => true do |t|
    t.date     "date"
    t.float    "amount"
    t.text     "note"
    t.string   "payment_type"
    t.integer  "client_id"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "invoice_file_name"
    t.string   "invoice_content_type"
    t.integer  "invoice_file_size"
    t.datetime "invoice_updated_at"
    t.float    "hours"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",                            :null => false
    t.datetime "updated_at",                            :null => false
    t.string   "password_digest"
    t.string   "remember_token"
    t.boolean  "admin",              :default => false
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["remember_token"], :name => "index_users_on_remember_token"

end
