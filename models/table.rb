class Table < ActiveRecord::Base
  attr_accessible :centre_id
  validates_presence_of :centre_id
  
  belongs_to :centre
  
  has_many :results
  has_many :runners, :through => :results
  
end
