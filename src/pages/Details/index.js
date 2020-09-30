/* eslint-disable array-callback-return */
import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import GoogleMap from '~/components/GoogleMap';
import Marker from '~/components/Marker';

import { Container, ContainerDetails, DataCountry } from './styles';

export default function Details(match) {
  const { state } = match.history.location;
  const [loading, setLoading] = useState(true);
  const [loadingMap, setLoadingMap] = useState(true);
  const [country] = useState(state.country);
  const [otherCountries, setOtherCountries] = useState([]);

  const GetLatLongCountry = useCallback(
    async function GetLatLongCountry(other) {
      const newCountries = otherCountries;

      const response = await Axios.get(
        `http://www.mapquestapi.com/geocoding/v1/address?key=zPN2TU2sAYx4GlGMqBAni7dnhakWTpMF&location=${other.countryName}`
      );

      const { latLng } = response.data.results[0].locations[0];

      newCountries.push(latLng);
      setOtherCountries(newCountries);

      if (newCountries.length === 5) {
        setLoadingMap(false);
      }
    },
    [otherCountries]
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    country.distanceToOtherCountries.map((other) => {
      GetLatLongCountry(other);
    });
  }, [country, GetLatLongCountry]);

  return (
    <Container loading={loading}>
      {loading ? (
        <Spinner color="primary" />
      ) : (
        <>
          <ContainerDetails>
            <img src={country.avatar} alt={country.name} />
            <DataCountry>
              <h3>{country.name}</h3>
              <h4>
                <strong>Capital:</strong> {country.capital}
              </h4>
              <h4>
                <strong>Área:</strong> {country.area}
              </h4>
              <h4>
                <strong>População: </strong>
                {country.population}
              </h4>
              <h4>
                <strong>Dominio: </strong>
                {country.topLevelDomains}
              </h4>
            </DataCountry>
          </ContainerDetails>

          {!loadingMap && (
            <>
              <h5>Países Próximos</h5>
              <GoogleMap
                defaultZoom={4}
                defaultCenter={{
                  lat: country.location.latitude,
                  lng: country.location.longitude,
                }}
                yesIWantToUseGoogleMapApiInternals
              >
                {otherCountries.map((marker) => (
                  <Marker
                    key={1}
                    text="Canada"
                    lat={marker.lat}
                    lng={marker.lng}
                  />
                ))}
              </GoogleMap>
            </>
          )}
        </>
      )}
    </Container>
  );
}
