module ModelExtensions
  def self.included(base)
  end
  
  def default_options
    {}
  end
  
  def to_s
    name.gsub(/\s/, "_")
  end
  
  def to_xml(options = {}, &block)
    options.merge!(default_options)
    super(options, &block)
  end
  
  def to_json(options = {}, &block)
    options.merge!(default_options)
    super(options, &block)
  end
  
  def to_yaml(options = {}, &block)
    options.merge!(default_options)
    super(options, &block)
  end
end