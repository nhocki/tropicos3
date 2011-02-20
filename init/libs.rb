Dir["lib/*.rb"].each do |file| 
  puts "Requiring #{file}"
  require file.gsub!(/lib\//, "")
end