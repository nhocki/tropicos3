require 'crack'
require 'hpricot'
require 'open-uri'

module API
  class Google
    @@base_url = "http://spreadsheets.google.com/tq?pub=1&tqx=responseHandler:parsed_response"

    def self.get(key)
      doc = Hpricot(open("#{@@base_url}&key=#{key}"))
      ret = doc.inner_html.sub!("parsed_response(", "")[0..-3]
      Crack::JSON.parse(ret)
    end

    def self.get_spread_sheet_from_key(key)
      get(key)
    end
  end
end

