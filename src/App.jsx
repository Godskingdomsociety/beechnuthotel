import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Booking from './pages/Booking'
import Dining from './pages/Dining'
import Events from './pages/Events'
import Contact from './pages/Contact'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Facilities from './pages/Facilities'
import Offers from './pages/Offers'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="booking" element={<Booking />} />
        <Route path="dining" element={<Dining />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="offers" element={<Offers />} />
      </Route>
    </Routes>
  )
}
