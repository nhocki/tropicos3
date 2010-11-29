class Table < ActiveRecord::Base
  include ModelExtensions
  attr_accessible :centre_id

  belongs_to :centre

  has_many :results

  def default_options
    {
      :except => [:centre_id],
      :include  => [:results]
    }
  end
  
  def runners
    runners = {}
    results.each do |result|
      runners[result.runner.name] ||= 0
      runners[result.runner.name] += result.votes
    end
    runners
  end
end
