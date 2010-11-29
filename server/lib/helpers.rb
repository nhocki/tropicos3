def titleize(string)
  string.gsub(/\b('?[a-z])/) { $1.capitalize }
end

def al_garete(content, url)
  "<a href='#{url}'>#{content}</a>"
end

module CommonHelpers
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods    
    def method_missing(method_name, *args, &block)
      super(method_name, *args, &block) unless method_name.to_s =~ /(url|path)/
      real_path = method_name.to_s.gsub(/_(url|path)/, "")
      if args.first.nil?
        # collection path
        return "/#{real_path}"
      else
        # member path
        parts = real_path.split("_")
        if parts.size > 1
          return "/#{parts.last}s/#{args.first.id}/#{parts.first}"
        else
          return "/#{real_path}s/#{args.first.id}"
        end
      end
    end
    
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
    
    def formated_result(object, extension)
      begin
        result = case
        when extension =~ /xml/
          object.to_xml
        when extension =~ /json/
          object.to_json
        when extension =~ /yaml/
          object.to_yaml
        when extension =~ /yml/
          object.to_yaml
        when extension =~ /html/
          object.to_s
        else
          raise Exception.new("MIME Type not found. Please use XML, JSON or YAML")
        end
        result
      end
    end
    
    def formated_content_type(extension)
      begin
        result = case
        when extension =~ /xml/
          'text/xml'
        when extension =~ /json/
          'application/json'
        when extension =~ /yaml/
          'ext/x-yaml'
        when extension =~ /yml/
          'ext/x-yaml'
        when extension =~ /html/
          'text/html'
        else
          raise Exception.new("MIME Type not found. Please use XML, JSON or YAML")
        end
        result
      end
    end
    
    
    
  end
end