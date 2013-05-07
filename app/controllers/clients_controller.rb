class ClientsController < ApplicationController
    before_filter :signed_in_user, only: [:new, :create, :destroy]
    before_filter :correct_user,   only: :destroy
    
    def new
        @client = current_user.clients.build(params[:client])
    end
    
    def create
        @client = current_user.clients.build(params[:client])
        if @client.save
            respond_to do |format|
                format.html { redirect_to root_url }
                format.js
            end
            else
            render 'static_pages/home'
        end
    end
    
    def destroy
        @client.destroy
        respond_to do |format|
            format.html { redirect_to root_url }
            format.js
        end
    end
    
    private
    
    def correct_user
        @client = current_user.clients.find_by_id(params[:id])
        redirect_to root_url if @client.nil?
    end
end