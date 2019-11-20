require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "HBDDeck"
  s.version      = package["version"]
  s.summary      = package["description"]
 
  s.homepage     = "https://github.com/sdcx/react-native-deck"
  s.license      = "MIT"
  s.authors      = { "顺道出行" => "sdcx@shundaojia.com" }
  s.platforms    = { :ios => "9.0", :tvos => "10.0" }
  s.source       = { :git => "https://github.com/sdcx/react-native-deck.git", :tag => "#{s.version}" }

  s.source_files = "ios/Deck/**/*.{h,m,swift}"
  s.dependency "React"
end