import { Link } from "react-router-dom";
import './index.css';


export default function SplashScreen() {
  return (
    <section id="splash-screen">
      <div className='gag-images'>
        <img src='/img/splash.webp' alt='Splash Screen' width="3430" height="490" />
      </div>
      <div id='splash-text' className='wrapper'>
        <h2>Gag Combos Info</h2>
        <Link to="/dashboard">Take Me to the Dashboard!</Link>
      </div>
    </section>
  );
}
