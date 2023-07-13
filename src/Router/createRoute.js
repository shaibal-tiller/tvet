import AdminDashboard from "../Pages/AdminDashboard";
import Login from "../Pages/Login";
import SurveyPage from "../Pages/Survey";
import SurveyorDashboard from "../Pages/SurveyorDashboard";


const createRoute = (path, Element) => {
    return { path: path, element: Element }
}


export const routes = [
    createRoute('/', <Login/>),
    createRoute('/admin', <AdminDashboard />),
    createRoute('/dashboard', <SurveyorDashboard/>),
    createRoute('/survey',<SurveyPage/>)

]; 