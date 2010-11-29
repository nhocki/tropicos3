class StatesController
  def self.show(params)
    State.find params[:id]
  end
end