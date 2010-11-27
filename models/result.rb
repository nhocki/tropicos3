class Result < ActiveRecord::Base
  include ModelExtensions
  
  attr_accessible :votes, :runner_id, :table_id
  belongs_to :table
  belongs_to :runner
  validates_presence_of :votes, :runner_id, :table_id
  
  def default_options
    {:except => [:table_id, :runner_id, :id], :methods => :runner_name}
  end
  
  def runner_name
    runner.name
  end
end