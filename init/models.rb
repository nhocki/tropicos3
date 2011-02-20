@config = YAML.load_file("config/database.yml")

puts "Trying to connect to database #{@config["database"]}"
ActiveRecord::Base.include_root_in_json = true
ActiveRecord::Base.establish_connection(:adapter => @config["adapter"], :host => @config["host"], :database => @config["database"])
puts "Connection succeeded"

Dir["models/*.rb"].each do |file| 
  puts "Requiring #{file}"
  require file.gsub!(/models\//, "")
end