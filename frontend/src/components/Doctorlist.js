import React from 'react';
import Doctorcard from './Doctorcard';
const Doctorlist = ({ doctors }) => {
  return (
    <div>
      {doctors.map((doctor) => (
        <Doctorcard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};
export default Doctorlist;