class CentresController
  def self.index
    Centre.all
  end
  
  def self.show params
    Centre.find params[:id]
  end
  
  def self.edit params
    Centre.find params[:id]
  end
  
  def self.new
    Centre.new
  end
  
  # POST
  def self.create params
    # puts "\n\n******************** Debugging params ********************"
    # params.each do |param|
    #   puts param.inspect
    # end
    # puts "************************************************************\n\n"
    @centre = Centre.new params["centre"]
    return @centre, @centre.save
  end
  
  def self.update params
    @centre = Centre.find params[:id]
    return @centre, @centre.update_attributes(params["centre"])
  end
  
  def self.destroy params
    @centre = Centre.find params[:id]
    return @centre, @centre.destroy
  end
end