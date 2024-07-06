import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { doctorsData, specialization_query } from '../graphql/doctorsQuery';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [nameResults, setNameResults] = useState([]);
    const [specializationResults, setSpecializationResults] = useState([]);
    const [nameResultsHeight, setNameResultsHeight] = useState('h-20');
    const [specializationResultsHeight, setSpecializationResultsHeight] = useState('h-20');
    const Navigate = useNavigate();

    const {
        loading: doctor_loading,
        error: doctor_error,
        data: doctorData,
    } = useQuery(doctorsData, {
        variables: { name: searchTerm },
    });

    const {
        loading: specialization_loading,
        error: specialization_error,
        data: specialization_data,
    } = useQuery(specialization_query, {
        variables: { name: searchTerm },
    });

    useEffect(() => {
        if (doctorData && doctorData.doctorByName) {
            setNameResults(doctorData.doctorByName);
            setNameResultsHeight(doctorData.doctorByName.length > 0 ? 'h-80' : 'h-20');
        } else {
            setNameResults([]);
            setNameResultsHeight('h-20');
        }
    }, [doctorData]);

    useEffect(() => {
        if (specialization_data && specialization_data.specialities) {
            setSpecializationResults(specialization_data.specialities);
            setSpecializationResultsHeight(specialization_data.specialities.length > 0 ? 'h-80' : 'h-20');
        } else {
            setSpecializationResults([]);
            setSpecializationResultsHeight('h-20');
        }
    }, [specialization_data]);

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

    const goToDoctorProfile = (doctorId, doctor) => {
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
                                <li key={doctor.d_id} className="py-4 cursor-pointer" onClick={() => goToDoctorProfile(doctor.d_id, doctor)}>
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
                        <h2 className="text-xl font-semibold mt-4">Search Results by Specialization</h2>
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
