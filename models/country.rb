class Country < ActiveRecord::Base
  attr_accessible :name
  has_many :states
  
  def self.new_from_json (response, key)
    begin
      id = key
      name = titleize(response["table"]["rows"][0]["c"][1]["v"])
      puts "* New country will be called #{name}"
      rows = response["table"]["rows"]
      states = []
      runners = {}
      rows.reverse.each do |row|
        break if row["c"][0]["v"].blank? or row["c"][0]["v"].empty?
        state = State.new_state_from_key(row["c"][1]["v"])
        state.runners.each do |runner, votes|
          runners[runner] = 0 if runners[runner].nil?
          runners[runner] += votes
        end
        states << state
        puts ""
      end
      Country.new id, name, states, runners
    rescue Exception => e
      raise Exception.new("Country key is not valid. An error ocurred. #{e.message}")
    end
  end
  
  def self.new_country_from_key(key)
    return Country.new_from_json(API::Google.get_spread_sheet_from_key(key), key)
  end
  
  protected
  def self.parse_instance(attributes, id) ; end
end

xml = <<-XML
<?xml version="1.0" encoding="UTF-8"?>
<country>
  <name>HOLA</name>
</country>
XML

# c  = Country.new.from_xml(xml).save