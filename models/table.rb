class Table < ActiveRecord::Base
  attr_accessor :id, :name, :runners
    
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
      name = "Mesa #{response["table"]["rows"][0]["c"][1]["f"]}"
      puts "***** New table will be called #{name}"
      rows = response["table"]["rows"]
      runners = {}
      rows.reverse.each do |row|
        break if row["c"][0]["v"].blank? or row["c"][0]["v"].empty?
        runner_name  = titleize(row["c"][0]["v"])
        runner_votes = row["c"][1]["v"].to_i
        runners[runner_name] = runner_votes
      end
      Table.new id, name, runners
    rescue Exception => e
      raise Exception.new("Table key is not valid. An error ocurred. #{e.message}")
    end
  end
  
  def self.new_table_from_key key
    return Table.new_from_json(API::Google.get_spread_sheet_from_key(key), key)
  end
  
  protected
  def self.parse_instance(attributes, id) ; end
end

