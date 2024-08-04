import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className="py-4" >
        <div className="row justify-content-center">
          <div className="col-2">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
              <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">Features</Link></li>
              
            </ul>
          </div>

          <div className="col-2">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">Pricing</Link></li>
              <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">FAQs</Link></li>
              
            </ul>
          </div>

          <div className="col-2">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">About</Link></li>
            </ul>
          </div>

          {/* <div className="col-4 offset-1">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of whats new and exciting from us.</p>
              <div className="d-flex w-100 gap-2">
                <label for="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" fdprocessedid="plvt"/>
                <button className="btn btn-primary" type="button" fdprocessedid="glzd2s">Subscribe</button>
              </div>
            </form>
          </div> */}
        </div>

        <div className="d-flex justify-content-center mt-2 pt-2 border-top">
          <p>© 2021 Company, Inc. All rights reserved.</p>
          {/* <ul className="list-unstyled d-flex">
            <li className="ms-3"><Link className="link-dark" to="#"><svg className="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></Link></li>
            <li className="ms-3"><Link className="link-dark" to="#"><svg className="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></Link></li>
            <li className="ms-3"><Link className="link-dark" to="#"><svg className="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></Link></li>
          </ul> */}
        </div>
      </footer>
    </div>
  )
}

export default Footer