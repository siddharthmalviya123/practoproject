import { gql } from '@apollo/client';

const DOCTORS_QUERY = gql`
query Doctor($doctorId: Int!) {
  doctor(id: $doctorId) {
    d_id
  }
}
`;


export default DOCTORS_QUERY;
