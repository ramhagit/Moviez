import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <span className="copyrights">Ⓒ Hagit Ram 2020</span>
            <Link to="/attributes/" ><span className="credits">Attributes</span></Link>
        </div>
    )
}

export default Footer;