require 'init/gems.rb'
require 'init/libs.rb'
require 'init/models.rb'
require 'init/controllers.rb'

class DaRouter
  
  include DSL
  include CommonHelpers

  @@params = []
  @@extension = "html"
  
  get '/country.:format' do
    :"countries/index"
  end
  
  # Country#show
  get '/country/:id' do |key|
    # 0AsTunpthKrMxdEp5R1loYjBBcVhNQWVEc1BUZmZ1QUE
    @title = "Country Report"
    @country = CountriesController.show({:id => id})
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
  
  
  ######################### CENTRES #########################

  get '/centres.:format' do |format|
    @centres = CentresController.index
    format.nil? ? :"centres/index" : @centres
  end
  
  # Read action
  get '/centres/:id.:format' do |id, format|
    @centre = CentresController.show({:id => id})
    format.nil? ? :"centres/show" : @centre
  end
  
  # Create action
  post '/centres.:format' do |format|
    
  end
  
  # Update action
  put '/centres/:id.:format' do |id, format|
    @@params.merge!({:id => id})
    @centre, success = CentresController.update(@@params)
    if success
      format.nil? ? :"centres/show" : @centre
    else
      format.nil? ? :"centres/errors" : @centre.errors
    end
  end
  
  # Destroy action
  delete '/centres/:id.:format' do |id, format|
    @@params.merge!({:id => id})
    @centre = CentresController.update(@@params)
    format.nil? ? :"centres/index" : @centre
  end
  
  
  ######################### TABLES #########################
  
  get '/tables.:format' do |format|
    @tables = TablesController.index
    format.nil? ? :"tables/index" : @tables
  end
  
  get '/tables/:id.:format' do |id, format|
    @table = TablesController.show({:id => id})
    format.nil? ? :"tables/show" : @table
  end
  
  ######################### STATIC ROUTES #########################
  get '/about-us' do
    :"static/about-us"
  end
  
  get '/' do
    :"static/index"
  end

  ######################### RACK STUFF #########################
  def call(env)
    path = env["PATH_INFO"]
    verb = env['REQUEST_METHOD']
    req_uri = env['REQUEST_URI']
    @@params = Rack::Request.new(env).params
    route, vals, extension = self.class.routes.match(verb, path)
    vals << extension if extension
    if route.nil?
      return [404, {'Content-Type' => 'text/html'}, '¿Qué te pasa chico?']
    else
      begin
        result = route.action.call(*vals)        
        if extension.nil?
          # HTML response, no format given
          response = self.class.final_result(self.class.erb(result))
          [200, {'Content-Type' => 'text/html', 'charset' => 'utf-8'}, response]
        else
          [200, {'Content-Type' => self.class.formated_content_type(extension), 'charset' => 'utf-8'}, self.class.formated_result(result,extension)]
        end
        
      rescue Exception => e
        html = <<-HTML
          <h1>Server Error!</h1>
          <p>There was an error in the server!</p>
          <p>#{e.message}</p>
        HTML
        puts "********************************** ERROR LOG  **********************************"
        puts "#{e.message}"
        puts "********************************************************************************"
        [500, {'Content-Type' => 'text/html', 'charset' => 'utf-8'}, html]
      end
    end
  end

end