desc "initial configurations"

task :create_database do
  require 'rubygems'
  require 'yaml'
  require 'active_record'

  @config = YAML.load_file("config/database.yml")
  ActiveRecord::Base.establish_connection(:adapter => @config["adapter"], :host => @config["host"], :database => @config["database"]})

  ActiveRecord::Schema.define do
    create_table :countries, :force => true do |t|
      t.string :name
    end

    create_table :states, :force => true do |t|
      t.string :name
      t.string :country_id
    end

    create_table :cities, :force => true do |t|
      t.string :name
      t.integer :state_id
    end

    create_table :centres, :force => true do |t|
      t.string :name
      t.integer :city_id
    end

    create_table :tables, :force => true do |t|
      t.integer :center_id
    end

    create_table :results, :force => true do |t|
      t.integer :table_id
      t.integer :runner_id
      t.integer :votes
    end

    create_table :runners, :force => true do |t|
      t.string :name
    end
  end  
end

task :database_populate do
  
  country = Country.create({:name => "Colombia"})
  country.states.create([{:name => "Antioquia"}, {:name => "Cundinamarca"}, {:name => "Valle del Cauca"}])
  
  State.all.each do |state|
    state.cities.create()
  end
  
  
end