import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchBar from './Search'; // Assuming this is the correct path
import Doctorlist from './Doctorlist'; // Corrected import name
import { useParams } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

const Searchpage = () => {
  const { s_name } = useParams();
  console.log(s_name);

  const specializationQuery = gql`
    query DoctorBySpecialities($speciality: String!) {
      doctorBySpecialities(speciality: $speciality) {
        d_exp
        d_fee
        d_id
        d_name
        d_mob
        d_img
        specializations {
          s_name
        }
        clinicmap {
          c_name
          c_address
        }
        appointments {
          slot
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(specializationQuery, { variables: { speciality: s_name } });

  console.log(data);
  const [page, setPage] = useState(1);
  const [doctorsList, setDoctorsList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (!loading && data && data.doctorBySpecialities) {
      setDoctorsList(data.doctorBySpecialities.slice(0, 10));
    }
  }, [loading, data]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loadingMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1 && !loading && data && data.doctorBySpecialities) {
      setLoadingMore(true);
      setTimeout(() => {
        const newDoctors = data.doctorBySpecialities.slice((page - 1) * 10, page * 10);
        setDoctorsList((prevList) => [...prevList, ...newDoctors]);
        setLoadingMore(false);
      }, 1000);
    }
  }, [page, loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <SearchBar />

      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Doctors List</h2>

        <Doctorlist doctors={doctorsList} />

        {loadingMore && <p className="text-gray-600 mt-4 text-center">Loading more...</p>}
      </div>
    </div>
  );
};

export default Searchpage;
