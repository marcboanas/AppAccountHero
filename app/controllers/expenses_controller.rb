class ExpensesController < ApplicationController
    
    before_filter :signed_in_user, only: [:new]
    
    def create
        @expense = current_user.expenses.build(params[:expense])
        if @expense.save
            respond_to do |format|
                format.html { redirect_to root_url }
                format.js { render }
            end
        else
            redirect_to root_url
        end
    end
    
    def destroy
        @expense = Expense.find(params[:id]).destroy
        flash[:success] = "Income Removed."
        redirect_to root_url
    end
    
    def new
        @expense = current_user.expenses.build(params[:expense])
    end
    
    respond_to :html, :json
    def update
        @expense = Expense.find(params[:id])
        @expense.update_attributes(params[:expense])
        respond_with @expense
    end
    
    def update
        @expense = Expense.find params[:id]
        
        respond_to do |format|
            if @expense.update_attributes(params[:expense])
                format.html { redirect_to(@expense, :notice => 'Successfully updated.') }
                else
                format.html { render :action => "edit" }
            end
        end
    end
end