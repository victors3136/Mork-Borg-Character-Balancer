import logo from '/logo.jpg'
import './App.css'
import {Simulation} from "./components/Simulation.jsx";

const Header = () => <header
    className="fixed top-0 left-0 w-full z-50 flex items-center bg-black text-3xl justify-between px-12 py-8 mx-16 my-10">
    <a
        href="https://morkborg.com/"
        target="_blank"
        className="flex items-center space-x-100"
    >
        <img src={logo} className="h-15 w-15 mr-3" style={{"margin": "1rem"}} alt="Morkborg logo"/>
        <span className="text-2xl font-bold">MÖRK BORG Combat Simulator</span>
    </a>
</header>;
const App = () => <>
    <Header/>
    <Simulation/>
</>;

export default App
