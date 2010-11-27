class Result < ActiveRecord::Base
  attr_accessible :votes, :runner_id, :table_id
  belongs_to :table
  belongs_to :runner
  validates_presence_of :votes, :runner_id, :table_id
end