import { Outlet } from 'react-router-dom';
import Header from "./Header.jsx";

export default function Layout() {
    // const backgroundImage = 'https://w0.peakpx.com/wallpaper/60/652/HD-wallpaper-blue-sky-summer-sky-summer-clouds-nature.jpg';

    return (
        <div className='h-screen overflow-y-auto'
            // style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
}