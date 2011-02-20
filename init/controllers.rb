Dir["controllers/*.rb"].each do |file| 
  puts "Requiring #{file}"
  require file.gsub!(/controllers\//, "")
end
