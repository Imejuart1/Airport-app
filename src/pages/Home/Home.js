import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import './Home.css';
import Pagination from '../../components/Pagination';

function Home() {
  const [flights, setFlights] = useState([]);
  const [airportCounts, setAirportCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

   useEffect(() => {
    const fetchData = async () => {
      const now = Math.floor(Date.now() / 1000); // current Unix timestamp in seconds
      const begin = now - 3600; // 1 hour ago
      const end = now + 3600; // 1 hour from now

      try {
        const res = await axios.get(`https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`);
        const flights = res.data;
        const counts = countAirports(flights);
        setFlights(flights);
        setAirportCounts(counts);
      } catch (err) {
        console.log(err);
      }
    };

    // Fetch data initially and then every 5 seconds
    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  
const countAirports = (flights) => {
  const departureCounts = {};
  const arrivalCounts = {};
  const airportFirstSeen = {};
  const airportLastSeen = {};

  flights.forEach(flight => {
    const { icao24, firstSeen, lastSeen, estDepartureAirport, estArrivalAirport } = flight;

    if (estDepartureAirport) {
      departureCounts[estDepartureAirport] = departureCounts[estDepartureAirport] + 1 || 1;
      airportFirstSeen[estDepartureAirport] = Math.min(firstSeen, airportFirstSeen[estDepartureAirport] || firstSeen);
      airportLastSeen[estDepartureAirport] = Math.max(lastSeen, airportLastSeen[estDepartureAirport] || lastSeen);
    }
    if (estArrivalAirport) {
      arrivalCounts[estArrivalAirport] = arrivalCounts[estArrivalAirport] + 1 || 1;
      airportFirstSeen[estArrivalAirport] = Math.min(firstSeen, airportFirstSeen[estArrivalAirport] || firstSeen);
      airportLastSeen[estArrivalAirport] = Math.max(lastSeen, airportLastSeen[estArrivalAirport] || lastSeen);
    }
  });

  const airportCurrentTime = {};
  Object.keys(airportFirstSeen).forEach(airportCode => {
    const earliestTime = airportFirstSeen[airportCode];
    const latestTime = airportLastSeen[airportCode];
    const avgTime = Math.floor((earliestTime + latestTime) / 2);
    const cstTime = moment.tz(avgTime * 1000, 'America/Chicago');
    const timeFormat = cstTime.hour() < 12 ? 'h:mmA' : 'h:mmP';
    airportCurrentTime[airportCode] = cstTime.format(timeFormat) + 'M' + ' CST';
  });

  return { departure: departureCounts, arrival: arrivalCounts, currentTime: airportCurrentTime };
};
 const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Object.keys(airportCounts.departure || {}).slice(indexOfFirstItem, indexOfLastItem);
   return (
    <div className="airport-counts">
      <h2>RESULTS FROM OPENSKY NETWORK API</h2>
      <table>
        <thead>
          <tr>
            <th>AIRPORT</th>
            <th>TIME</th>
            <th>ARRIVING</th>
            <th>DEPARTING</th>
          </tr>
        </thead>
        <tbody>
           {currentItems.map((airportCode) => (
            <tr key={airportCode}>
              <td>{airportCode}</td>
              <td>{airportCounts.currentTime[airportCode] || 0}</td>
              <td>{airportCounts.arrival[airportCode] || 0}</td>
              <td>{airportCounts.departure[airportCode] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
         <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={Object.keys(airportCounts.departure || {}).length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Home;
