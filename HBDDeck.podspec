require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "HBDDeck"
  s.version      = package["version"]
  s.summary      = package["description"]
 
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/sdcx/hybrid-navigation-deck.git", :tag => "#{s.version}" }

  s.source_files = "ios/Deck/**/*.{h,m,mm}"
  s.dependency "React-Core"
  s.dependency "HybridNavigation"
end