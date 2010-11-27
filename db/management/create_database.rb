require 'rubygems'
require 'yaml'
require 'active_record'

@config = YAML.load_file("../../config/database.yml")
ActiveRecord::Base.establish_connection(:adapter => @config["adapter"], :host => @config["host"], :database => @config["database"])


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

    create_table :centers, :force => true do |t|
        t.string :name
        t.integer :city_id
    end

    create_table :tables, :force => true do |t|
        t.string :name
        t.integer :piedad
        t.integer :reyes
        t.integer :jojoy
        t.integer :center_id
    end
end
