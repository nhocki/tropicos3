class StatesController
  def self.show(key)
    @state = State.new_state_from_key(key)
    # Make it clap!
    @state
  end
end