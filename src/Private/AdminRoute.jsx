
import { use } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../Components/Loading';


const AdminRoute = ({ children }) => {
    const { User, loading } = use(AuthContext);
    console.log(User?.role)
    if (loading) {
        return <Loading></Loading>
    }

    if (!User || User?.role !== "admin") {
        return <Navigate to={'/forbidden'} />
    }

    return children
};

export default AdminRoute;