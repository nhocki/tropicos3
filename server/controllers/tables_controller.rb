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
    @table.save
  end
end