
import {PhotoGallery} from '../Gallery/PhotoGallery.tsx';
import {Home} from '../Home/Home.tsx';
import {Route, Routes} from 'react-router';
import {ProductPage} from '../ProductPage/ProductPage.tsx';
import {Error404} from '../Error404/Error404.tsx';
import {CreateCardForm} from '../CreateCardForm/CreateCardForm.tsx';


export const Routing = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'products'} element={<PhotoGallery />} />
            <Route path={'products/:id'} element={<ProductPage />} />
            <Route path={'CreateCardForm'} element={<CreateCardForm />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

