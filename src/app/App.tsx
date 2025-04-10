import './App.css'
import {Header} from '../common/components/Header/Header.tsx';
import {Routing} from '../common/components/Routing/Routing.tsx';

export const App = () => {
    return (
        <div className="app">
            <Header/>
            <Routing/>
            {/*<PhotoGallery/>*/}
        </div>

    );
};

