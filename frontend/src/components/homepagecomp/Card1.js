// Cards.js
import React from 'react';

const Card1 = () => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-10">
      <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:border hover:border grey-800">
        <img className="w-full h-56" src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg" alt="Instant Video Consultation" />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">Instant Video Consultation</h2>
          <p className="mt-2 text-gray-600">Connect within 60 secs</p>
        </div>
      </div>

      <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:border hover:border grey-800">
        <img className="w-full h-56" src="https://www.stockvault.net/data/2015/09/01/177580/preview16.jpg" alt="Find Doctors Near You" />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">Find Doctors Near You</h2>
          <p className="mt-2 text-gray-600">Confirmed appointments</p>
        </div>
      </div>

      <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:border hover:border grey-800">
        <img className="w-full h-56" src="https://img.freepik.com/premium-photo/medical-concept-indian-beautiful-female-doctor-white-coat-with-stethoscope-waist-up-medical-student-woman-hospital-worker-looking-camera-smiling-studio-blue-background_185696-621.jpg" alt="Surgeries" />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">Surgeries</h2>
          <p className="mt-2 text-gray-600">Safe and trusted surgery centers</p>
        </div>
      </div>
    </div>
  );
};

export default Card1;
