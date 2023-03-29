import { UserProvider } from '@auth0/nextjs-auth0/client';


 function App({ Component, pageProps }) {

  return (
   <UserProvider>
      <Component {...pageProps} />
   </UserProvider>   
  );
  
}

export default App;