# Ambulance Tracker – Static Map with Animation and Stepper

This project demonstrates a ambulance's movement on a map using React and Leaflet. It simulates the ambulance's journey from Hospital (starting point) and Accident Site (ending point) along a predefined route. The simulation is triggered when app loads, and the ambulance icon moves along the route in real-time.

## Features

- Displays a map using Leaflet.
- Simulates ambulance movement from a starting point to an ending point.
- Displays the complete route on the map with a polyline.
- Updates the ambulance's position on the map in real-time.
- A button to replay the simulation, resetting the ambulance to the starting point.
- Ambulance car icon for the moving vehicle.
- Shows the progress using a stepper component.
- Shows a progress bar.
- Play sound on arrival.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BilalKarim89/ambulance-tracker
   cd ambulance-tracker
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open the application in your browser:

   ```
   http://localhost:3000
   ```

## Usage

1. The application will load with a map centered at the starting point of the route.
2. Click the "Replay Trip" button to re-start the simulation.
3. The ambulance icon will move along the predefined route from the starting point to the ending point.

## Project Structure

- `src/components/MapComponent.js`: Contains the map component that handles the rendering of the Leaflet map, ambulance icon, and simulation logic.
- `src/components/StepperComponent.js`: Contains the stepper component.
- `public/index.html`: The main HTML file that includes the root `div` where the React app is rendered.
- `src/index.js`: Entry point for the React application.

## Customization

### Changing the Ambulance Icon

To change the ambulance icon, update the `iconUrl` in the `ambulanceIcon` configuration:

```javascript
const ambulanceIcon = new L.Icon({
  iconUrl: 'your-icon-url', // Replace with your ambulance icon URL
  iconSize: [48, 48],
  iconAnchor: [24, 44],
});
```

## Dependencies

- [React](https://reactjs.org/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Leaflet](https://leafletjs.com/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Leaflet Documentation](https://leafletjs.com/)
- [React Leaflet Documentation](https://react-leaflet.js.org/)