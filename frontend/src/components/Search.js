import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const specializationQuery = gql`
  query Specializations {
    specializations {
      s_name
    }
  }
`;

const DOCTORS_QUERY = gql`
  query Doctors {
    doctors {
      d_id
      d_name
    }
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [nameResults, setNameResults] = useState([]);
  const [specializationResults, setSpecializationResults] = useState([]);
  const [nameResultsHeight, setNameResultsHeight] = useState('h-20');
  const [specializationResultsHeight, setSpecializationResultsHeight] = useState('h-20');
  const Navigate = useNavigate(); 

  const { loading: loadingSpecialization, error: errorSpecialization, data: dataSpecialization } = useQuery(specializationQuery);
  const { loading: loadingDoctors, error: errorDoctors, data: dataDoctors } = useQuery(DOCTORS_QUERY);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  };

  const optimisedVersion = useCallback(
    debounce((value) => {
      if (value.trim() !== '') {
        // Filter by name
        if (dataDoctors && dataDoctors.doctors) {
          const filteredByName = dataDoctors.doctors.filter(
            (doctor) =>
              doctor.d_name.toLowerCase().includes(value.toLowerCase())
          );
          setNameResults(filteredByName);
          setNameResultsHeight(filteredByName.length > 0 ? 'h-80' : 'h-20');
        }

        // Filter by specialization
        if (dataSpecialization && dataSpecialization.specializations) {
          const filteredBySpecialization = dataSpecialization.specializations.filter(
            (specialization) =>
              specialization.s_name.toLowerCase().includes(value.toLowerCase())
          );
          setSpecializationResults(filteredBySpecialization);
          setSpecializationResultsHeight(filteredBySpecialization.length > 0 ? 'h-80' : 'h-20');
        }
      } else {
        setNameResults([]);
        setSpecializationResults([]);
        setNameResultsHeight('h-20');
        setSpecializationResultsHeight('h-20');
      }
    }, 500),
    [dataDoctors, dataSpecialization, debounce]
  );

  useEffect(() => {
    optimisedVersion(searchTerm);
  }, [searchTerm, optimisedVersion]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleResultClick = () => {
    setSearchTerm('');
    setNameResults([]);
    setSpecializationResults([]);
    setNameResultsHeight('h-20');
    setSpecializationResultsHeight('h-20');
  };

  const goToDoctorProfile = (doctorId,doctor) => {
    handleResultClick();
    Navigate(`/browse/doctor/${doctorId}`);
  };

  const goToSpecializationDoctors = (specializationName) => {
    handleResultClick();
    Navigate(`/browse/specialization/${specializationName}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mt-2 place-content-center flex items-center">
        <input
          type="text"
          placeholder="Search doctors by name, specialization, or address"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className={`mt-4 overflow-y-auto ${nameResultsHeight}`}>
        {nameResults.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-4">Search Results by Name</h2>
            <ul className="divide-y divide-gray-200">
              {nameResults.map((doctor) => (
                <li key={doctor.d_id} className="py-4 cursor-pointer" onClick={() => goToDoctorProfile(doctor.d_id,doctor)}>
                  <div className="place-content-center text-center">
                    <h2 className="text-xl font-semibold">{doctor.d_name}</h2>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {nameResults.length === 0 && searchTerm.trim() !== '' && (
          <p className="text-gray-600 mt-4 text-center">No results found by name</p>
        )}
      </div>

      <div className={`mt-4 overflow-y-auto ${specializationResultsHeight}`}>
        {specializationResults.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mt-4 ">Search Results by Specialization</h2>
            <ul className="divide-y divide-gray-200">
              {specializationResults.map((specialization, index) => (
                <li key={index} className="py-4 cursor-pointer" onClick={() => goToSpecializationDoctors(specialization.s_name)}>
                  <div className="place-content-center text-center">
                    <h2 className="text-xl font-semibold">{specialization.s_name}</h2>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {specializationResults.length === 0 && searchTerm.trim() !== '' && (
          <p className="text-gray-600 mt-4 text-center">No results found by specialization</p>
        )}
      </div>

      <div className="mt-4 place-content-center text-gray-500 flex items-center">
        <span className="mr-2">Fed up of endless wait?</span>
        <a href="https://google.com" className="text-purple-600 flex items-center">
          Look for a clinic with <span className="ml-1 font-bold">Prime</span>
          <svg
            className="h-6 w-6 text-purple-600 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SearchBar;
