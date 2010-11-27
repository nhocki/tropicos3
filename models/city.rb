class City < ActiveRecord::Base
  attr_accessor :name, :centres, :runners
  belongs_to :state
  has_many :centres
end

