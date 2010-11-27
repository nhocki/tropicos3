class Table < ActiveRecord::Base
  attr_accessible :centre_id
  validates_presence_of :centre_id
end
