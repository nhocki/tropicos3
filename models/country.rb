class Country < ActiveRecord::Base
  attr_accessible :name
  has_many :states
end

xml = <<-XML
<?xml version="1.0" encoding="UTF-8"?>
<country>
  <name>HOLA</name>
</country>
XML

# c  = Country.new.from_xml(xml).save