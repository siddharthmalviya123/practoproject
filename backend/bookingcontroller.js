// import Stripe from "stripe";


// const stripe= new Stripe(process.env)

// const session = await stripe.checkout.sessions.create({
//     payment_method_types:["card"],
//     mode :"payment",
//     success_url:"http://localhost:4000/appointments",
//     cancel_url: "http://localhost:4000/",
//     customer_email :"",
//     client_reference_id:d_id,
//     line_items:[
//         {
//             price_data:{ 
//                 currency: "usd",
//                 unit_amount:d_fee,
//                 product_data:{
//                     name :d_name,
//                     description:"your appointment is booked ",
//                     images :d_img,

//                 }
//             },
//             quantity:1
//         }
//     ]

// })

// //create a entry in doctor_patient_map with d_id,p_id,c_id,slot,
// //in sql server
// const booking =new Booking({
//     doctor.doctor._id,
//     user:user._id,
//     ticketPrice:doctor.ticketPrice,
//     session:session.id

// })

// await booking.save();
