import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="page-footer font-small elegant-color-dark">
            <div className="footer-copyright text-center p-3">
                {/* must attribute flaticons */}
                <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icon created by Freepik - Flaticon</a> <br/>
                <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect"> Play icon created by Pixel perfect </a> <br/>
                <a href="https://www.flaticon.com/free-icons/rewind" title="rewind icons">Rewind and fast-forward icons created by Smashicons - Flaticon</a>
            </div>  
        </footer>
    )
}

export default Footer;