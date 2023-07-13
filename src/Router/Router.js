import React from 'react'
import { routes } from './createRoute'
import { Routes, Route, } from "react-router"
// import PageNotFound from '../DefaultPages/PageNotFound'

const Router = () => {

    
    return (
        <div>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={"comp-"+index} exact path={route.path} element={route.element}></Route>
                ))}
               {/*  <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
        </div>
    )
}

export default Router;