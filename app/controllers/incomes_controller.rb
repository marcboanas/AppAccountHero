class IncomesController < ApplicationController
    
    before_filter :signed_in_user, only: [:new]
    
    def create
        @income = Income.new(params[:income])
        if @income.save
            respond_to do |format|
                format.html { redirect_to root_url }
                format.js { render }
            end
        else
            redirect_to root_url
        end
    end
    
    def destroy
        @income = Income.find(params[:id]).destroy
        flash[:success] = "Income Removed."
        redirect_to root_url
    end
    
    def new
        @income = Income.new(params[:income])
    end
    
    respond_to :html, :json
    def update
        @income = Income.find(params[:id])
        @income.update_attributes(params[:income])
        respond_with @income
    end
    
    def update
        @income = Income.find params[:id]
        
        respond_to do |format|
            if @income.update_attributes(params[:income])
                format.html { redirect_to(@income, :notice => 'Successfully updated.') }
                else
                format.html { render :action => "edit" }
            end
        end
    end
end