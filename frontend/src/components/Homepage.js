import React from 'react'
import Header from './Header'
import SearchBar from './Search'
import Card1 from './homepagecomp/Card1'
import Article1 from './homepagecomp/Article1'
import Testimonial from './homepagecomp/Testimonial'
import Footer from './Footer'
// import Slotspage from './Slotspage'
import { useDispatch, useSelector } from 'react-redux'
import { setDoctor } from '../redux/doctorSlice'
import { setClinic } from '../redux/clinicSlice'
// import Doctorprofile from './Doctoraprofile'

const Homepage = () => {
 

 const dispatch = useDispatch();
 dispatch(setDoctor(null))
 dispatch(setClinic(null));
    // const doctor = useSelector((store) => store.store_doctor);
    // console.log("homepage doctor is",doctor)
    // const clinic = useSelector((store) => store.store_clinic);
    // console.log("homepage doctor is",clinic)



  return (
    <div>
      <Header/>
      <SearchBar/>
      <Card1/>
      <Article1/>
      <Testimonial/>
      <Footer/>
    
    </div>
  )
}

export default Homepage
