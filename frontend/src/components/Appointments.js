import React, { useEffect } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { gql, useQuery, useMutation } from '@apollo/client';
import { APPOINTMENT_QUERY, CANCEL_APPOINTMENT_MUTATION } from '../graphql/doctorsQuery';

const Appointments = () => {
  
  const user = useSelector((store) => store.user.user);
  const { loading, error, data,refetch} = useQuery(APPOINTMENT_QUERY, {
    variables: { patientId: parseInt(user.p_id) },
  });

  useEffect(()=>{
refetch();
  },[])

  
  const [cancelAppointment] = useMutation(CANCEL_APPOINTMENT_MUTATION);

  const handleCancelAppointment = async (appointmentid,doctorname,slottime) => {
    try {
      const response = await cancelAppointment({
        variables: { appointmentid},
      });

      console.log("dpid", appointmentid,typeof(appointmentid))
      console.log("response is ", response)
      // Assuming successful cancellation triggers a refetch of appointments
      if (response.data.cancelappointments) {
        alert(`your appointment with ${doctorname} at ${slottime} is now cancelled` )
        refetch(); // Refetch appointments after cancellation
      } else {
        console.error('Cancellation failed:', response.data.cancelappointments.message);
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const appointments = data?.patient?.appointments || [];
  console.log("appointments is",appointments)


  return (
    <div>
      <Header />
      {user && (
        <div className="bg-white w-[60%] mx-auto rounded-lg shadow-md p-4">
          <h2 className="text-2xl text-center font-semibold mb-9">{user.p_name}'s Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments found</p>
          ) : (
            <div>
              {appointments.map((appointment, index) => {
                const {
                  dp_id,
                  slot,
                  c_name,
                  c_address,
                  d_name,
                  d_mob,
                  d_fee,
                  d_exp,
                  d_img,
                 
                } = JSON.parse(appointment);

                return (
                  <div key={index} className="mb-6 border border-grey-600 rounded-3xl">
                    <div className="flex justify-between mt-6 mb-6 ml-6  items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Clinic name : {c_name}</h3>
                        <p className="text-gray-600">Clinic address: {c_address}</p>
                        <p>Slot: {slot}:00 </p>
                      </div>
                      <div className="mr-8">
                        <img src={d_img} alt={d_name} className="w-28 h-28 object-cover rounded-full" />
                      </div>
                    </div>
                    <div className="mt-2 mb-6 ml-3">
                      <p className="text-gray-600">Doctor: {d_name}</p>
                      <p className="text-gray-600">Mobile: {d_mob}</p>
                      <p className="text-gray-600">Fee: Rs. {d_fee}</p>
                      <p className="text-gray-600">Experience: {d_exp} years</p>
                      <button
                        onClick={() => handleCancelAppointment(dp_id,d_name,slot)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-2 rounded-lg"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Appointments;
