import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDoctor } from '../redux/doctorSlice';
import { setClinic } from '../redux/clinicSlice';
import { useNavigate } from 'react-router-dom'

const ClinicInfo = ({ doctor, clinicwhole, value, key, location, clinic, rating, time, fee, images }) => {

    const Navigate = useNavigate();
    console.log(key);
    const dispatch = useDispatch();
    const doc_id = doctor.d_id;
    const cl_id = value;

    const user = useSelector((store) => store.user);

    const handleClick = () => {
        if (!user.user) {
            alert("first login userself")
            Navigate('/login')
        }
        else {
            console.log(key);
            console.log(typeof (key))
            console.log("doctor is a ", doctor);
            console.log("clinic is a", clinicwhole)
            dispatch(setDoctor(doctor));
            dispatch(setClinic(clinicwhole));
            Navigate(`/${doc_id.toString()}/${cl_id.toString()}`)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="text-lg font-semibold">{clinic}</h4>
                    <p className="text-gray-600">{location}</p>
                    <p className="text-gray-600">{time}</p>
                    <p className="text-gray-600">{fee}</p>
                </div>
                <div className="text-yellow-500 font-bold">{rating} ★</div>
            </div>
            <div className="mt-4 flex space-x-2">
                {images.map((src, index) => (
                    <img key={index} src={src} alt="Clinic" className="w-16 h-16 object-cover rounded" />
                ))}
            </div>
            <button onClick={handleClick} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Book Appointment
            </button>
        </div>
    )
}

export default ClinicInfo
