def titleize(string)
  string.gsub(/\b('?[a-z])/) { $1.capitalize }
end

module CommonHelpers
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def erb (template = :test)
      template = "views/#{template}.html.erb"
      raise Exception.new("File not found! (#{template})") unless File.exists?(template)
      output = ERB.new(File.read(template))
      p "Rendering #{template}"
      output.result(binding)
    end
    
    def create_graph (name, file_name, runners)
      g = Gruff::Bar.new
      g.title = name
      runners.each do |runner, votes|
        g.data(runner, [votes])
      end
      g.minimum_value = 0
      puts "Creating graph #{file_name}.png"
      g.write("public/images/#{file_name}.png")
      true
    end
    
    def final_result(body, template = :template)
      template = "views/#{template}.html.erb"
      output = Tilt.new(template)
      output.render {body}
    end
  end
end