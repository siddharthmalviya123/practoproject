
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27', // Ensure to use the latest Stripe API version
});

const resolvers = {
    Query: {
        doctors: async (_, __, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM doctors');
                return rows;
            } catch (err) {
                throw new Error(`Failed to fetch doctors: ${err.message}`);
            }
        },
        doctor: async (_, { id }, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM doctors WHERE d_id = ?', [id]);
                if (rows.length > 0) {
                    return rows[0];
                }
                throw new Error(`Doctor with ID ${id} not found`);
            } catch (err) {
                throw new Error(`Failed to fetch doctor with ID ${id}: ${err.message}`);
            }
        },
        clinics: async (_, __, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM clinics');
                return rows;
            } catch (err) {
                throw new Error(`Failed to fetch clinics: ${err.message}`);
            }
        },
        clinic: async (_, { id }, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM clinics WHERE c_id = ?', [id]);
                if (rows.length > 0) {
                    return rows[0];
                }
                throw new Error(`Clinic with ID ${id} not found`);
            } catch (err) {
                throw new Error(`Failed to fetch clinic with ID ${id}: ${err.message}`);
            }
        },
        patients: async (_, __, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM patients');
                return rows;
            } catch (err) {
                throw new Error(`Failed to fetch patients: ${err.message}`);
            }
        },
        patient: async (_, { id }, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM patients WHERE p_id = ?', [id]);
                if (rows.length > 0) {
                    return rows[0];
                }
                throw new Error(`Patient with ID ${id} not found`);
            } catch (err) {
                throw new Error(`Failed to fetch patient with ID ${id}: ${err.message}`);
            }
        },
        specializations: async (_, __, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM specializations');
                return rows;
            } catch (err) {
                throw new Error(`Failed to fetch specializations: ${err.message}`);
            }
        },
        specialization: async (_, { id }, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM specializations WHERE s_id = ?', [id]);
                if (rows.length > 0) {
                    return rows[0];
                }
                throw new Error(`Specialization with ID ${id} not found`);
            } catch (err) {
                throw new Error(`Failed to fetch specialization with ID ${id}: ${err.message}`);
            }
        },
        doctorClinicMaps: async (_, __, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM doctor_clinic_map');
                return rows;
            } catch (err) {
                throw new Error(`Failed to fetch doctorClinicMaps: ${err.message}`);
            }
        },
        doctorPatientMaps: async (_, __, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM doctor_patient_map');
                return rows;
            } catch (err) {
                throw new Error(`Failed to fetch doctorPatientMaps: ${err.message}`);
            }
        },
        doctorSpecializationMaps: async (_, __, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM doctor_specialization_map');
                return rows;
            } catch (err) {
                throw new Error(`Failed to fetch doctorSpecializationMaps: ${err.message}`);
            }
        },
        payments: async (_, __, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM payments');
                return rows;
            } catch (err) {
                throw new Error(`Failed to fetch payments: ${err.message}`);
            }
        },
        payment: async (_, { id }, { pool }) => {
            try {
                const [rows] = await pool.query('SELECT * FROM payments WHERE pay_id = ?', [id]);
                if (rows.length > 0) {
                    return rows[0];
                }
                throw new Error(`Payment with ID ${id} not found`);
            } catch (err) {
                throw new Error(`Failed to fetch payment with ID ${id}: ${err.message}`);
            }
        },
        doctorBySpecialities: async (
            _,
            { speciality, limit, offset },
            { pool }
        ) => {
            const [rows] = await pool.query(
                `SELECT d.d_id,d.d_name,d.d_fee,d.d_exp,d.d_img, d.d_mob
                                               FROM doctors d
                                               JOIN doctor_specialization_map ds ON d.d_id = ds.d_id
                                               JOIN specializations s ON ds.s_id = s.s_id
                                               WHERE s.s_name LIKE ?
                                               ;`,
                [`%${speciality}%`]
            );
            // console.log("Rows", rows);
            return rows;
        },
        availableSlots: async (_, { doctorId, patientId }, { pool }) => {
            try {
                const [slotsQuery] = await pool.query(`
               SELECT time
                FROM slots
                WHERE time NOT IN (
                    SELECT LPAD(CONCAT(slot, ':00'), 5, '0')
                    FROM doctor_patient_map
                    WHERE d_id = ? OR p_id = ?
                )

              `, [doctorId, patientId]);

                //   console.log("result",slotsQuery)
                // Extract slots from the query result rows and map them to strings
                const availableSlots = slotsQuery.map(row => row.time);
                //   console.log(availableSlots);

                return availableSlots;
            } catch (error) {
                console.error('Error fetching available slots:', error);
                throw error; // Throw the error to handle it at the GraphQL layer
            }
        }


    },
    Mutation: {
        createOrder: async (_, { amount }, { pool }) => {
            var options = {
              amount: amount * 100,
              currency: "INR",
              receipt: Math.random(Date.now()).toString(),
            };
      
            try {
              const instance = new Razorpay({
                key_id: "rzp_test_tcw7K00n3n9dSW",
                key_secret: "bE1S2UzGKWtlBoRT1HbMsp80",
              });
      
              const paymentResponse = await instance.orders.create(options);
              console.log("instance", paymentResponse);
              return {
                id: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
                receipt: paymentResponse.receipt,
                status: paymentResponse.status,
                success: true,
              };
            } catch (error) {
              throw new Error(error);
            }
          },
          verifyPayment: async (
            _,
            { razorpay_order_id, razorpay_payment_id, razorpay_signature }
          ) => {
            const body = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSignature = crypto
              .createHmac("sha256", "bE1S2UzGKWtlBoRT1HbMsp80")
              .update(body.toString())
              .digest("hex");
      
            if (expectedSignature === razorpay_signature) {
              // Add your business logic here (e.g., enroll student, update database, etc.)
              return { success: true, message: "Payment Verified" };
            }
      
            return { success: false, message: "Payment Failed" };
          },
        createStripeCheckoutSession: async (_, { d_id, d_name, d_fee, d_img, p_id, c_id, slot }) => {
            try {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    success_url: 'http://localhost:3000/appointments',
                    cancel_url: 'http://localhost:3000/',
                    customer_email: '', // Provide customer's email here
                    client_reference_id: d_id.toString(), // Convert to string
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                unit_amount: d_fee * 100, // Amount in cents
                                product_data: {
                                    name: d_name,
                                    description: 'Your appointment is booked',
                                    images: [d_img],
                                },
                            },
                            quantity: 1,
                        },
                    ],
                });

                // Save session ID or any relevant details to database (doctor_patient_map in your case)
                const query = `
                INSERT INTO doctor_patient_map (d_id, p_id, c_id, slot)
                VALUES ($1, $2, $3, $4)
              `;
                const values = [d_id, p_id, c_id, slot];
                await pool.query(query, values);

                return session.id;
            } 
            catch (err) 
            {
                console.error('Error creating checkout session:', err.message);
                throw new Error(err.message);
            }
        },
    addDoctor: async (_, { input }, { pool }) => {
        const { d_name, d_mob, d_fee, d_exp, d_img } = input;
        const query = 'INSERT INTO doctors (d_name, d_mob, d_fee, d_exp, d_img) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [d_name, d_mob, d_fee, d_exp, d_img]);
        const [rows] = await pool.query('SELECT * FROM doctors WHERE d_id = ?', [result.insertId]);
        return rows.length > 0 ? rows[0] : null;
    },
    addClinic: async (_, { input }, { pool }) => {
        const { c_name, c_address } = input;
        const query = 'INSERT INTO clinics (c_name, c_address) VALUES (?, ?)';
        const [result] = await pool.query(query, [c_name, c_address]);
        const [rows] = await pool.query('SELECT * FROM clinics WHERE c_id = ?', [result.insertId]);
        return rows.length > 0 ? rows[0] : null;
    },
    addPatient: async (_, { name, email, password, conformpassword, mobile }, { pool }) => {
        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailRegex)) {
            throw new Error("Email is not valid");
        }

        // Validate password match
        if (password !== conformpassword) {
            throw new Error("Passwords do not match");
        }

        try {
            // Hash the password
            const hashedPassword = await bcryptjs.hash(password, 10);

            // Check if user already exists
            const [existingUser] = await pool.query(
                `SELECT p_username FROM patients WHERE p_username = ?`,
                [email]
            );

            if (existingUser.length > 0) {
                throw new Error("User already exists");
            }

            // Insert new user into the database
            const [addedUser] = await pool.query(
                `INSERT INTO patients (p_name, p_username, p_pass, p_mob) VALUES (?, ?, ?, ?)`,
                [name, email, hashedPassword, mobile]
            );

            // Return the newly added user
            return {
                p_id: addedUser.insertId,
                p_name: name,
                p_username: email,
                p_mob: mobile
            };
        } catch (error) {
            // Handle any database errors
            console.error("Error adding patient:", error);
            throw new Error("Failed to add patient. Please try again later.");
        }
    },
    login: async (_, { email, password }, { pool }) => {
        try {
            // Check if patient exists
            const [patientResult] = await pool.query(
                `SELECT * FROM patients WHERE p_username = ?`,
                [email]
            );

            if (patientResult.length === 0) {
                throw new Error("Patient not found");
            }

            const patient = patientResult[0];

            // Verify password
            const passwordMatch = await bcryptjs.compare(password, patient.p_pass);

            if (!passwordMatch) {
                throw new Error("Incorrect password");
            }
            const token = jwt.sign(
                { patientId: patient.p_id, email: patient.p_username },
                "siddharth",
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            return {
                token,
                patient: {
                    p_id: patient.p_id,
                    p_name: patient.p_name,
                    p_username: patient.p_username,
                    p_mob: patient.p_mob,
                }
            };

        } catch (error) {
            console.error("Error logging in:", error);
            throw new Error("Invalid credentials");
        }
    },
    addPayment: async (_, { input }, { pool }) => {
        const { dp_id, status } = input;
        const query = 'INSERT INTO payments (dp_id, status) VALUES (?, ?)';
        const [result] = await pool.query(query, [dp_id, status]);
        const [rows] = await pool.query('SELECT * FROM payments WHERE pay_id = ?', [result.insertId]);
        return rows.length > 0 ? rows[0] : null;
    },
    addSpecialization: async (_, { input }, { pool }) => {
        const { s_name } = input;
        const query = 'INSERT INTO specializations (s_name) VALUES (?)';
        const [result] = await pool.query(query, [s_name]);
        const [rows] = await pool.query('SELECT * FROM specializations WHERE s_id = ?', [result.insertId]);
        return rows.length > 0 ? rows[0] : null;
    },
    addDoctorClinicMap: async (_, { input }, { pool }) => {
        const { d_id, c_id } = input;
        const query = 'INSERT INTO doctor_clinic_map (d_id, c_id) VALUES (?, ?)';
        const [result] = await pool.query(query, [d_id, c_id]);
        const [rows] = await pool.query('SELECT * FROM doctor_clinic_map WHERE dc_id = ?', [result.insertId]);
        return rows.length > 0 ? rows[0] : null;
    },
    addDoctorPatientMap: async (_, { input }, { pool }) => {
        const { d_id, c_id, p_id, slot } = input;
        const query = 'INSERT INTO doctor_patient_map (d_id, c_id, p_id, slot) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [d_id, c_id, p_id, slot]);
        const [rows] = await pool.query('SELECT * FROM doctor_patient_map WHERE dp_id = ?', [result.insertId]);
        return rows.length > 0 ? rows[0] : null;
    },
    addDoctorSpecializationMap: async (_, { input }, { pool }) => {
        const { d_id, s_id } = input;
        const query = 'INSERT INTO doctor_specialization_map (d_id, s_id) VALUES (?, ?)';
        const [result] = await pool.query(query, [d_id, s_id]);
        const [rows] = await pool.query('SELECT * FROM doctor_specialization_map WHERE ds_id = ?', [result.insertId]);
        return rows.length > 0 ? rows[0] : null;
    },
    addAppointment: async (
        _,
        { doc_id, pat_id, clinic_id, start_time },
        { pool }
      ) => {
        // const [existingAppointment] = await pool.query(
        //   `SELECT * FROM doc_pat_mapping WHERE doc_id=? AND clinic_id=? AND slot_start_time=?`,
        //   [doc_id, clinic_id, start_time]
        // );
        // if (existingAppointment.length > 0) {
        //   throw new Error("Slot is already booked by other patient");
        // }
  
        const [addedAppointment] = await pool.query(
          `INSERT INTO doctor_patient_map (d_id,p_id,c_id, slot) VALUES (?, ?, ?,?);`,
          [doc_id, pat_id, clinic_id, start_time]
        );
        return {
          id: addedAppointment.insertId,
          doc_id: doc_id,
          pat_id: pat_id,
          clinic_id: clinic_id,
          start_time: start_time,
          success: true,
        };
      },
  
},
    Doctor: {
        clinicmap: async (parent, _, { pool }) => {
            const query = 'SELECT * FROM clinics WHERE c_id IN (SELECT c_id FROM doctor_clinic_map WHERE d_id = ?)';
const [rows] = await pool.query(query, [parent.d_id]);
return rows;
        },
specializations: async (parent, _, { pool }) => {
    const query = 'SELECT * FROM specializations WHERE s_id IN (SELECT s_id FROM doctor_specialization_map WHERE d_id = ?)';
    const [rows] = await pool.query(query, [parent.d_id]);
    return rows;
},
    appointments: async (parent, _, { pool }) => {
        const query = 'SELECT * FROM doctor_patient_map WHERE d_id = ?';
        const [rows] = await pool.query(query, [parent.d_id]);
        return rows;
    }
    },
Clinic: {
    doctors: async (parent, _, { pool }) => {
        const query = 'SELECT * FROM doctors WHERE d_id IN (SELECT d_id FROM doctor_clinic_map WHERE c_id = ?)';
        const [rows] = await pool.query(query, [parent.c_id]);
        return rows;
    },
    },
Patient: {
    appointments: async (parent, _, { pool }) => {
        const query = `SELECT *
                            FROM doctor_patient_map dpm
                            JOIN clinics ON dpm.c_id = clinics.c_id
                            JOIN doctors ON dpm.d_id = doctors.d_id
                            WHERE dpm.p_id = ?
                            `;
        const [rows] = await pool.query(query, [parent.p_id]);
        console.log(rows)
        return rows.map((row) => JSON.stringify(row));
    },
    },
Payment: {
    appointment: async (parent, _, { pool }) => {
        const query = 'SELECT * FROM doctor_patient_map WHERE dp_id = ?';
        const [rows] = await pool.query(query, [parent.dp_id]);
        return rows.length > 0 ? rows[0] : null;
    },
    },
Specialization: {
    doctors: async (parent, _, { pool }) => {
        const query = 'SELECT * FROM doctors WHERE d_id IN (SELECT d_id FROM doctor_specialization_map WHERE s_id = ?)';
        const [rows] = await pool.query(query, [parent.s_id]);
        return rows;
    },
    },
DoctorClinicMap: {
    doctor: async (parent, _, { pool }) => {
        const query = 'SELECT * FROM doctors WHERE d_id = ?';
        const [rows] = await pool.query(query, [parent.d_id]);
        return rows.length > 0 ? rows[0] : null;
    },
        clinic: async (parent, _, { pool }) => {
            const query = 'SELECT * FROM clinics WHERE c_id = ?';
            const [rows] = await pool.query(query, [parent.c_id]);
            return rows.length > 0 ? rows[0] : null;
        },
    },
DoctorPatientMap: {
    doctor: async (parent, _, { pool }) => {
        const query = 'SELECT * FROM doctors WHERE d_id = ?';
        const [rows] = await pool.query(query, [parent.d_id]);
        return rows.length > 0 ? rows[0] : null;
    },
        clinic: async (parent, _, { pool }) => {
            const query = 'SELECT * FROM clinics WHERE c_id = ?';
            const [rows] = await pool.query(query, [parent.c_id]);
            return rows.length > 0 ? rows[0] : null;
        },
            patient: async (parent, _, { pool }) => {
                const query = 'SELECT * FROM patients WHERE p_id = ?';
                const [rows] = await pool.query(query, [parent.p_id]);
                return rows.length > 0 ? rows[0] : null;
            },
                payment: async (parent, _, { pool }) => {
                    const query = 'SELECT * FROM payments WHERE dp_id = ?';
                    const [rows] = await pool.query(query, [parent.dp_id]);
                    return rows.length > 0 ? rows[0] : null;
                },
    },
DoctorSpecializationMap: {
    doctor: async (parent, _, { pool }) => {
        const query = 'SELECT * FROM doctors WHERE d_id = ?';
        const [rows] = await pool.query(query, [parent.d_id]);
        return rows.length > 0 ? rows[0] : null;
    },
        specialization: async (parent, _, { pool }) => {
            const query = 'SELECT * FROM specializations WHERE s_id = ?';
            const [rows] = await pool.query(query, [parent.s_id]);
            return rows.length > 0 ? rows[0] : null;
        },
    },
};

export default resolvers
