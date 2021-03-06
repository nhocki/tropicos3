class Centre < ActiveRecord::Base
  include ModelExtensions
  
  attr_accessible :name, :city_id
  belongs_to :city
  has_many :tables, :dependent => :destroy
  validates_presence_of :name, :city_id
  
  def default_options
    {:include => :tables}
  end
  
  def total_votes
    sum = 0
    tables.each do |t|
      sum += t.total_votes
    end
    sum
  end
  
  def runners
    runners = {}
    tables.each do |table|
      table.runners.each do |table_runner, votes|
        runners[table_runner] ||= 0
        runners[table_runner] += votes
      end
    end
    runners
  end
end