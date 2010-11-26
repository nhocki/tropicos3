class CountriesController
  def self.show(key)
    @country = Country.new_country_from_key(key)
    # Make it clap!
    @country
  end
end