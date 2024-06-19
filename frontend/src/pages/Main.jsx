
import designerImage from '../assets/Designer.png'; // Ensure correct path here

const Main = () => {
  return (
    <div className="w-full h-full fixed top-20" style={{ backgroundImage: `url(${designerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      Main
    </div>
  );
};

export default Main;
