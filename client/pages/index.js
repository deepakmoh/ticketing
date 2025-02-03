import axios from 'axios';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
 
   return currentUser ? <h1>You are signed in</h1> : <h1>you are NOT signed in</h1>;
 
  };
 
LandingPage.getInitialProps = async (context) => {


    /* if(typeof window === 'undefined'){
        //we are on server
        const { data } = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',{
               headers: req.headers
        });
        return data;
    } else {
        //browser
        const { data } = await axios.get('/api/users/currentuser');
        return data;
    } 
 

    
    return {}; */

    console.log('Langing Page!');

    const client = buildClient(context);

    const { data } = await client.get('/api/users/currentuser')
    return data;
}; 
 

export default LandingPage;