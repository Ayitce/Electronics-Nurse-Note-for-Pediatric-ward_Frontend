
import { ControlContextProvider, useControlContext } from '@/components/ControlContext';
import RegisterComp from '@/components/RegisterComp';
import { setup } from '@/lib/csrf';


export default function Register() {

  return (
    <ControlContextProvider>
      <RegisterComp />
    </ControlContextProvider>
  );
}


export const getServerSideProps = setup(async (req, res) => {
  return {
    props: {}
  }
})
