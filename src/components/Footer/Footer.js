import React from 'react';
import './Footer.css'

class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <footer className="bg-dark text-center text-lg-start footer fixed-bottom">
                <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                    made by 4wyt mhbdtya
                </div>
            </footer>
        );
    }
}

export default Footer;



