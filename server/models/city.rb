class City < ActiveRecord::Base
  attr_accessible :name, :state_id
  belongs_to :state
  has_many :centres, :dependent => :destroy
  
  include ModelExtensions
  
  def runners
    runners = {}
    centres.each do |centre|
      centre.runners.each do |centre_runner, votes|
        runners[centre_runner] ||= 0
        runners[centre_runner] += votes
      end
    end
    runners
  end
  
  def total_votes
    sum = 0
    runners.each do |key, value|
      sum+=value
    end
    sum
  end
  
  def default_options
    {
      :methods => [:runners],
      :include => [:centres]
    }
  end
end

