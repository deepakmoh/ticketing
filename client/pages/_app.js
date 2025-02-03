import 'bootstrap/dist/css/bootstrap.css';
import App from 'next/app'
import buildClient from '../api/build-client';
import Header from '../components/header';

/* export default ({ Component, pageProps }) =>{
    return <Component {...pageProps} ></Component>
}; */

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
      </div>
  };
  
  AppComponent.getInitialProps = async (appContext) => {
    
    //return { ...appProps };

    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if(appContext.Component.getInitialProps){
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    } 

    return {
      pageProps,
      currentUser: data.currentUser
    };

  };
  
  export default AppComponent;