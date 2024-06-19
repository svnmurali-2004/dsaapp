
// Loader.js
import { useLoader } from '../context/LoaderContext';
import BounceLoader from 'react-spinners/BounceLoader';
import PropagateLoader from 'react-spinners/PropagateLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';
import HashLoader from 'react-spinners/HashLoader';
const Loader = () => {
  const { loaderstate } = useLoader();

  return (
    <>
  {loaderstate.loading && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
      <div className="relative">
        <HashLoader color="red" loading={loaderstate.loading} size={100} />
      </div>
    </div>
  )}
</>

    
  );
};

export default Loader;
