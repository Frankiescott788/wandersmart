WanderSmart: Weather-Based Travel Planner
App Description
WanderSmart is a weather-based travel planning application designed to help users plan their trips based on real-time weather conditions. The app fetches weather data for user-selected destinations, provides weather forecasts, and suggests suitable activities based on the weather (e.g., hiking for sunny days or indoor activities for rainy days). Users can also save their favorite destinations for easy access later.
Core Features
1.	Destination Search:
o	Users can search for destinations by city or location name.
2.	Weather Integration:
o	The app fetches real-time weather data using the OpenWeatherMap API, displaying information like temperature, humidity, wind speed, and weather conditions (sunny, rainy, cloudy).
3.	Activity Recommendations:
o	Based on the current weather conditions, the app suggests relevant activities (e.g., hiking for sunny weather, indoor activities for rainy weather).
4.	Favorites List:
o	Users can save their favorite destinations for quick reference later.
5.	Map Integration (Bonus Feature):
o	The app uses the Mapbox API to display the location of the selected destination on an interactive map.
Technology Stack
•	Frontend:
o	React.js (for building the user interface)
o	NextUI (for modern and responsive UI components)
o	Leaflet.js (for interactive maps)
o	Framer Motion (for animations)
o	TailwindCSS (for styling)
o	Axios (for making API requests)
•	Backend (Optional, if applicable):
o	Node.js with Express.js
o	MongoDB (for storing user preferences and favorite destinations)
APIs Used
1.	OpenWeatherMap API:
o	Provides real-time weather data such as temperature, humidity, wind speed, and weather conditions.
2.	Mapbox API:
o	Displays an interactive map to show the user’s location and selected destination on a map.
Setup Instructions
1. Clone the Repository
Clone the project repository to your local machine:
git clone https://github.com/wandersmart/wandersmart.git
cd wandersmart
2. Install Dependencies
Install the necessary dependencies:
# For frontend
cd frontend
npm install

# For backend 
cd backend
npm install
3. Set Up Environment Variables
Create a .env file in the root of both the frontend and backend directories, and add the required API keys and configuration:
# In frontend/.env
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
REACT_APP_MAPBOX_API_KEY=your_mapbox_api_key
4. Run the Application
To start the backend server:
cd backend
npm run dev
To start the frontend:

cd frontend
npm run dev
Open your browser and go to http://localhost:5173 to view the application.
5. Build for Production
# Frontend
cd frontend
npm run build

# Backend 
cd backend
npm run build
Challenges and Solutions
1. Geolocation Access
•	Problem: Not all browsers or devices support geolocation.
•	Solution: The app handles the lack of geolocation by displaying a user-friendly error message and allowing them to manually input a location.
2. Weather Data Fetching
•	Problem: Fetching weather data can occasionally fail due to API rate limits or network issues.
•	Solution: Error handling has been implemented to notify users of any failure in fetching weather data. A loading state ensures users know when data is being fetched.
3. Responsive Design
•	Problem: Ensuring the app is usable on both mobile and desktop devices.
•	Solution: The app uses TailwindCSS for responsive design, which adapts the layout for various screen sizes.
4. Map Integration
•	Problem: Integrating the map without affecting the user experience.
•	Solution: The app uses Leaflet.js and Mapbox APIs to seamlessly integrate an interactive map while maintaining a smooth user interface.
App Preview
•	App Link: https://travelwandersmart.vercel.app/

