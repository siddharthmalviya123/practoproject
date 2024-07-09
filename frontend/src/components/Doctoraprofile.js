import React, { useState } from 'react';
import Header from './Header';
import SearchBar from './Search';
import { useParams } from 'react-router-dom';
import { useQuery, gql, useMutation } from "@apollo/client";
import ClinicInfo from './ClinicInfo';
import { REVIEW_ADD } from '../graphql/doctorsQuery';
import { useSelector } from 'react-redux';

const Doctorprofile = () => {

  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const user = useSelector((store)=>store.user.user);
  // console.log("user for doc profile is",user)
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
          reviews {
          dr_id,
      rating,
      review,
    }
      }
    }
  `;


  const [addreviewquery] = useMutation(REVIEW_ADD);

 

  const { loading, error, data , refetch} = useQuery(DOCTOR_QUERY, {
    variables: { doctorId: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const doctor = data.doctor;
  console.log("the doctor is ",doctor)
  // console.log(doctor.specializations[0].s_name)
  const handleAddReview= async ()=>{
    try {
      const response = await addreviewquery({
        variables: { dId:parseInt(id),
              pId:user.p_id,
              rating:parseInt(rating),
              review: comment
        },
      });
    if(response.data.addreview)
      {
        refetch();
      }

    }
    catch (err) {
      console.error('Error cancelling appointment:', err);
    }
  }

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
                clinicwhole={clinic}
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
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Reviews</h3>
          <div className="mt-4 space-y-4">
            {/* Display reviews here */}
            {doctor?.reviews?.map((review) => (
              <div key={review.dr_id} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Comment :- {review.review}</p>
                <p className="text-gray-400 text-sm">Rating out of 10 :-{review.rating} star</p>
              </div>
            ))}
          </div>

          {/* Add review button */}
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowReviewForm(true)}
          >
            Add Review
          </button>

          {/* Review form/modal */}
          {showReviewForm && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Add Your Review</h4>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 mt-1 w-full"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="3"
                  className="border border-gray-300 rounded-md p-2 mt-1 w-full"
                />
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddReview}
                >
                  Submit Review
                </button>
                <button
                  className="ml-2 text-gray-600 hover:underline"
                onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default Doctorprofile;
