use Rack::Reloader, 0
use Rack::ContentLength
use Rack::Session::Cookie,  :key => '__ballotox__session',
                            :domain => 'ballotox.nhocki.com',
                            :path => '/',
                            :expire_after => 2592000,
                            :secret => '0eA3278Shhjk71032610d6a5389b5a368595ae2f52c6523a4'
use Rack::Static, :urls => ["/public"]

begin
  require './router.rb'
  app = DaRouter.new
  puts "Initialized Ballotox App"
  puts "You can find this awesome app in http://localhost:9292/"
  puts "You can try with this country key: 0AsTunpthKrMxdEp5R1loYjBBcVhNQWVEc1BUZmZ1QUE"
  puts "To exit the application press Cnt + C while on this screen"
  run app
rescue Exception => e
  puts "************ ERROR APPLICATION CAN'T BE LAUNCHED ************"
  puts "There was an error launching the application."
  puts "The following message may be helpful"
  puts "** #{e.message} **"
  puts "If you can't solve the issue, contact us at nhocki@gmail.com"
  puts "*************************************************************"
  exit
end