class Centre < ActiveRecord::Base
  attr_accessible :name, :city_id
  
  validates_presence_of :name
  
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
      puts "**** New centre will be called #{name}"
      rows = response["table"]["rows"]
      tables = []
      runners = {}
      rows.reverse.each do |row|
        break if row["c"][0]["v"].blank? or row["c"][0]["v"].empty?
        table = Table.new_table_from_key(row["c"][1]["v"])
        table.runners.each do |runner, votes|
          runners[runner] = 0 if runners[runner].nil?
          runners[runner] += votes
        end
      end
      Centre.new id, name, tables, runners
    rescue Exception => e
      raise Exception.new("Centre key is not valid. An error ocurred. #{e.message}")
    end
  end
  
  def self.new_centre_from_key(key)
    return Centre.new_from_json(API::Google.get_spread_sheet_from_key(key) , key)
  end
  
  protected
  def self.parse_instance(attributes, id) ; end
end

# Centre.create(:name => "Estadio Atanasio Girardot", :city_id => 1)
a = Centre.new
puts "Es válido? #{a.valid?}"

puts a.errors.to_yaml

a.errors.each do |attribute, error|
  puts "Error on #{attribute}: #{error}"
end



