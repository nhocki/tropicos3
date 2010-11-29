# You should really look to simple_router
# Got a lot of the ideas and logic from there
# http://github.com/mynyml/simple_router

module StringExt
  def is_param?(str, index = 0)
    return false if str.nil? or str.empty?
    str[index] == ?: # => ?: is the ascii of :
  end
end

class Routes < Array
  include StringExt
  def add(method, path, &action)
    self << Route.new(method, path, &action)
  end

  # Use verb to make it feel some REST
  def match verb, path
    return nil, nil if self.empty?
    verb = verb.to_s.downcase.strip.to_sym
    routes = self.select {|route| route.verb == verb}
    return nil, nil if routes.empty? # No encontramos nada así
    test_path = Path.new(path)
    routes.each do |route|
      matched, vals, format = route.path.match? test_path
      if matched
        return route, vals, format
      end
    end
    return nil, nil
  end
end

class Route
  include StringExt
  attr_accessor :path, :verb, :action
  
  def initialize(verb, path, &action)
    @verb   = verb.to_s.downcase.strip.to_sym
    @path   = Path.new(path)
    @action = action
  end
  
  def to_s
    "[Route debug] #{@verb}##{@path}"
  end
end


class Path
  include StringExt
  attr_accessor :extension, :parts, :first_param_index
  
  def initialize(path)
    @extension = if path.split('.').size == 1
      nil
    else
      "." + path.split('.').last
    end
    path.sub!(/#{@extension}$/,'') unless @extension.nil?
    @parts = path.split('/').reject{ |part| part.empty? }
    @parts.each_with_index do |p, index|
      if is_param? p
        @first_param_index = index
        break
      end
    end
  end
  
  def to_s
    @parts.join("/")
  end
  
  def match? path
    if static_match?(path) and values_match?(path)
      values = Array.new
      @parts.each_with_index do |part, index|
        values << path.parts[index] if is_param?(part)
      end
      values << path.extension[1..-1] unless (@extension.nil? or is_param?(@extension, 1))
      return true, values, path.extension
    else
      return nil, nil, nil
    end
  end
  
  def static_match? path
    if @first_param_index.nil? and path.first_param_index.nil?
      return @parts == path.parts
    end
    @parts[0, @first_param_index.to_i] == path.parts[0, @first_param_index.to_i]
  end
  
  def values_match? path
    return @parts.size == path.parts.size
  end
end
