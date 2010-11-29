class Table < ActiveRecord::Base
  include ModelExtensions
  attr_accessible :centre_id

  belongs_to :centre

  has_many :results

  def default_options
    {
      :methods => [:runners]
    }
  end
  
  def total_votes
    sum = 0
    results.each do |t|
      sum += t.votes
    end
    sum
  end
  
  def runners
    runners = {}
    results.each do |result|
      runners[result.runner.to_s] ||= 0
      runners[result.runner.to_s] += result.votes
    end
    runners
  end
end
