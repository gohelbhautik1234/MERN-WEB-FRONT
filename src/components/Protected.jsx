import { Navigate } from 'react-router';

export default function Protected({children}) {
    const data=localStorage.getItem('user');
    return data?<>{ children }</>:<Navigate to="/Signup"/> 
}
