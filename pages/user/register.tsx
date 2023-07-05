
import { useAuth } from '@/_auth';
import { ControlContextProvider, useControlContext } from '@/components/ControlContext';
import Navbar from '@/components/Navbar';
import RegisterComp from '@/components/RegisterComp';
import { setup } from '@/lib/csrf';
import { Button } from '@mui/material';


export default function Register() {
  const { isLoggedIn, role } = useAuth()

  return (
    <ControlContextProvider>
      <Navbar item={
        <Button href="/" color="inherit"></Button>
      } isLoggedIn={isLoggedIn} />
      <RegisterComp />
    </ControlContextProvider>
  );
}


export const getServerSideProps = setup(async (req, res) => {
  return {
    props: {}
  }
})
