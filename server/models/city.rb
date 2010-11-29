class City < ActiveRecord::Base
  attr_accessible :name, :state_id
  belongs_to :state
  has_many :centres
  
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
end

