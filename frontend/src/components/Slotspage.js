import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { SLOTS_QUERY, VERIFY_PAYMENT, ADD_APPOINTMENT, CREATE_PAYMENT } from '../graphql/doctorsQuery';




const Slotspage = () => {
    //   const { d_id, c_id } = useParams();
    const s_doctor = useSelector((store) => store.store_doctor);
    const s_clinic = useSelector((store) => store.store_clinic);
    const user = useSelector((store) => store.user.user);
    const doctorId = parseInt(s_doctor.store_doctor.d_id);
    const patientId = parseInt(user.p_id);
    const Navigate = useNavigate();
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showPaymentSummary, setShowPaymentSummary] = useState(false);

    const { loadingg, error, data } = useQuery(SLOTS_QUERY, {
        variables: { doctorId, patientId },
    });

    // console.log("final slots", data);
    // console.log("final doctor",doctorId);
    // console.log("final pat",patientId);

    // console.log("final thing",  user);

    const [
        createPayment,
        { data: create_pay_data, loading, error: create_pay_error },
    ] = useMutation(CREATE_PAYMENT);

    const [
        verifypayment,
        { data: verifyData, loading: verifyLoading, error: verifyError },
    ] = useMutation(VERIFY_PAYMENT);
    
    const [
        addAppointment,
        {
            data: appointmentData,
            loading: appointmentLoading,
            error: appointmentError,
        },
    ] = useMutation(ADD_APPOINTMENT);







    // console.log("selected slot is", selectedSlot, typeof (selectedSlot))

    // console.log("doctor name ", s_doctor.store_doctor.d_name)
    // console.log("doctor id ", s_doctor.store_doctor.d_id, typeof (s_doctor.store_doctor.d_id))
    // console.log("doctor fee", s_doctor.store_doctor.d_fee, typeof (parseFloat(s_doctor.store_doctor.d_fee)))

    // console.log("user id ", user.p_id, typeof (user.p_id))

    // console.log("doctor name ", s_doctor.store_doctor.d_id, typeof (s_doctor.store_doctor.d_id))
    // console.log("clinic id ", s_clinic.store_clinic.c_id, typeof (s_clinic.store_clinic.c_id))




    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setShowPaymentSummary(true);
    };




    const handleConfirmPayment = async () => {
        try {
            const { data } = await createPayment({
                variables: { amount: s_doctor.store_doctor.d_fee },
            });
            // console.log("RESPONSE", data.createOrder);
            if (!data.createOrder.success) {
                throw new Error("Error while capturing payment");
            }

            const options = {
                key: "rzp_test_tcw7K00n3n9dSW",
                currency: data.createOrder.currency,
                amount: `${data.createOrder.amount}`,
                order_id: data.createOrder.id,
                name: "Practo",
                description: "Thank you for booking the appointment on Practo",
                prefill: {
                    name: `${user.p_name} `,
                    email: user.p_id,
                },
                handler: function (response) {
                    verifyPayment({ ...response });
                },
            };
            const paymentObject = new window.Razorpay(options);
            console.log("payment", paymentObject);

            paymentObject.open();
            paymentObject.on("payment.failed", function (response) {
                alert("Oops! Payment Failed.");
                console.log(response.error);
            });
        } catch (error) {
            console.log("ERROR WHILE MAKING PAYMENT", error);
        }
    };

    const verifyPayment = async (response) => {
        try {
            //   console.log("response: ", response);

            const { data } = await verifypayment({
                variables: {
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                },
            });

            // console.log("DATA FROM VERIFY PAYMENT: ", data);
            if (!data?.verifyPayment.success) {
                throw new Error(data);
            }

            const appointmentdata = await addAppointment({
                variables: {
                    docId: s_doctor.store_doctor.d_id,
                    clinicId: s_clinic.store_clinic.c_id,
                    patId: user.p_id,
                    startTime: parseInt(selectedSlot),
                },
            });


            alert("Payment successful");
            // now we have to insert this entry into appointment table


            console.log("Appointment", appointmentdata);
            if (appointmentData?.data?.addAppointment?.success) {
                alert("Your appointment booked successfully");
            }
            Navigate("/appointments");
        } catch (error) {
            console.log("Error while calling verify payment API: ", error);
            alert("Could not verify payment");
        }
    };



    return (
        <div>
            <Header />
            <div className="max-w-md mx-auto mt-9 bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Pick a time slot</h1>
                <div className="border-b mb-4">
                    <h2 className="text-lg font-semibold">{s_clinic.store_clinic.c_name}</h2>
                    <p>{s_clinic.store_clinic.c_address}</p>
                    <p className="text-blue-600">Rs. {s_doctor.store_doctor.d_fee}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {loading ? (
                        <p>Loading slots...</p>
                    ) : error ? (
                        <p>Error loading slots</p>
                    ) : data && data.availableSlots.length > 0 ? (
                        data.availableSlots.map((slot) => (
                            <button
                                key={slot}
                                className={`text-blue-600 border p-2 rounded-md hover:bg-blue-100 focus:outline-none ${selectedSlot === slot ? 'bg-blue-100' : ''
                                    }`}
                                onClick={() => handleSlotClick(slot)}
                            >
                                {slot}
                            </button>
                        ))
                    ) : (
                        <p>No slots available</p>
                    )}
                </div>

                {showPaymentSummary && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>
                        <p>
                            <span className="font-semibold">Doctor:</span> {s_doctor.store_doctor.d_name}
                        </p>
                        <p>
                            <span className="font-semibold">Clinic:</span> {s_clinic.store_clinic.c_name}
                        </p>
                        <p>
                            <span className="font-semibold">Address:</span> {s_clinic.store_clinic.c_address}
                        </p>
                        <p>
                            <span className="font-semibold">Selected Slot:</span> {selectedSlot}
                        </p>
                        <button
                            onClick={handleConfirmPayment}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Confirm Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Slotspage;
