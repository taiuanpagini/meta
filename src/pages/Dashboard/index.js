/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner, Input, Button } from 'reactstrap';
import { Search } from 'react-feather';
import api from '../../services/api';

import { Container, Form, ContainerCountry } from './styles';

export default function Dashboard() {
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [valueState, setValueState] = useState('');
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  async function GetCountries() {
    const obj = {
      query: `
        query {
          Country {
            name
            capital
            area
            population
            topLevelDomains {
              name
            }
            flag {
              svgFile
            }
            location {
              latitude
              longitude
            }
            distanceToOtherCountries(first: 5) {
              distanceInKm
              countryName
            }
          }
        }
      `,
    };
    const response = await api.post(
      'https://countries-274616.ew.r.appspot.com',
      obj
    );

    const { data, status } = response;
    const newCountries = [];

    if (status === 200) {
      data.data.Country.map((item) => {
        const newCountry = {
          name: item.name,
          capital: item.capital,
          population: item.population,
          area: item.area,
          topLevelDomains: item.topLevelDomains.length
            ? item.topLevelDomains[0].name
            : null,
          avatar: item.flag.svgFile,
          location: item.location,
          distanceToOtherCountries: item.distanceToOtherCountries,
        };

        newCountries.push(newCountry);
      });

      setCountries(newCountries);
      setLoading(false);
    }
  }

  useEffect(() => {
    GetCountries();
  }, []);

  function handleFilter(e) {
    const { value } = e.target;
    let filteredDataLet = filteredData;
    setValueState(value);

    if (valueState.length) {
      filteredDataLet = countries.filter((item) => {
        const startsWithCondition =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.capital.toLowerCase().startsWith(value.toLowerCase());
        const includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.capital.toLowerCase().includes(value.toLowerCase());

        if (startsWithCondition) {
          return startsWithCondition;
        }
        if (!startsWithCondition && includesCondition) {
          return includesCondition;
        }
        return null;
      });

      setFilteredData(filteredDataLet);
    }
  }

  return (
    <Container loading={loading}>
      {loading ? (
        <Spinner color="primary" />
      ) : (
        <>
          <Form>
            <Input
              value={valueState}
              placeholder="Pesquisar"
              onChange={(e) => handleFilter(e)}
            />
            <div>
              <Search size="15" />
            </div>
          </Form>
          <ul>
            {valueState.length
              ? filteredData.map((country) => (
                  <ContainerCountry>
                    <Button
                      onClick={() => history.push('/details', { country })}
                    >
                      <img src={country.avatar} alt={country.name} />
                      <div>
                        <h3>{country.name}</h3>
                        <span>{country.capital}</span>
                      </div>
                    </Button>
                  </ContainerCountry>
                ))
              : countries.map((country) => (
                  <ContainerCountry>
                    <Button
                      onClick={() => history.push('/details', { country })}
                    >
                      <img src={country.avatar} alt={country.name} />
                      <div>
                        <h3>{country.name}</h3>
                        <span>{country.capital}</span>
                      </div>
                    </Button>
                  </ContainerCountry>
                ))}
          </ul>
        </>
      )}
    </Container>
  );
}
