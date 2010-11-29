class State < ActiveRecord::Base
  attr_accessible :name, :country_id
  belongs_to :country
  has_many :cities
  
  def runners
    runners = {}
    cities.each do |city|
      city.runners.each do |city_runner, votes|
        runners[city_runner] ||= 0
        runners[city_runner] += votes
      end
    end
    runners
  end
end

