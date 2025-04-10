
import {PhotoGallery} from '../Gallery/PhotoGallery.tsx';
import {Home} from '../Home/Home.tsx';
import {Route, Routes} from 'react-router';


export const Routing = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'products'} element={<PhotoGallery />} />
        </Routes>
    );
};

