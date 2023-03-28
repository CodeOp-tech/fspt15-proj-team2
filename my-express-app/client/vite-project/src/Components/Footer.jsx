import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="page-footer font-small elegant-color-dark">
            <div className="footer-copyright text-center p-3">
                {/* must attribute flaticons */}
                <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>
            </div>  
        </footer>
    )
}

export default Footer;