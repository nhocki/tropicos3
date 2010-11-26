class State < ActiveRecord::Base
  attr_accessor :id, :name, :cities, :runners
  
  def self.new_from_json response, key
    begin
      id = key
      name = titleize(response["table"]["rows"][0]["c"][1]["v"])
      puts "** New state will be called #{name}"
      rows = response["table"]["rows"]
      cities = []
      runners = {}
      rows.reverse.each do |row|
        break if row["c"][0]["v"].blank? or row["c"][0]["v"].empty?
        city = City.new_city_from_key(row["c"][1]["v"])
        city.runners.each do |runner, votes|
          runners[runner] = 0 if runners[runner].nil?
          runners[runner] += votes
        end
        cities << city
        puts ""
      end
      State.new id, name, cities, runners
    rescue Exception => e
      raise Exception.new("State key is not valid. An error ocurred. #{e.message}")
    end
  end
  
  def self.new_state_from_key key
    return State.new_from_json(API::Google.get_spread_sheet_from_key(key), key)
  end
end

