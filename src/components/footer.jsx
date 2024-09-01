import React from 'react';
import '../styles/footer.css'

function Footer() {
  return (
    <div className="footer-dark-new">
        <div className="footer-row-new">
            <div className="quote">
                <h3 className='company-name'>Deen &amp; Dunya</h3>
                <a className="actual-quote"><span>"How difficult can it be? - To do Good and be Good?"</span></a>
            </div>
            <div className="about">
                <h3>About</h3>
                <ul>
                    <li><a>Company</a></li>
                    <li><a>Team</a></li>
                    <li><a>Careers</a></li>
                </ul>
            </div>
            <div className="services">
                <h3>Services</h3>
                <ul>
                    <li><a>Monitoring</a></li>
                    <li><a>Development</a></li>
                    <li><a>Reporting</a></li>
                </ul>
            </div>
        </div>
        <div className="follow-us">
            <li><img src="https://img.icons8.com/nolan/48/1A6DFF/C822FF/twitterx.png" alt="Twitter Icon"></img></li>
            <li><img src="https://img.icons8.com/nolan/48/github.png" alt="Github Icon"></img></li>
            <li><img src="https://img.icons8.com/nolan/48/1A6DFF/C822FF/instagram-new.png" alt="Instagram Icon"></img></li>
        </div>
        <div>
            <h2 className="divider-style"></h2>
        </div>
        <p className="copyright">Deen &amp; Dunya © 2024</p>
    </div>


  )
}

export default Footer;