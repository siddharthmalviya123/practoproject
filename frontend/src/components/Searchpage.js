import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchBar from './Search'; // Assuming this is the correct path
import Doctorlist from './Doctorlist'; // Corrected import name
import { useParams } from 'react-router-dom';
import { useQuery, gql, useMutation } from "@apollo/client";
import { specializationQuery ,searchBySpecialityPage} from '../graphql/doctorsQuery';
import InfiniteScroll from 'react-infinite-scroll-component';

const Searchpage = () => {
    const { s_name } = useParams();
    const[searchname,setSearchname ]= useState(s_name);
    const { loading, error, data } = useQuery(specializationQuery, { variables: { speciality: s_name } });
    const [page, setPage] = useState(1);
    const [doctorsList, setDoctorsList] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [offset,setOffset]=useState(0);


    const [doctorsBySpec, { data: speciality_data, loadingg, errorr }] =
    useMutation(searchBySpecialityPage);



    const fetchChunkData = async (limit, offset) => {
        try {
          const data = await doctorsBySpec({
            variables: { name: searchname, limit: 6, offset: 0 },
          });
         
          setItems(data?.data?.doctorBySpecialitiesPage);
          // if(data?.data?.doctorBySpecialitiesPage?.length<6)
          //   {
          //     setHasMore(false);
          //   }
          // console.log("data value in length is", data)
        } catch (error) {
          console.log("Error", error);
        }
      };
     
      useEffect(() => {
        fetchChunkData();
      }, []);
    
      const fetchMoreData = async() => {
        if(data?.data?.doctorBySpecialitiesPage?.length<6)
          {
            setHasMore(false);
          }
        setOffset(offset+6)

        // if(offset>17)
        //     {
        //   setHasMore(false);
        // }
    
        try {
          const data = await doctorsBySpec({
            variables: { name: searchname, limit: 6, offset: offset },
          });
         
          setItems([...items,...data?.data?.doctorBySpeciality]);
        } catch (error) {
          console.log("Error", error);
        }
    
    
    
      };

    useEffect(() => {
        if (!loading && data && data.doctorBySpecialities) {
            setDoctorsList(data.doctorBySpecialities.slice(0, 10));
        }
    }, [loading, data]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight &&
            !loadingMore
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        if (page > 1 && !loading && data && data.doctorBySpecialities) {
            setLoadingMore(true);
            setTimeout(() => {
                const newDoctors = data.doctorBySpecialities.slice((page - 1) * 10, page * 10);
                setDoctorsList((prevList) => [...prevList, ...newDoctors]);
                setLoadingMore(false);
            }, 1000);
        }
    }, [page, loading, data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;



   

      

    return (
        <div>
            <Header />
            <SearchBar />

            <div className="container mx-auto py-8">
                <h2 className="text-2xl font-semibold mb-4">Doctors List</h2>
                <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center mb-10">Loading...</h4>}
          endMessage={<div className="text-center mb-10">Yay! You have seen it all</div>}
        >
                <Doctorlist doctors={doctorsList} />
            </InfiniteScroll>
                {loadingMore && <p className="text-gray-600 mt-4 text-center">Loading more...</p>}
            </div>
        </div>
    );
};

export default Searchpage;




