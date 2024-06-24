
import { Link } from 'react-router-dom';

const MainPage = () => {
  // Assuming you have a gallery of clickable images
  return (
    <div>
      <h1>Chris Mingles</h1>
      {/* Your gallery of clickable images */}
      <Link to="/image/1">Image 1</Link>
      <Link to="/image/2">Image 2</Link>
      {/* Add more links for other images */}
    </div>
  );
};

export default MainPage;
