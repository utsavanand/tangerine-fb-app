require 'Rmagick'

class AppMainController < ApplicationController
helper :headshot
	def index
		# page reload handling when the file uploads
		if(params.has_key?("file-input")) 
			@u= User.new
			@u.image = params["file-input"]
			@u.save!
		 # initial page load
		else

		end
	end

	def actionPage

	end
end
