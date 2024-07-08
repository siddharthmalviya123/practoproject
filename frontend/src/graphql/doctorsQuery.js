import { gql } from '@apollo/client';

export const SLOTS_QUERY = gql`
query Query($doctorId: Int!, $patientId: Int!) {
  availableSlots(doctorId: $doctorId, patientId: $patientId)
}
`;

export const CREATE_STRIPE_CHECKOUT_SESSION = gql`
mutation CreateStripeCheckoutSession($dId: Int!, $dName: String!, $dFee: Float!, $pId: Int!, $cId: Int!, $slot: Int!) {
  createStripeCheckoutSession(d_id: $dId, d_name: $dName, d_fee: $dFee, p_id: $pId, c_id: $cId, slot: $slot)
}
`;


export const VERIFY_PAYMENT = gql`
  mutation VerifyPayment(
    $razorpayOrderId: String!
    $razorpayPaymentId: String!
    $razorpaySignature: String!
  ) {
    verifyPayment(
      razorpay_order_id: $razorpayOrderId
      razorpay_payment_id: $razorpayPaymentId
      razorpay_signature: $razorpaySignature
    ) {
      success
      message
    }
  }
`;
export const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $docId: ID!
    $patId: ID!
    $clinicId: ID!
    $startTime: Int!
  ) {
    addAppointment(
      doc_id: $docId
      pat_id: $patId
      clinic_id: $clinicId
      start_time: $startTime
    ) {
      id
      success
    }
  }
`;
export const CREATE_PAYMENT = gql`
  mutation CreateOrder($amount: Int) {
    createOrder(amount: $amount) {
      id
      currency
      amount
      receipt
      status
      success
    }
  }
`;

export const DOCTORS_QUERY = gql`
query Doctor($doctorId: Int!) {
  doctor(id: $doctorId) {
    d_id
  }
}
`;

export const specializationQuery = gql`
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

export const APPOINTMENT_QUERY = gql`
query Patient($patientId: Int!) {
    patient(id: $patientId) {
      p_name
      appointments
      
    }
  }`;


export const doctorsData = gql`
  query DoctorByName($name: String!) {
    doctorByName(name: $name) {
      d_name
      d_id
    }
  }
`;
export const specialization_query = gql`
  query Specialities($name: String!) {
    specialities(name: $name) {
      s_name
    }
  }
`;


export const searchBySpecialityPage= gql`mutation DoctorBySpecialitiesPage($name: String!, $limit: Int!, $offset: Int!) {
    doctorBySpecialitiesPage(name: $name, limit: $limit, offset: $offset) {
      d_id
      d_name
      d_mob
      d_fee
      d_exp
      d_img
     
    }
  }`;
  export const CANCEL_APPOINTMENT_MUTATION = gql`
 mutation Cancelappointments($appointmentid: Int!) {
  cancelappointments(appointmentid: $appointmentid)
}
`;