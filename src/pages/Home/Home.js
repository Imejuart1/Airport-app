//This Javascript file renders the data from opensky api
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import './Home.css';
import Pagination from '../../components/Pagination';


  // This component displays the airport counts table and pagination
// based on the data fetched from the OpenSky Network API.
function Home() {
  const [flights, setFlights] = useState([]);
  const [airportCounts, setAirportCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


    // Helper function to count the number of flights for each airport
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

    // Calculate the current time at each airport based on the average of the first and last seen times
    const airportCurrentTime = {};
    Object.keys(airportFirstSeen).forEach(airportCode => {
      const earliestTime = airportFirstSeen[airportCode];
      const latestTime = airportLastSeen[airportCode];
      const avgTime = Math.floor((earliestTime + latestTime) / 2);
      const cstTime = moment.tz(avgTime * 1000, 'America/Chicago');
      const timeFormat = cstTime.hour() < 12 ? 'h:mm A' :'h:mm A'
      airportCurrentTime[airportCode] = cstTime.format(timeFormat)  + ' CST';
    });

    return { departure: departureCounts, arrival: arrivalCounts, currentTime: airportCurrentTime };
  };
 
  // Fetch data from OpenSky API on component mount and every second thereafter
  useEffect(() => {
    const fetchData = async () => {
      const now = Math.floor(Date.now() / 1000); // current Unix timestamp in seconds
      const begin = now - 3600; // 1 hour ago
      const end = now + 3600; // 1 hour from now

      try {
        const res = await axios.get(`https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`);
        const flights = res.data;
        const counts = countAirports(flights);
        setAirportCounts(counts);
      } catch (err) {
        console.log(err);
      }
    };

    // Fetch data initially and then every second
    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Object.keys(airportCounts.currentTime|| {}).slice(indexOfFirstItem, indexOfLastItem);


return (
  <div className="airport-counts">
    <h2>RESULTS FROM OPENSKY NETWORK API, MADE WITH REACT</h2>
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
  <p> Harvest committee meeting of 27th June, 2023.
Meeting started @8:46am with prayers from Mr. Asulemen. Followed by a word of encouragement from the harvest chairman. She went further to tell members the reason for the meeting which is because of the forth coming covenant prayer with the Lord. She encourage all members to take the message outside and invite many people for our upcoming  program beginning on Wednesday 28 to 30th June, 2023

Mr Asulemen further encourage member's participation and the need for frequent physical meeting and minutes of our meetings to be properly documented for ease of getting information across to all members and emphasized the importance of carrying all members along.
 
The second discussion was to assess performance of our programs so far. The chairman made the house to understand that having done the harvest Theme selection and unveiling that we have not made up to a 1m naira, recalled our target is 250m,  hence the need for all members to step up our actions towards mobilizing people for all our programs especially the forthcoming covenant with the Lord program that can give the church money for the harvest. For the program, we agreed that the chairman should contact the church choir and charismatic, inform them to take charge of praise/worship during the program. The following conclusions were also reached: Security:- @Youth president Segun Ola should make arrangement to mount the gate till the main night security resume.
Mass servers:- Augustus to inform the Mass servers for the program.
Media:- Stephen Iji should follow up on projector to be used.
Clean up of the church:- all harvest members to ensure the chairs are arranged and church premises be clean each day.
We also agreed the chairman and Barrister Chimdi should meet Padre to roll out program for the forthcoming event. 

On members that are not showing interest for our meetings/activities: we agreed to get the master list of members from Padre and people there to be contacted and those that are not ready should be replace to enable us achieve our aim for the harvest.

On finance: The financial secretory sent her records to the meeting with the excuses that she would be away for sometimes and the finance book was giving back to Mr Anaga
        {/* Map through the list of airport codes and display the corresponding counts */}</p>
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
    {/* Render pagination component */}
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
