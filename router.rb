require 'init/gems.rb'
require 'init/libs.rb'
require 'init/models.rb'
require 'init/controllers.rb'

class DaRouter
  
  include DSL
  include CommonHelpers

  @@params = []
  
  get '/' do
    :"static/index"
  end
  
  get '/country' do
    :"countries/index"
  end
  
  # Country#show
  get '/country/:key' do |key|
    # 0AsTunpthKrMxdEp5R1loYjBBcVhNQWVEc1BUZmZ1QUE
    @title = "Country Report"
    @country = CountriesController.show(key)
    create_graph("National Results", "country_graph", @country.runners)
    :"countries/show"
  end
  
  post '/country/fetch' do
    @title = "Country Report"
    @country = CountriesController.show(@@params["country-key"])
    create_graph("National Results", "country_graph", @country.runners)
    :"countries/show"
  end
  
  # Routes for fetching states
  get '/states' do
    :"states/index"
  end
  
  # Country#show
  get '/states/:key' do |key|
    # 0AsTunpthKrMxdEp5R1loYjBBcVhNQWVEc1BUZmZ1QUE
    @title = "State Report"
    @state = StatesController.show(key)
    create_graph("#{@state.name}'s Results", "state_graph", @state.runners)
    :"states/show"
  end
  
  post '/states/fetch' do
    @title = "State Report"
    @state = StatesController.show(@@params["country-key"])
    create_graph("#{@state.name}'s Results", "state_graph", @state.runners)
    :"states/show"
  end
  
  get '/about-us' do
    :"static/about-us"
  end

  def call(env)
    path = env["PATH_INFO"]
    verb = env['REQUEST_METHOD']
    req_uri = env['REQUEST_URI']
    @@params = Rack::Request.new(env).params
    route, vals = self.class.routes.match(verb, path)
    if route.nil?
      return [404, {'Content-Type' => 'text/html'}, '¿Qué te pasa chico?']
    else
      begin
        response = self.class.final_result(self.class.erb(route.action.call(*vals)))
        [200, {'Content-Type' => 'text/html', 'charset' => 'utf-8'}, response]
      rescue Exception => e
        html = <<-HTML
          <h1>Server Error!</h1>
          <p>There was an error in the server!</p>
          <p>#{e.message}</p>
        HTML
        [500, {'Content-Type' => 'text/html', 'charset' => 'utf-8'}, html]
      end
    end
  end

end