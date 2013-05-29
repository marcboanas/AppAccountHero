class IncomesController < ApplicationController
    
    before_filter :signed_in_user, only: [:new]
    before_filter :correct_user,   only: [:edit, :update]
    
    def create
        @income = Income.new(params[:income])
        if @income.save
            if params[:date] && params[:duration]
                start_date = params[:date].to_date
                end_date = start_date + (params[:duration].to_i).days
                @incomes = current_user.incomes.where(:date => (start_date..end_date))
                else
                @incomes = current_user.incomes
            end
            @expenses = current_user.expenses
            respond_to do |format|
                format.html { redirect_to current_user }
                format.js { render }
            end
        else
            redirect_to root_url
            flash[:success] = "Income Fucked."
        end
    end
    
    def destroy
        @income = Income.find(params[:id]).destroy
        respond_to do |format|
        flash[:success] = "Income Removed."
        format.html { redirect_to current_user }
        format.js { render }
        end
    end
    
    def new
        @income = Income.new(params[:income])
    end
    
    def edit
        @income = Income.find(params[:id])
    end
    
    respond_to :html, :json
    def update
        @income = Income.find(params[:id])
        @income.update_attributes(params[:income])
        respond_with @income
    end
    
    def update
        @income = Income.find(params[:id])
        
        respond_to do |format|
            if @income.update_attributes(params[:income])
                format.html { redirect_to(@income, :notice => 'Successfully updated.') }
                else
                format.html { render :action => "edit" }
            end
        end
    end
    
    def destroy_multiple
        Income.destroy(params[:incomes])
        respond_to do |format|
            format.html { redirect_to root_url }
            format.js { render }
            format.json { head :no_content }
        end
    end
    
    def tables
        if params[:date] && params[:duration]
            start_date = params[:date].to_date
            end_date = start_date + (params[:duration].to_i).days
            @incomes = current_user.incomes.where(:date => (start_date..end_date))
            @expenses = current_user.expenses.where(:date => (start_date..end_date))
            else
            @incomes = current_user.incomes
            @expenses = current_user.expenses
        end
        render :partial => 'users/tables'
    end
    
    def clients
        @incomes = current_user.incomes
        @clientlist = current_user.clients
        render :partial => 'users/clients'
    end
    
    def incomeform
        @income = Income.new(params[:income])
        render :partial => 'incomes/form'
    end
    
    def dashboard
        @totalIncome = current_user.incomes
        render :partial => 'users/dashboard'
    end
    
    def graphs
        if params[:date] && params[:duration]
            start_date = params[:date].to_date
            end_date = start_date + (params[:duration].to_i).days
            @incomes = current_user.incomes.where(:date => (start_date..end_date))
            @expenses = current_user.expenses.where(:date => (start_date..end_date))
            else
            @incomes = current_user.incomes
            @expenses = current_user.expenses
        end
        
        @expense_types = []
        
        current_user.expenses.each do |expense|
            
            @expense_types.push(expense.expense_type)
            
        end
        
        @expense_types = @expense_types.uniq
        
        @expenses_by_type = []
        
        @expense_types.each do |expense_type|
            
        expense_amount = current_user.expenses.where(:expense_type => expense_type).sum(:amount)
            
        @expenses_by_type.push([expense_type, expense_amount])
            
        end
        
        start_date = ("2013-04-01").to_date
        end_date = start_date + 1.year
        
        number_of_months = (end_date.year * 12 + end_date.month) - (start_date.year * 12 + start_date.month)
        
        dates = number_of_months.times.each_with_object([]) do |count, array|
            array << [start_date.beginning_of_month + count.months,
            start_date.end_of_month + count.months]
            
        end
        
        monthlyincome = []
        
        monthlyexpense = []
        
        monthlyprofit = []
        
        cumulative_monthlyincome = []
        
        cumulative_monthlyexpense = []
        
        cumulative_monthlyprofit = []
        
        months = []
        
        cumulative_income_month = 0;
        
        cumulative_expense_month = 0;
        
        dates.each do |startdate, enddate|
            
            months.push(startdate.strftime("%B %Y"))
            
            income_month = current_user.incomes.where(:date => (startdate..enddate)).sum(:amount)
            
            expense_month = current_user.expenses.where(:date => (startdate..enddate)).sum(:amount)
            
            cumulative_income_month += current_user.incomes.where(:date => (startdate..enddate)).sum(:amount)
            
            cumulative_expense_month += current_user.expenses.where(:date => (startdate..enddate)).sum(:amount)
            
            profit_month = income_month - expense_month
            
            cumulative_profit_month = cumulative_income_month - cumulative_expense_month
            
            monthlyincome.push(income_month)
            
            monthlyexpense.push(expense_month)
            
            monthlyprofit.push(profit_month)
            
            cumulative_monthlyincome.push(cumulative_income_month)
            
            cumulative_monthlyexpense.push(cumulative_expense_month)
            
            cumulative_monthlyprofit.push(cumulative_profit_month)
            
        end
        
        
        
        @chart = LazyHighCharts::HighChart.new('graph') do |f|
            f.title({ :text=>"Financial Year April 2013 - March 2014"})
            f.options[:xAxis][:categories] = months
            f.labels(:items=>[:html=>"Monthly Income, Expense & Profit.", :style=>{:left=>"40px", :top=>"8px", :color=>"black"} ])
            f.series(:type=> 'column',:name=> 'Income',:data=> monthlyincome)
            f.series(:type=> 'column',:name=> 'Expense',:data=> monthlyexpense)
            f.series(:type=> 'spline',:name=> 'Profit', :data=> monthlyprofit)
        end
        
        @chart_cumulative = LazyHighCharts::HighChart.new('graph') do |f|
            f.title({ :text=>"Financial Year April 2013 - March 2014"})
            f.options[:xAxis][:categories] = months
            f.labels(:items=>[:html=>"Cumulative Income, Expense & Profit.", :style=>{:left=>"40px", :top=>"8px", :color=>"black"} ])
            f.series(:type=> 'column',:name=> 'Income',:data=> cumulative_monthlyincome)
            f.series(:type=> 'column',:name=> 'Expense',:data=> cumulative_monthlyexpense)
            f.series(:type=> 'spline',:name=> 'Profit', :data=> cumulative_monthlyprofit)
        end
        
        @chart_pie = LazyHighCharts::HighChart.new('pie') do |f|
            f.chart({:defaultSeriesType=>"pie",
                    
            :margin=> [0, 0, 0, 0],
                    
            :spacingTop => 0,
            :spacingBottom => 0,
            :spacingLeft => 0,
            :spacingRight => 0
                    
                    } )
            
            series = {
                :type=> 'pie',
                :name=> 'Expenses',
                :data=> @expenses_by_type
            }
            f.series(series)
            f.options[:title][:text] = "Breakdown of Expenses Apr 2013 - Mar 2014"
            f.legend(:layout=> 'vertical',:style=> {:left=> 'auto', :bottom=> 'auto',:right=> '50px',:top=> '100px'})
            f.plot_options(:pie=>{
                           :allowPointSelect=>true,
                           :cursor=>"pointer" ,
                           :dataLabels=>{
                           :enabled=>true,
                           :color=>"black",
                           :style=>{
                           :font=>"13px Trebuchet MS, Verdana, sans-serif"
                           }
                           }
                           })
        end
        
        
        
        render :partial => 'users/graphs'
    end
    
    private
    
    def correct_user
        @user = Income.find(params[:id]).client.user
        redirect_to(root_path) unless current_user?(@user)
    end
end