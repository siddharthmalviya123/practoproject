export const typeDefs = `#graphql
type Query {
  doctors: [Doctor]
  doctor(id: Int!): Doctor
  clinics: [Clinic]
  clinic(id: Int!): Clinic
  patients: [Patient]
  patient(id: Int!): Patient
  payments: [Payment]
  payment(id: Int!): Payment
  specializations: [Specialization]
  specialization(id: Int!): Specialization
  doctorClinicMaps: [DoctorClinicMap]
  doctorPatientMaps: [DoctorPatientMap]
  doctorSpecializationMaps: [DoctorSpecializationMap]
  doctorBySpecialities(speciality: String!, limit: Int, offset: Int) :[Doctor]
  availableSlots(doctorId: Int!, patientId:Int!): [String]
}


type Mutation {
  addDoctor(input: DoctorInput): Doctor
  addClinic(input: ClinicInput): Clinic
  addPatient(name:String, email:String! , password:String!, conformpassword:String! mobile:String!): Patient
  addPayment(input: PaymentInput): Payment
  addSpecialization(input: SpecializationInput): Specialization
  addDoctorClinicMap(input: DoctorClinicMapInput): DoctorClinicMap
  addDoctorPatientMap(input: DoctorPatientMapInput): DoctorPatientMap
  addDoctorSpecializationMap(input: DoctorSpecializationMapInput): DoctorSpecializationMap
  login(email: String!, password: String!): AuthPayload
  createStripeCheckoutSession(d_id: Int!, d_name: String!, d_fee: Float!, d_img: String, p_id: Int!, c_id: Int!, slot: Int!): String
  createOrder(amount: Int): Order
  verifyPayment(razorpay_order_id: String!, razorpay_payment_id: String!, razorpay_signature: String!): PaymentVerificationResponse
    addAppointment(doc_id:ID!,pat_id:ID!,clinic_id:ID!,start_time:Int!): Appointment
}


type AuthPayload {
  token: String
  patient: Patient
}

   type Order {
    id: String
    currency: String
    amount: Int
    receipt: String
    status: String
    success:Boolean
  }
     type PaymentVerificationResponse{
    success: Boolean
    message: String

  }
  type Appointment{
    id:ID!
    doc_id:ID!
    pat_id:ID!
    clinic_id:ID!
    start_time:Int!
    success:Boolean
    doctor:Doctor
  }

type Doctor {
  d_id: Int
  d_name: String
  d_mob: String
  d_fee: Float
  d_exp: Int
  d_img: String
  clinicmap: [Clinic]  
  specializations: [Specialization]
  appointments: [DoctorPatientMap]
}

 
input DoctorInput {
  d_name: String
  d_mob: String
  d_fee: Float
  d_exp: Int
  d_img: String
}

type Clinic {
  c_id: Int
  c_name: String
  c_address: String
  doctors: [Doctor]
}

input ClinicInput {
  c_name: String
  c_address: String
}

type Patient {
  p_id: Int
  p_name: String
  p_mob: String
  p_username: String
  p_pass: String
  appointments: [String]
}



type Payment {
  pay_id: Int
  dp_id: Int
  status: Boolean
  appointment: DoctorPatientMap
}

input PaymentInput {
  dp_id: Int
  status: Boolean
}

type Specialization {
  s_id: Int
  s_name: String
  doctors: [Doctor]
}

input SpecializationInput {
  s_name: String
}

type DoctorClinicMap {
  dc_id: Int
  d_id: Int
  c_id: Int
  doctor: Doctor
  clinic: Clinic
}

input DoctorClinicMapInput {
  d_id: Int
  c_id: Int
}

type DoctorPatientMap {
  dp_id: Int
  d_id: Int
  c_id: Int
  p_id: Int
  slot: Int
  doctor: Doctor
  clinic: Clinic
  patient: Patient
  payment: Payment
}

input DoctorPatientMapInput {
  d_id: Int
  c_id: Int
  p_id: Int
  slot: String
}

type DoctorSpecializationMap {
  ds_id: Int
  d_id: Int
  s_id: Int
  doctor: Doctor
  specialization: Specialization
}

input DoctorSpecializationMapInput {
  d_id: Int
  s_id: Int
}

`
