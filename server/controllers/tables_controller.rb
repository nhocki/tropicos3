class TablesController
  def self.index
    Table.all
  end
  
  def self.show params
    Table.find params[:id]
  end
  
  
  def self.edit params
    Table.find params[:id]
  end
  
  
  def self.new
    Table.new
  end
  
  # POST
  def self.create params
    # puts "\n\n******************** Debugging params ********************"
    # params.each do |param|
    #   puts param.inspect
    # end
    # puts "************************************************************\n\n"
    @table = Table.new params["table"]
    params["table"]["runners"].each do |key, value|
      puts key
      runner = Runner.find_by_name(key)
      puts "#{runner.name} - #{runner.id} => #{value}"
      @table.results << Result.new(:runner_id => runner.id, :votes => value)
    end
    puts @table
    return @table, @table.save
  end

  def self.update params
    @table = Table.find params[:id]
    return @table, @table.update_attributes(params["table"])
  end
end

