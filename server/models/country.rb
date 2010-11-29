class Country < ActiveRecord::Base
  attr_accessible :name
  has_many :states
  
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
end