
class City
  attr_accessor :id, :name, :centres, :runners
  
  def initialize(id, name, centres, runners)
    @id = id
    @name = name
    @centres = centres || []
    @runners = runners || {}
  end
  
  def total_votes
    sum = 0
    runners.each do |runner, votes|
      sum+=votes
    end
    sum
  end
  
  def self.new_from_json response, key
    begin
      id = key
      name = titleize(response["table"]["rows"][0]["c"][1]["v"])
      puts "*** New City will be called #{name}"
      rows = response["table"]["rows"]
      centres = []
      runners = {}
      rows.reverse.each do |row|
        break if row["c"][0]["v"].blank? or row["c"][0]["v"].empty?
        centre = Centre.new_centre_from_key(row["c"][1]["v"])
        centre.runners.each do |runner, votes|
          runners[runner] = 0 if runners[runner].nil?
          runners[runner] += votes
        end
        centres << centre
        puts ""
      end
      City.new id, name, centres, runners
    rescue Exception => e
      raise Exception.new("City key is not valid. An error ocurred. #{e.message}")
    end
  end
  
  def self.new_city_from_key(key)
    return City.new_from_json(API::Google.get_spread_sheet_from_key(key) , key)
  end
  
  protected
  def self.parse_instance(attributes, id) ; end
end

