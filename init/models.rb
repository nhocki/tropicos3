@config = YAML.load_file("config/database.yml")
puts "Trying to connect to database #{@config["database"]}"
ActiveRecord::Base.establish_connection(:adapter => @config["adapter"], :host => @config["host"], :database => @config["database"])

require 'models/api/google.rb'
require 'models/country.rb'
require 'models/state.rb'
require 'models/city.rb'
require 'models/centre.rb'
require 'models/table.rb'
require 'models/runner.rb'