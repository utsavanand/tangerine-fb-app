require 'RMagick'

profile = Magick::Image.read("profile2.jpg").first
overlay = Magick::Image.read("back.jpg").first
splash = Magick::Image.read("splash1.png").first

cols, rows = profile.columns, profile.rows

profile[:caption] = "Message!"
profile = profile.polaroid { self.gravity = Magick::CenterGravity }

profile.change_geometry!("#{cols}x#{rows}") do |ncols, nrows, img|
    img.resize!(ncols, nrows)
    end
profile.resize!(1400,1400)
splash.resize!(500,500)
profile.composite!(splash, 740,740, Magick::OverCompositeOp)
overlay.composite!(profile, 120, 120, Magick::OverCompositeOp)

overlay.write('polaroid.png')