class State < ActiveRecord::Base
  attr_accessible :name, :country_id
  belongs_to :country
  has_many :cities
end

