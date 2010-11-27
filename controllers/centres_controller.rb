class CentresController
  def self.index
    Centre.all
  end
  
  def self.show params
    Centre.find params[:id]
  end
  
  def self.new
    Centre.new
  end
  
  # POST
  def self.create params
    @centre = Centre.new params["centre"]
    @centre.save
  end
end