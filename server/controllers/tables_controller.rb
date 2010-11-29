class TablesController
  def self.index
    Table.all
  end
  
  def self.show params
    Table.find params[:id]
  end
  
  def self.new
    Table.new
  end
  
  # POST
  def self.create params
    @table = Table.new params["table"]
    return @table, @table.save
  end

  def self.update params
    @table = Table.find params[:id]
    return @table, @table.update_attributes(params["table"])
  end
end