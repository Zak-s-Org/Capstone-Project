const pool = require("./pool");
const bcrypt = require("bcrypt")

const seedUserInfo = async ()=>{
    try {
        const saltRounds = 10
        const hashedPassword1 = await bcrypt.hash("password123", saltRounds)
        const hashedPassword2 = await bcrypt.hash("password456", saltRounds)
    
        await pool.query(`
        DELETE FROM users`)

        await pool.query(`
          DELETE FROM purchases`)
        
        await pool.query(`
            INSERT INTO users (email, password) VALUES
            ($1, $2),
            ($3, $4);
          `, ["Johnathonthomas@gmail.com", hashedPassword1, "Arnoldjack@gmail.com", hashedPassword2]);
       
          await pool.query(` 
            INSERT INTO product (name, description, product, price) VALUES ('Apple iPhone 13', 'Latest model with A15 Bionic chip', 'Electronics', 799.00);
              INSERT INTO product (name, description, product, price) VALUES ('Samsung Galaxy S21', 'Flagship phone with stunning display', 'Electronics', 699.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sony WH-1000XM4', 'Industry-leading noise canceling headphones', 'Electronics', 348.00);
              INSERT INTO product (name, description, product, price) VALUES ('Dell XPS 13', 'Ultra-thin and light laptop with powerful performance', 'Computers', 999.00);
              INSERT INTO product (name, description, product, price) VALUES ('Apple MacBook Air', 'Lightweight laptop with M1 chip', 'Computers', 999.00);
              INSERT INTO product (name, description, product, price) VALUES ('ASUS ROG Zephyrus G14', 'High-performance gaming laptop', 'Computers', 1449.00);
              INSERT INTO product (name, description, product, price) VALUES ('Nintendo Switch', 'Popular gaming console for all ages', 'Gaming', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('PlayStation 5', 'Next-gen gaming console with stunning graphics', 'Gaming', 499.00);
              INSERT INTO product (name, description, product, price) VALUES ('Xbox Series X', 'Powerful gaming console with incredible performance', 'Gaming', 499.00);
              INSERT INTO product (name, description, product, price) VALUES ('Fitbit Charge 4', 'Advanced fitness tracker with built-in GPS', 'Wearables', 149.00);
              INSERT INTO product (name, description, product, price) VALUES ('Apple Watch Series 6', 'Smartwatch with health monitoring features', 'Wearables', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Garmin Forerunner 945', 'Premium GPS running and triathlon smartwatch', 'Wearables', 599.00);
              INSERT INTO product (name, description, product, price) VALUES ('Amazon Echo Dot', 'Smart speaker with Alexa', 'Smart Home', 49.00);
              INSERT INTO product (name, description, product, price) VALUES ('Google Nest Hub', 'Smart display with Google Assistant', 'Smart Home', 89.00);
              INSERT INTO product (name, description, product, price) VALUES ('Ring Video Doorbell 3', 'Smart doorbell with HD video', 'Smart Home', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Dyson V11 Torque Drive', 'Cordless vacuum cleaner with powerful suction', 'Home Appliances', 599.00);
              INSERT INTO product (name, description, product, price) VALUES ('Instant Pot Duo 7-in-1', 'Multifunctional pressure cooker', 'Home Appliances', 89.00);
              INSERT INTO product (name, description, product, price) VALUES ('Nespresso VertuoPlus', 'Coffee and espresso machine', 'Home Appliances', 159.00);
              INSERT INTO product (name, description, product, price) VALUES ('Canon EOS Rebel T7', 'Digital SLR camera with 18-55mm lens', 'Cameras', 449.00);
              INSERT INTO product (name, description, product, price) VALUES ('GoPro HERO9 Black', 'Waterproof action camera with front LCD', 'Cameras', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sony Alpha a6400', 'Mirrorless camera with 16-50mm lens', 'Cameras', 899.00);
              INSERT INTO product (name, description, product, price) VALUES ('Bose SoundLink Revolve', 'Portable Bluetooth speaker with 360-degree sound', 'Audio', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('JBL Charge 4', 'Waterproof portable Bluetooth speaker', 'Audio', 129.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sonos One', 'Smart speaker with Alexa built-in', 'Audio', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Logitech MX Master 3', 'Advanced wireless mouse', 'Accessories', 99.00);
              INSERT INTO product (name, description, product, price) VALUES ('Anker PowerCore 10000', 'Portable charger with high-speed charging', 'Accessories', 29.00);
              INSERT INTO product (name, description, product, price) VALUES ('Samsung T5 Portable SSD', 'High-speed external storage', 'Accessories', 119.00);
              INSERT INTO product (name, description, product, price) VALUES ('Oculus Quest 2', 'All-in-one VR headset', 'Gaming', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Razer BlackShark V2', 'Esports gaming headset', 'Gaming', 99.00);
              INSERT INTO product (name, description, product, price) VALUES ('HyperX Cloud II', '7.1 surround sound gaming headset', 'Gaming', 99.00);
              INSERT INTO product (name, description, product, price) VALUES ('Lenovo IdeaPad 3', 'Affordable laptop with Intel Core i3', 'Computers', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('HP Pavilion x360', 'Convertible laptop with touchscreen', 'Computers', 699.00);
              INSERT INTO product (name, description, product, price) VALUES ('Microsoft Surface Pro 7', 'Versatile 2-in-1 laptop', 'Computers', 749.00);
              INSERT INTO product (name, description, product, price) VALUES ('Apple iPad Pro', 'Powerful tablet with Liquid Retina display', 'Tablets', 799.00);
              INSERT INTO product (name, description, product, price) VALUES ('Samsung Galaxy Tab S7', 'High-performance Android tablet', 'Tablets', 649.00);
              INSERT INTO product (name, description, product, price) VALUES ('Amazon Fire HD 10', 'Affordable tablet with Alexa', 'Tablets', 149.00);
              INSERT INTO product (name, description, product, price) VALUES ('Kindle Paperwhite', 'E-reader with high-resolution display', 'Tablets', 129.00);
              INSERT INTO product (name, description, product, price) VALUES ('Roku Streaming Stick+', 'Portable streaming device with 4K HDR', 'Smart Home', 49.00);
              INSERT INTO product (name, description, product, price) VALUES ('Google Chromecast', 'Stream content to your TV', 'Smart Home', 29.00);
              INSERT INTO product (name, description, product, price) VALUES ('Apple TV 4K', 'Streaming media player with Siri remote', 'Smart Home', 179.00);
              INSERT INTO product (name, description, product, price) VALUES ('Philips Hue Starter Kit', 'Smart lighting with voice control', 'Smart Home', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('TP-Link Kasa Smart Plug', 'Control devices from anywhere', 'Smart Home', 29.00);
              INSERT INTO product (name, description, product, price) VALUES ('Nest Thermostat', 'Smart thermostat with energy-saving features', 'Smart Home', 129.00);
              INSERT INTO product (name, description, product, price) VALUES ('Roomba i7+', 'Robot vacuum with automatic dirt disposal', 'Home Appliances', 799.00);
              INSERT INTO product (name, description, product, price) VALUES ('Shark IQ Robot', 'Self-emptying robot vacuum', 'Home Appliances', 449.00);
              INSERT INTO product (name, description, product, price) VALUES ('Eufy RoboVac 30C', 'Wi-Fi connected robot vacuum', 'Home Appliances', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('KitchenAid Stand Mixer', 'Powerful mixer for all your baking needs', 'Home Appliances', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Breville Barista Express', 'All-in-one espresso machine', 'Home Appliances', 699.00);
              INSERT INTO product (name, description, product, price) VALUES ('Ninja Foodi', 'Pressure cooker and air fryer combo', 'Home Appliances', 179.00);
              INSERT INTO product (name, description, product, price) VALUES ('Canon PowerShot G7 X Mark III', 'Compact camera with 4K video', 'Cameras', 749.00);
              INSERT INTO product (name, description, product, price) VALUES ('Nikon D3500', 'Easy-to-use DSLR for beginners', 'Cameras', 499.00);
              INSERT INTO product (name, description, product, price) VALUES ('Panasonic Lumix GH5', 'Mirrorless camera with 4K 60p video', 'Cameras', 1399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Bose QuietComfort 35 II', 'Noise-canceling wireless headphones', 'Audio', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sennheiser HD 450BT', 'Wireless noise-canceling headphones', 'Audio', 149.00);
              INSERT INTO product (name, description, product, price) VALUES ('Marshall Stanmore II', 'Bluetooth speaker with iconic design', 'Audio', 349.00);
              INSERT INTO product (name, description, product, price) VALUES ('Razer DeathAdder V2', 'Ergonomic gaming mouse', 'Accessories', 69.00);
              INSERT INTO product (name, description, product, price) VALUES ('Corsair K95 RGB Platinum', 'Mechanical gaming keyboard', 'Accessories', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('SteelSeries QcK', 'Gaming mouse pad with micro-woven cloth', 'Accessories', 19.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sony PlayStation DualSense', 'Wireless controller for PS5', 'Gaming', 69.00);
              INSERT INTO product (name, description, product, price) VALUES ('Xbox Wireless Controller', 'Controller for Xbox Series X|S', 'Gaming', 59.00);
              INSERT INTO product (name, description, product, price) VALUES ('Nintendo Switch Pro Controller', 'Enhanced controller for Switch', 'Gaming', 69.00);
              INSERT INTO product (name, description, product, price) VALUES ('Acer Predator Helios 300', 'Gaming laptop with RTX 3060', 'Computers', 1199.00);
              INSERT INTO product (name, description, product, price) VALUES ('MSI GS66 Stealth', 'Thin and powerful gaming laptop', 'Computers', 1599.00);
              INSERT INTO product (name, description, product, price) VALUES ('Razer Blade 15', 'Gaming laptop with OLED display', 'Computers', 2299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Apple iPad Air', 'Powerful and versatile tablet', 'Tablets', 599.00);
              INSERT INTO product (name, description, product, price) VALUES ('Samsung Galaxy Tab A7', 'Affordable tablet with long battery life', 'Tablets', 229.00);
              INSERT INTO product (name, description, product, price) VALUES ('Microsoft Surface Go 2', 'Portable tablet with Windows 10', 'Tablets', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Kobo Clara HD', 'E-reader with ComfortLight PRO', 'Tablets', 129.00);
              INSERT INTO product (name, description, product, price) VALUES ('Fire TV Stick 4K', 'Streaming device with Alexa Voice Remote', 'Smart Home', 49.00);
              INSERT INTO product (name, description, product, price) VALUES ('NVIDIA Shield TV', 'Powerful streaming media player', 'Smart Home', 149.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sonos Beam', 'Smart soundbar for TV and music', 'Smart Home', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('August Smart Lock Pro', 'Smart lock with Wi-Fi Bridge', 'Smart Home', 229.00);
              INSERT INTO product (name, description, product, price) VALUES ('Arlo Pro 4', 'Wireless security camera with spotlight', 'Smart Home', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Ecobee SmartThermostat', 'Smart thermostat with Alexa built-in', 'Smart Home', 249.00);
              INSERT INTO product (name, description, product, price) VALUES ('Miele Complete C3', 'Canister vacuum with powerful suction', 'Home Appliances', 999.00);
              INSERT INTO product (name, description, product, price) VALUES ('Bissell CrossWave', 'All-in-one multi-surface cleaner', 'Home Appliances', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Ecovacs Deebot N79S', 'Robot vacuum with app control', 'Home Appliances', 229.00);
              INSERT INTO product (name, description, product, price) VALUES ('Ninja Professional Blender', 'High-powered blender for smoothies', 'Home Appliances', 99.00);
              INSERT INTO product (name, description, product, price) VALUES ('Cuisinart Air Fryer Toaster Oven', 'Versatile countertop oven', 'Home Appliances', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Anova Culinary Sous Vide', 'Precision cooker for perfect cooking', 'Home Appliances', 149.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sony RX100 VII', 'Compact camera with 24-200mm zoom', 'Cameras', 1299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Fujifilm X-T4', 'Mirrorless camera with in-body stabilization', 'Cameras', 1699.00);
              INSERT INTO product (name, description, product, price) VALUES ('Olympus OM-D E-M10 Mark IV', 'Compact mirrorless camera', 'Cameras', 699.00);
              INSERT INTO product (name, description, product, price) VALUES ('Beats Solo Pro', 'Noise-canceling on-ear headphones', 'Audio', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Audio-Technica ATH-M50xBT', 'Wireless over-ear headphones', 'Audio', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Jabra Elite 75t', 'True wireless earbuds with great sound', 'Audio', 149.00);
              INSERT INTO product (name, description, product, price) VALUES ('Logitech G502 Hero', 'High-performance gaming mouse', 'Accessories', 49.00);
              INSERT INTO product (name, description, product, price) VALUES ('HyperX Alloy FPS Pro', 'Mechanical gaming keyboard', 'Accessories', 69.00);
              INSERT INTO product (name, description, product, price) VALUES ('Corsair MM300', 'Extended gaming mouse pad', 'Accessories', 29.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sony PlayStation VR', 'Virtual reality headset for PS4', 'Gaming', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Valve Index VR Kit', 'High-end VR system for PC gaming', 'Gaming', 999.00);
              INSERT INTO product (name, description, product, price) VALUES ('HTC Vive Pro', 'Professional-grade VR system', 'Gaming', 1199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Gigabyte Aero 15', 'Gaming laptop with 4K OLED display', 'Computers', 1999.00);
              INSERT INTO product (name, description, product, price) VALUES ('Alienware m15 R3', 'High-performance gaming laptop', 'Computers', 1799.00);
              INSERT INTO product (name, description, product, price) VALUES ('Asus ZenBook 13', 'Slim and lightweight laptop', 'Computers', 849.00);
              INSERT INTO product (name, description, product, price) VALUES ('Apple iPad Mini', 'Compact and powerful tablet', 'Tablets', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Lenovo Tab M10 Plus', 'Affordable tablet with 10.3-inch display', 'Tablets', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Huawei MatePad Pro', 'High-performance tablet with sleek design', 'Tablets', 549.00);
              INSERT INTO product (name, description, product, price) VALUES ('Barnes & Noble NOOK GlowLight 3', 'E-reader with night mode', 'Tablets', 119.00);
              INSERT INTO product (name, description, product, price) VALUES ('Roku Ultra', 'Streaming device with premium features', 'Smart Home', 99.00);
              INSERT INTO product (name, description, product, price) VALUES ('TiVo Stream 4K', 'Streaming device with live TV', 'Smart Home', 39.00);
              INSERT INTO product (name, description, product, price) VALUES ('Amazon Echo Show 8', 'Smart display with Alexa', 'Smart Home', 129.00);
              INSERT INTO product (name, description, product, price) VALUES ('Schlage Encode Smart Wi-Fi Deadbolt', 'Smart lock with built-in Wi-Fi', 'Smart Home', 249.00);
              INSERT INTO product (name, description, product, price) VALUES ('Wyze Cam v3', 'Indoor/outdoor security camera', 'Smart Home', 29.00);
              INSERT INTO product (name, description, product, price) VALUES ('Honeywell Home T9', 'Smart thermostat with room sensors', 'Smart Home', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Shark Navigator Lift-Away', 'Upright vacuum with lift-away feature', 'Home Appliances', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Hoover WindTunnel 3', 'Powerful upright vacuum cleaner', 'Home Appliances', 179.00);
              INSERT INTO product (name, description, product, price) VALUES ('Roborock S6 Pure', 'Robot vacuum and mop', 'Home Appliances', 599.00);
              INSERT INTO product (name, description, product, price) VALUES ('Blendtec Total Classic', 'Powerful blender with pre-programmed settings', 'Home Appliances', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Breville Smart Oven Air', 'Versatile countertop oven with air fry', 'Home Appliances', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('SousVide Supreme', 'Water oven for precise cooking', 'Home Appliances', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Canon EOS M50', 'Mirrorless camera with 15-45mm lens', 'Cameras', 649.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sony A7 III', 'Full-frame mirrorless camera', 'Cameras', 1999.00);
              INSERT INTO product (name, description, product, price) VALUES ('Nikon Z6 II', 'Full-frame mirrorless camera with 24.5MP sensor', 'Cameras', 1999.00);
              INSERT INTO product (name, description, product, price) VALUES ('Apple AirPods Pro', 'True wireless noise-canceling earbuds', 'Audio', 249.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sennheiser Momentum True Wireless 2', 'Premium true wireless earbuds', 'Audio', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('JBL Flip 5', 'Portable waterproof Bluetooth speaker', 'Audio', 119.00);
              INSERT INTO product (name, description, product, price) VALUES ('Razer Naga Pro', 'Wireless gaming mouse with modular side plates', 'Accessories', 149.00);
              INSERT INTO product (name, description, product, price) VALUES ('Cooler Master MM710', 'Ultra-lightweight gaming mouse', 'Accessories', 49.00);
              INSERT INTO product (name, description, product, price) VALUES ('Corsair K70 RGB MK.2', 'Mechanical gaming keyboard with RGB lighting', 'Accessories', 159.00);
              INSERT INTO product (name, description, product, price) VALUES ('HTC Vive Cosmos', 'PC VR system with flip-up design', 'Gaming', 699.00);
              INSERT INTO product (name, description, product, price) VALUES ('PlayStation VR Mega Pack', 'VR headset with 5 games included', 'Gaming', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Oculus Rift S', 'PC-powered VR gaming headset', 'Gaming', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Acer Nitro 5', 'Affordable gaming laptop with GTX 1650', 'Computers', 749.00);
              INSERT INTO product (name, description, product, price) VALUES ('HP Omen 15', 'Powerful gaming laptop with RTX 2070', 'Computers', 1399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Gigabyte Aorus 17G', 'Gaming laptop with mechanical keyboard', 'Computers', 2199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Amazon Fire HD 8', 'Affordable tablet with 8-inch display', 'Tablets', 89.00);
              INSERT INTO product (name, description, product, price) VALUES ('Samsung Galaxy Tab S6 Lite', 'Mid-range tablet with S Pen included', 'Tablets', 349.00);
              INSERT INTO product (name, description, product, price) VALUES ('Lenovo Yoga Smart Tab', 'Tablet with built-in kickstand', 'Tablets', 249.00);
              INSERT INTO product (name, description, product, price) VALUES ('Onyx Boox Note Air', 'E-ink tablet with note-taking capabilities', 'Tablets', 479.00);
              INSERT INTO product (name, description, product, price) VALUES ('Roku Express', 'Affordable streaming device', 'Smart Home', 29.00);
              INSERT INTO product (name, description, product, price) VALUES ('Amazon Fire TV Cube', 'Streaming device with Alexa and hands-free control', 'Smart Home', 119.00);
              INSERT INTO product (name, description, product, price) VALUES ('Google Nest Mini', 'Compact smart speaker with Google Assistant', 'Smart Home', 49.00);
              INSERT INTO product (name, description, product, price) VALUES ('Kwikset Halo', 'Wi-Fi enabled smart lock', 'Smart Home', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Ring Stick Up Cam', 'Battery-powered security camera', 'Smart Home', 99.00);
              INSERT INTO product (name, description, product, price) VALUES ('Ecobee3 Lite', 'Smart thermostat with remote sensors', 'Smart Home', 169.00);
              INSERT INTO product (name, description, product, price) VALUES ('Hoover Linx Cordless', 'Stick vacuum with powerful suction', 'Home Appliances', 149.00);
              INSERT INTO product (name, description, product, price) VALUES ('Miele Blizzard CX1', 'Bagless canister vacuum', 'Home Appliances', 699.00);
              INSERT INTO product (name, description, product, price) VALUES ('iRobot Braava Jet M6', 'Robot mop with precision jet spray', 'Home Appliances', 499.00);
              INSERT INTO product (name, description, product, price) VALUES ('Oster Pro 1200', 'Blender with food processor attachment', 'Home Appliances', 89.00);
              INSERT INTO product (name, description, product, price) VALUES ('Cuisinart TOA-60', 'Air fryer toaster oven', 'Home Appliances', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Anova Precision Cooker Nano', 'Compact sous vide cooker', 'Home Appliances', 99.00);
              INSERT INTO product (name, description, product, price) VALUES ('Canon EOS R5', 'Full-frame mirrorless camera with 8K video', 'Cameras', 3899.00);
              INSERT INTO product (name, description, product, price) VALUES ('Panasonic Lumix S5', 'Full-frame mirrorless camera with 4K 60p video', 'Cameras', 1999.00);
              INSERT INTO product (name, description, product, price) VALUES ('Fujifilm X100V', 'Premium compact camera with hybrid viewfinder', 'Cameras', 1399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Bose SoundLink Mini II', 'Portable Bluetooth speaker with big sound', 'Audio', 179.00);
              INSERT INTO product (name, description, product, price) VALUES ('Marshall Kilburn II', 'Portable Bluetooth speaker with iconic design', 'Audio', 299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Sony WF-1000XM3', 'True wireless noise-canceling earbuds', 'Audio', 229.00);
              INSERT INTO product (name, description, product, price) VALUES ('Razer Huntsman Elite', 'Opto-mechanical gaming keyboard', 'Accessories', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('SteelSeries Rival 600', 'Dual sensor gaming mouse', 'Accessories', 79.00);
              INSERT INTO product (name, description, product, price) VALUES ('Glorious Model O', 'Ultra-lightweight gaming mouse', 'Accessories', 49.00);
              INSERT INTO product (name, description, product, price) VALUES ('Oculus Quest', 'Standalone VR headset with touch controllers', 'Gaming', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Samsung HMD Odyssey+', 'Windows Mixed Reality headset', 'Gaming', 499.00);
              INSERT INTO product (name, description, product, price) VALUES ('Pimax 5K Plus', 'Ultra-wide field of view VR headset', 'Gaming', 699.00);
              INSERT INTO product (name, description, product, price) VALUES ('HP Spectre x360', 'Convertible laptop with stunning design', 'Computers', 1299.00);
              INSERT INTO product (name, description, product, price) VALUES ('Dell G5 15', 'Affordable gaming laptop with GTX 1660 Ti', 'Computers', 999.00);
              INSERT INTO product (name, description, product, price) VALUES ('Lenovo Legion 5', 'Powerful gaming laptop with AMD Ryzen', 'Computers', 1199.00);
              INSERT INTO product (name, description, product, price) VALUES ('Samsung Galaxy Tab S5e', 'Slim and lightweight tablet', 'Tablets', 399.00);
              INSERT INTO product (name, description, product, price) VALUES ('Amazon Fire 7', 'Affordable tablet with 7-inch display', 'Tablets', 49.00);
              INSERT INTO product (name, description, product, price) VALUES ('Apple iPad', 'Versatile and powerful tablet', 'Tablets', 329.00);
              INSERT INTO product (name, description, product, price) VALUES ('Kobo Libra H2O', 'Waterproof e-reader with ComfortLight PRO', 'Tablets', 169.00);
              INSERT INTO product (name, description, product, price) VALUES ('Roku Premiere', '4K streaming device', 'Smart Home', 39.00);
              INSERT INTO product (name, description, product, price) VALUES ('Google Nest Audio', 'Smart speaker with powerful sound', 'Smart Home', 99.00);
              INSERT INTO product (name, description, product, price) VALUES ('Amazon Echo (4th Gen)', 'Smart speaker with premium sound', 'Smart Home', 99.00);
              INSERT INTO product (name, description, product, price) VALUES ('SimpliSafe Home Security System', 'DIY home security with optional monitoring', 'Smart Home', 229.00);
              INSERT INTO product (name, description, product, price) VALUES ('Eufy Security 2K Indoor Cam', 'Indoor security camera with 2K resolution', 'Smart Home', 39.00);
              INSERT INTO product (name, description, product, price) VALUES ('Nest Learning Thermostat', 'Smart thermostat with auto-schedule', 'Smart Home', 249.00);
              INSERT INTO product (name, description, product, price) VALUES ('Dyson Ball Animal 2', 'Upright vacuum with strong suction', 'Home Appliances', 499.00);
              INSERT INTO product (name, description, product, price) VALUES ('Bissell Pet Hair Eraser', 'Handheld vacuum for pet hair', 'Home Appliances', 79.00);
              INSERT INTO product (name, description, product, price) VALUES ('iRobot Roomba 960', 'Robot vacuum with Wi-Fi connectivity', 'Home Appliances', 599.00);
              INSERT INTO product (name, description, product, price) VALUES ('Vitamix 5200', 'Professional-grade blender', 'Home Appliances', 449.00);
              INSERT INTO product (name, description, product, price) VALUES ('Breville Smart Grinder Pro', 'Coffee grinder with 60 settings', 'Home Appliances', 199.00);
              INSERT INTO product (name, description, product, price) VALUES ('ChefSteps Joule', 'Sous vide precision cooker with app control', 'Home Appliances', 199.00);
              `)
          
          

          console.log("success")
        } catch (err) {
          console.log("Error seeding user info", err);
        }

        
}
seedUserInfo()


