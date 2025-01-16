import React, { useEffect, useRef, useState } from 'react';
import TopBar from '../../components/topBar';
import Navbar from '../../components/navBar';
import { useLocation } from 'react-router-dom';
import Listing from './listing';
import { BsStarFill } from 'react-icons/bs';
import mapboxgl from 'mapbox-gl';
import AllowLocation from './components/AllowLocation';
import Cookies from 'js-cookie';
import { useSearchListingWithinRangeMutation } from '../../../Redux/api/hostelApis';
import SearchForm from '../Listings/components/SearchForm';
import { useAverageRatingsQuery } from '../../../Redux/api/reviewsApis';
import Loader from './../../../Admin/common/Loader/index';

const SearchListings = () => {
  const [value, setValue] = useState(50);
  const [searchNearByHostels] = useSearchListingWithinRangeMutation();
  const { data: ratingsData, isLoading: loadingRatings } =
    useAverageRatingsQuery();

  mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_KEY;

  const mapContainer = useRef(null);
  const map = useRef(null);

  const location = useLocation();

  let coordinates = Cookies.get('coordinates');
  let currentUserLongitude = 0;
  let currentUserLatitude = 0;

  if (coordinates) {
    coordinates = coordinates.split(',');
    currentUserLatitude = coordinates[1];
    currentUserLongitude = coordinates[0];
  }

  if (!coordinates) {
    if (location.state === null) {
      return <AllowLocation />;
    }
  }

  const [nearByHostelsData, setNearByHostelsData] = useState(
    location.state?.nearHostelsData || [],
  );

  const [longitude, setLongitude] = useState(
    location.state?.coordinates[1][0] || currentUserLongitude,
  );
  const [latitude, setLatitude] = useState(
    location.state?.coordinates[1][1] || currentUserLatitude,
  );
  const [locationName, setLocationName] = useState(
    location.state?.coordinates[0] || 'Your Location',
  );
  const [distance, setDistance] = useState(location.state?.distance || 100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await searchNearByHostels({
          Lat: latitude,
          Lon: longitude,
          distance: distance,
        });
        if (res.data) {
          setNearByHostelsData(res.data.payLoad);
        }
      } catch (e) {}
    };
    if (location.state === null) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Check if mapContainer.current is not null
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [longitude, latitude],
      zoom: 15,
    });

    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map.current);
  });

  const handleSearchSubmit = async (formData) => {
    const { selectedLocationCoords, distance } = formData;
    console.log(formData);

    try {
      const res = await searchNearByHostels({
        Lat: selectedLocationCoords[1][1],
        Lon: selectedLocationCoords[1][0],
        distance,
      });
      if (res.data) {
        setNearByHostelsData(res.data.payLoad);
        setLongitude(selectedLocationCoords[1][0]);
        setLatitude(selectedLocationCoords[1][1]);
        setLocationName(selectedLocationCoords[0]);
        setDistance(distance);
      }
    } catch (e) {}
  };

  return (
    <>
      {loadingRatings ? (
        <Loader />
      ) : (
        <>
          <TopBar />
          <Navbar />
          {nearByHostelsData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 pb-8 pt-8 text-center mt-18 bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-lg shadow-lg">
                <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">
                  {`${nearByHostelsData?.length} Hostels Found in ${locationName} within ${distance} KM radius of your location`}
                </h3>
                <p className="mt-4 text-xl text-white">
                  Explore and find the best hostels near you.
                </p>
              </div>
              <section className="relative md:py-12 py-5 bg-white w-[94%] mx-auto">
                <div className="container relative">
                  <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                    <div className="lg:col-span-4 md:col-span-5 md:order-2 order-1">
                      <div className="p-4 rounded-md shadow dark:shadow-gray-700 sticky top-3">
                        <div className="mt-6">
                          <h5 className="text-lg font-medium">Location Map</h5>

                          <div className="mt-3">
                            <div ref={mapContainer} className="h-52" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-8 md:col-span-7 md:order-1 order-2">
                      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                        {nearByHostelsData?.map((hostel) => {
                          return (
                            <Listing
                              rating={ratingsData}
                              listingData={hostel}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="grid grid-cols-1 pb-8 pt-8 text-center mt-18 bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-lg shadow-lg">
              <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">
                {`No Hostels Found in ${locationName} within ${distance} KM radius of your location`}
              </h3>
              <p className="mt-4 text-xl text-white">
                Try increasing the radius to find more hostels or change your
                Location
              </p>
              <div className="mt-6">
                <SearchForm
                  initialFormData={{
                    startDate: location.state?.startDate,
                    endDate: location.state?.endDate,
                    distance: location.state?.distance,
                    selectedLocationCoords: null,
                  }}
                  onSubmit={handleSearchSubmit}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchListings;
