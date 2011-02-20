class Runner < ActiveRecord::Base
  attr_accessible :name
  validates_presence_of :name
  has_many :results, :dependent => :destroy  
  include ModelExtensions
end