import React from 'react';
import Header from './Header';
import SearchBar from './Search';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import ClinicInfo from './ClinicInfo';


const Doctorprofile = () => {

  const { id } = useParams();

  const DOCTOR_QUERY = gql`
    query Doctor($doctorId: Int!) {
      doctor(id: $doctorId) {
        d_id
        d_name
        d_mob
        d_exp
        d_fee
        d_img
        clinicmap {
          c_id
          c_name
          c_address
        }
        specializations {
          s_name
        }
      }
    }
  `;


  const { loading, error, data } = useQuery(DOCTOR_QUERY, {
    variables: { doctorId: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const doctor = data.doctor;
  console.log(doctor)
// console.log(doctor.specializations[0].s_name)


  return (
    <div>
      <Header />
      <SearchBar />
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
              alt="Doctor"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{doctor.d_name}</h2>
              {/* <p className="text-gray-600">{doctor.specializations[0]?.s_name}</p> */}
              <p className="text-gray-600">{doctor.d_exp}</p>
              <p className="text-green-600">Medical Registration Verified</p>
            </div>
          </div>
          <div className="mt-4">
            {/* <p className="text-gray-800">{doctor.d_name} is an {doctor.specializations[0]?.s_name} specializing in Medicine with experience of {doctor.d_exp} years</p> */}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Info</h3>
          <div className="mt-4 space-y-4">
            {doctor.clinicmap.map((clinic) => (
              <ClinicInfo
                doctor={doctor}
                clinicwhole= {clinic}
                value={(clinic.c_id)}
                location={clinic.c_address}
                clinic={clinic.c_name}
                rating="4.5" 
                time="Mon - Fri 04:30 PM - 06:00 PM"
                fee={doctor.d_fee}
                images={['image1-url', 'image2-url', 'image3-url']} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



export default Doctorprofile;
