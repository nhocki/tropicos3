class Country < ActiveRecord::Base
  attr_accessible :name, :small_description
  has_many :states
  
  include ModelExtensions
  
  def runners
    runners = {}
    states.each do |state|
      state.runners.each do |state_runner, votes|
        runners[state_runner] ||= 0
        runners[state_runner] += votes
      end
    end
    runners
  end
  
  def default_options
    {
      :methods => [:runners],
      :include => [:states]
    }
  end
end