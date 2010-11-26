use Rack::Reloader, 0
use Rack::ContentLength
use Rack::Static, :urls => ["/public"]

begin
  require 'router.rb'
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
  puts "If you can't solve the issue, contact us at our@email.com"
  puts "*************************************************************"
  exit
end