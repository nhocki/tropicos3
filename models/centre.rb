class Centre < ActiveRecord::Base
  attr_accessible :name, :city_id
  belongs_to :city
  has_many :tables
  validates_presence_of :name, :city_id  
end