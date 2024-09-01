import React from 'react';
import '../styles/footer.css'

function Footer() {
  return (
    <div className="footer-dark">
        <div>
            <h2 className="divider-style"></h2>
        </div>
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 item text">
                        <h3>Deen &amp; Dunya</h3>
                        <h3 className="font-monospace"><span>"How difficult can it be? - To do Good and be Good?"</span></h3>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a>Company</a></li>
                            <li><a>Team</a></li>
                            <li><a>Careers</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                            <li><a>Monitoring</a></li>
                            <li><a>Development</a></li>
                            <li><a>Reporting</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col item social"><a><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewbox="0 0 16 16" className="bi bi-twitter-x"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"></path></svg></a><a><i className="icon ion-social-github"></i></a><a><i className="icon ion-social-linkedin"></i></a></div>
                <div>
                    <h2 className="divider-style"></h2>
                </div>
                <p className="copyright">Deen &amp; Dunya © 2024</p>
            </div>
        </footer>
    </div>
  )
}

export default Footer;