import React from 'react';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from './Homepage';
import Searchpage from './Searchpage';
// import Doctorpage from './Doctorpage';
import Login from './Login';
import Doctorprofile from './Doctoraprofile';
import Slotspage from './Slotspage';
import Appointments from './Appointments';

const Body = () => {
    
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Homepage/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/browse/doctor/:id/:cityname",
            element: <Doctorprofile/>
        },
        {
            path: "/browse/specialization/:s_name/:cityname",
            element: <Searchpage/>
        },
        {
            path:"/:d_id/:c_id",
            element:<Slotspage/>
        },
        {
            path:"/appointments",
            element:<Appointments/>
        },
        // {
        //     path:"/appointments/:checkapp",
        //     element:<Appointments/>
        // },
   
    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}


export default Body