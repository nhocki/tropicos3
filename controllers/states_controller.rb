class StatesController
  def self.index
    State.all
  end
  
  def self.show(params)
    State.find params[:id]
  end
end