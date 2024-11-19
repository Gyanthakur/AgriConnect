// src/pages/SustainableFarming.jsx

import React from "react";

const SustainableFarming = ({isDarkMode}) => {
	return (
		<div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-50' : 'bg-gray-100'}  p-6`}>
			<h1 className={`text-4xl font-bold ${isDarkMode ? 'text-green-500' : 'text-green-700'} text-center mb-8`}>
				Sustainable Farming
			</h1>

			<section className={`max-w-5xl mx-auto ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
				<p className="mb-6">
					Sustainable farming is an approach to agriculture that focuses on
					producing food, fiber, and other plant and animal products in ways
					that protect the environment, improve public health, and ensure the
					well-being of farmers and communities. It emphasizes long-term
					practices that do not deplete the natural resources required for
					farming, such as soil, water, and biodiversity. Sustainable farming
					aims to meet the current demands for food and agricultural products
					without compromising the ability of future generations to meet their
					needs.
				</p>

				<h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-4`}>
					Key Features of Sustainable Farming
				</h2>

				<ul className="list-disc pl-5 space-y-4">
					<li>
						<strong>Soil Health and Management:</strong> Maintaining and
						improving soil health through crop rotation, reduced tillage, and
						organic fertilizers.
					</li>
					<li>
						<strong>Water Conservation:</strong> Techniques like drip
						irrigation, rainwater harvesting, and drought-resistant crops
						conserve water and reduce environmental impact.
					</li>
					<li>
						<strong>Biodiversity and Crop Diversity:</strong> Planting a variety
						of crops and maintaining natural habitats supports biodiversity and
						resilience to pests and environmental changes.
					</li>
					<li>
						<strong>Integrated Pest Management (IPM):</strong> A mix of
						biological, cultural, and mechanical pest control methods to reduce
						chemical use.
					</li>
					<li>
						<strong>Renewable Energy Use:</strong> Utilizing solar, wind, or
						bioenergy to reduce reliance on fossil fuels and lower greenhouse
						gas emissions.
					</li>
					<li>
						<strong>Reduced Chemical Usage:</strong> Minimizing synthetic
						chemicals and fertilizers to protect water quality and soil health.
					</li>
					<li>
						<strong>Animal Welfare:</strong> Ensuring humane treatment of
						livestock with proper space, nutrition, and healthcare.
					</li>
					<li>
						<strong>Community Engagement:</strong> Building local connections
						through farmers’ markets, educational programs, and partnerships.
					</li>
				</ul>

				<h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-4 mt-8`}>
					Sustainable Farming Methods
				</h2>

				<div className="space-y-6">
					<div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md border-l-4 border-green-500`}>
						<h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-2`}>
							1. Crop Rotation and Diversification
						</h3>
						<p>
							By rotating crops seasonally, farmers can naturally reduce pests
							and diseases in the soil, improve nutrient availability, and
							decrease the need for chemical fertilizers and pesticides.
						</p>
					</div>

					<div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md border-l-4 border-green-500`}>
						<h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-2`}>
							2. Cover Cropping
						</h3>
						<p>
							Planting cover crops like clover or rye in between main crop
							cycles helps prevent soil erosion, enhances soil fertility, and
							retains moisture, reducing the need for synthetic inputs.
						</p>
					</div>

					<div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md border-l-4 border-green-500`}>
						<h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-2`}>
							3. Integrated Pest Management (IPM)
						</h3>
						<p>
							IPM combines natural pest control methods, such as introducing
							beneficial insects, with minimal pesticide use, which reduces
							water pollution and protects surrounding ecosystems.
						</p>
					</div>

					<div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md border-l-4 border-green-500`}>
						<h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-2`}>
							4. Drip Irrigation
						</h3>
						<p>
							This water-efficient irrigation method delivers water directly to
							the plant roots, minimizing evaporation and conserving water
							resources.
						</p>
					</div>

					<div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md border-l-4 border-green-500`}>
						<h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-2`}>
							5. Conservation Tillage
						</h3>
						<p>
							Reducing or eliminating tillage maintains soil structure, enhances
							water retention, and minimizes erosion, reducing the need for
							chemical inputs.
						</p>
					</div>

					<div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md border-l-4 border-green-500`}>
						<h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-2`}>
							6. Organic Fertilizers
						</h3>
						<p>
							Organic fertilizers, such as compost and animal manure, provide
							essential nutrients for crops without relying on synthetic
							chemicals, improving soil health and reducing pollution.
						</p>
					</div>

					<div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md border-l-4 border-green-500`}>
						<h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-2`}>
							7. Agroforestry
						</h3>
						<p>
							Integrating trees into farming systems not only supports
							biodiversity but also improves soil health, conserves water, and
							provides shade, reducing the need for chemical inputs.
						</p>
					</div>

					<div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md border-l-4 border-green-500`}>
						<h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'} mb-2`}>
							8. Protection Methods
						</h3>
						<p>
							Protection methods in sustainable farming aim to safeguard crops,
							soil, and the surrounding environment. These methods include:
						</p>
						<ul className="list-disc pl-5 mt-2 space-y-2">
							<li>
								<strong>Natural Pest Barriers:</strong> Utilizing companion
								planting or hedgerows to naturally deter pests without chemical
								pesticides.
							</li>
							<li>
								<strong>Mulching:</strong> Applying organic or synthetic mulch
								around plants to protect soil from erosion, conserve moisture,
								and suppress weeds.
							</li>
							<li>
								<strong>Biological Control Agents:</strong> Introducing
								beneficial insects, like ladybugs or predatory mites, to control
								pest populations naturally.
							</li>
							<li>
								<strong>Windbreaks and Shelterbelts:</strong> Planting trees or
								shrubs to reduce wind erosion, protect soil structure, and
								create habitat for wildlife.
							</li>
							<li>
								<strong>Soil Cover Crops:</strong> Keeping soil covered with
								plants to protect it from extreme temperatures, reduce erosion,
								and improve organic content.
							</li>
						</ul>
					</div>
				</div>

				<div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg shadow-lg mt-8`}>
					<h3 className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-4`}>
						Crops with Benefits
					</h3>
					<p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-700'} mb-6`}>
						Explore these crops to learn more about their benefits in
						sustainable farming. These crops provide environmental, nutritional,
						and economic advantages, making them excellent choices for modern
						agriculture.
					</p>

					{/* Crop Information Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="border rounded-lg overflow-hidden shadow-sm">
							<img
								src="https://images.pexels.com/photos/265242/pexels-photo-265242.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Wheat Field"
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h4 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Wheat</h4>
								<p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-600'} mt-1`}>
									Wheat is a staple food crop providing high nutritional value,
									essential for food security and a source of income for many
									farmers.
								</p>
							</div>
						</div>

						<div className="border rounded-lg overflow-hidden shadow-sm">
							<img
								src="https://images.pexels.com/photos/4110255/pexels-photo-4110255.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Rice Field"
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h4 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Rice</h4>
								<p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-600'} mt-1`}>
									Rice feeds billions worldwide. It's an essential crop that
									also supports wetland ecosystems and soil health in
									sustainable rotations.
								</p>
							</div>
						</div>

						<div className="border rounded-lg overflow-hidden shadow-sm">
							<img
								src="https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Corn Field"
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h4 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Corn</h4>
								<p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-600'} mt-1`}>
									Corn is a versatile crop used for food, animal feed, and
									biofuel. It’s beneficial for soil when used in crop rotation.
								</p>
							</div>
						</div>

						<div className="border rounded-lg overflow-hidden shadow-sm">
							<img
								src="https://images.pexels.com/photos/2889412/pexels-photo-2889412.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Soybean Crop"
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h4 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Soybeans</h4>
								<p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-600'} mt-1`}>
									Soybeans improve soil nitrogen levels, making them ideal for
									crop rotation and essential in livestock feed.
								</p>
							</div>
						</div>

						<div className="border rounded-lg overflow-hidden shadow-sm">
							<img
								src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Tomato Crop"
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h4 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Tomatoes</h4>
								<p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-600'} mt-1`}>
									Tomatoes are a high-value crop providing vitamins and
									antioxidants. They thrive with sustainable pest management
									practices.
								</p>
							</div>
						</div>

						<div className="border rounded-lg overflow-hidden shadow-sm">
							<img
								src="https://images.pexels.com/photos/1287124/pexels-photo-1287124.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Sunflower Field"
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h4 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Sunflowers</h4>
								<p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-600'} mt-1`}>
									Sunflowers are great for attracting pollinators and are also
									used for oil production, which benefits the soil in rotation
									systems.
								</p>
							</div>
						</div>

						<div className="border rounded-lg overflow-hidden shadow-sm">
							<img
								src="https://media.istockphoto.com/id/1152602840/photo/aerial-photography-solar-photovoltaic-towers-standing-on-the-surface-of-the-water.jpg?s=612x612&w=0&k=20&c=HK2jFJj470hkSQZubOPzAlNXtnK25Nml5uGtJZ6TrqE="
								alt="Solar Farming"
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h4 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
									Solar Farming
								</h4>
								<p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-600'} mt-1`}>
									Solar farming supports sustainability by producing renewable
									energy. Combined with crop production, it enhances farm
									sustainability.
								</p>
							</div>
						</div>

						<div className="border rounded-lg overflow-hidden shadow-sm">
							<img
								src="https://images.pexels.com/photos/1264000/pexels-photo-1264000.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Herb Field"
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h4 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Herbs</h4>
								<p className={`${isDarkMode ? 'text-gray-50' : 'text-gray-600'} mt-1`}>
									Herbs like basil and rosemary provide flavor and medicinal
									benefits while being low-maintenance and pest-resistant.
								</p>
							</div>
						</div>
					</div>
				</div>

				<h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mt-8 mb-4`}>
					Why Sustainable Farming Matters
				</h2>

				<p className="mb-6">
					Sustainable farming is essential for creating a healthy and resilient
					food system. It provides long-term solutions to the environmental and
					social challenges faced by conventional farming. By adopting
					sustainable practices, farmers can help combat climate change,
					preserve natural resources, support local economies, and ensure that
					agricultural practices continue to benefit future generations.
				</p>

				<p>
					At Agriconnect, we are committed to supporting sustainable farming
					practices by providing resources, information, and community support
					to help farmers adopt sustainable practices. Explore our platform to
					learn more and connect with others dedicated to a sustainable future
					for agriculture.
				</p>
			</section>
		</div>
	);
};

export default SustainableFarming;
