require 'init/gems.rb'
require 'init/libs.rb'
require 'init/models.rb'
require 'init/controllers.rb'

namespace :db do
  desc "Create the database schema"
  task :create do
    @config = YAML.load_file("config/database.yml")
    ActiveRecord::Base.establish_connection({:adapter => @config["adapter"], :host => @config["host"], :database => @config["database"]})
    
    ActiveRecord::Schema.define do
      create_table :countries, :force => true do |t|
        t.string :name
        t.string :small_description
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
        t.integer :centre_id
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



  desc "Seed the database with some cool data"
  task :seed do
    @config = YAML.load_file("config/database.yml")
    ActiveRecord::Base.establish_connection({:adapter => @config["adapter"], :host => @config["host"], :database => @config["database"]})

    puts "Creating country and states"
    country = Country.create({:name => "Colombia", :small_description => "magic lands"})
    country.states.create([{:name => "Antioquia"}, {:name => "Cundinamarca"}, {:name => "Valle del Cauca"}])

    antioquia = State.find_by_name("Antioquia")
    cundinama = State.find_by_name("Cundinamarca")
    valle_del = State.find_by_name("Valle del Cauca")
    
    puts "Creating cities"
    antioquia.cities.create([{:name => "Medellín"}, {:name => "Envigado"}])
    cundinama.cities.create([{:name => "Bogota"}, {:name => "Chia"}])
    valle_del.cities.create([{:name => "Cali"}, {:name => "Palmira"}])

    medellin = City.find_by_name("Medellín")
    envigado = City.find_by_name("Envigado")
    bogota   = City.find_by_name("Bogota")
    chia     = City.find_by_name("Chia")
    cali     = City.find_by_name("Cali")  
    palmira  = City.find_by_name("Palmira")

    puts "Creating Runners"
    Runner.create([
      {:name => "Nicolás Hock Isaza"},
      {:name => "Sergio Botero Uribe"},
      {:name => "Juan Felipe Arango Aguirre"}
    ])

    puts "Creating centres"
    medellin.centres.create([
      {:name => "Atanasio Girardot"},
      {:name => "EAFIT"},
      {:name => "Colegio Polideportivo la Constanza de Jesús"}
    ])
    
    envigado.centres.create([
      {:name => "Polideportivo Sur"},
      {:name => "Colegio La Salle"},
      {:name => "Escuela Normal Superior de Envigado"}
    ])
    
    bogota.centres.create([
      {:name => "Corferias"},
      {:name => "Compensar"},
      {:name => "Unicentro"}
    ])

    chia.centres.create([
      {:name => "Chia Plazas Way"},
      {:name => "Alcaldía"},
      {:name => "Estadio de Techo"}
    ])

    cali.centres.create([
      {:name => "ICESI"},
      {:name => "Torre de Cali"},
      {:name => "Chipichape"}
    ])

    palmira.centres.create([
      {:name => "Alcaldía Municipal"},
      {:name => "Parque principal de Palmira"},
      {:name => "Estadio Deportivo Cali"}
    ])

    puts "Creating tables"
    Centre.all.each do |centre|
      3.times { centre.tables.create(:centre_id => centre.id) }
    end
    
    Result.create([
      {:runner_id => 1, :table_id => 1, :votes => 002},
      {:runner_id => 2, :table_id => 1, :votes => 100},
      {:runner_id => 3, :table_id => 1, :votes => 011}
    ])
    
  end
end