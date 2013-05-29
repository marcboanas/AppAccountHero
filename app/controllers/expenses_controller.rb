class ExpensesController < ApplicationController
    
    before_filter :signed_in_user, only: [:new]
    before_filter :correct_user,   only: [:edit, :update]
    
    def create
        @expense = current_user.expenses.build(params[:expense])
        if @expense.save
            @incomes = current_user.incomes
            @expenses = current_user.expenses
            respond_to do |format|
                format.html { redirect_to current_user }
                format.js { render }
            end
        else
            redirect_to current_user
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
    
    def edit
        @expense = Expense.find(params[:id])
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
    
    def destroy_multiple
        Expense.destroy(params[:expenses])
        respond_to do |format|
            format.html { redirect_to root_url }
            format.js { render }
            format.json { head :no_content }
        end
    end
    
    private
    
    def correct_user
        @user = Expense.find(params[:id]).user
        redirect_to(root_path) unless current_user?(@user)
    end
end