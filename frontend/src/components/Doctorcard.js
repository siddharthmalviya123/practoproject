import React from 'react';
import { useNavigate } from 'react-router-dom';

const Doctorcard = ({ doctor }) => {

const Navigate= useNavigate();

    const handleClick=()=>{
        Navigate(`/browse/doctor/${doctor.d_id}`);
    }

    
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={doctor.image || 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg'}
          alt={doctor.d_name || 'Doctor Name'}
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{doctor.d_name}</h2>
          <p className="text-gray-600">{doctor.specialization}</p>
          <p className="text-gray-600">{doctor.experience} experience overall</p>
          <p className="text-gray-600">{doctor.location}</p>
          <p className="text-gray-600">{doctor.hospital}</p>
          <p className="text-gray-600">₹{doctor.fee} Consultation fee at clinic</p>
          <div className="flex items-center mt-2">
            <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full text-xs font-semibold">{doctor.rating}%</span>
            <span className="ml-2 text-blue-500 text-xs font-semibold">{doctor.patientStories} Patient Stories</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-green-500 mb-2">Available Today</span>
        <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">Book Clinic Visit</button>
      </div>
    </div>
  );
};

export default Doctorcard;
