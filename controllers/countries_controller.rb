class CountriesController
  def self.index
    @countries = Country.all
  end
  
  def self.show params
    @country = Country.find params[:id]
  end
end