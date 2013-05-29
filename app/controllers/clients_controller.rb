class ClientsController < ApplicationController
    before_filter :signed_in_user, only: [:new, :create, :destroy]
    before_filter :correct_user,   only: [:destroy, :edit]
    
    def new
        @client = current_user.clients.build(params[:client])
    end
    
    def create
        @client = current_user.clients.build(params[:client])
        if @client.save
            respond_to do |format|
                format.html { redirect_to current_user }
                format.js
            end
            else
            render current_user
        end
    end
    
    def client_edit
        @client = Client.find(params[:id])
        if @client.user_id == current_user.id
        render :partial => 'clients/client_edit'
        else
        render current_user
        end
    end
    
    def edit
      @client = Client.find(params[:id])
    end
    
    def update
        @client = Client.find(params[:id])
        if @client.update_attributes(params[:client])
            redirect_to current_user
            else
            redirect_to root_url
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