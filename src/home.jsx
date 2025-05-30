import React from 'react';
import './App.css';

// This page is simply the main home page that displays by default 

function Home() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-white position-relative text-center bg-dark">
            <div className="position-relative d-inline-block BoxWidth">
                <img className="img-fluid w-100" src="/images/Scp.jpg" alt="scp" />
                <div className="fade"></div>
                <div className="position-absolute top-50 start-50 translate-middle text-white p-3 rounded">
                    <h2 className="ShadowOveride">Secure Contain Protect</h2>
                    <p><strong>Welcome to the SCP Foundation</strong></p>
                </div>
            </div>
            <br />
            <br />
            
            <p className="BoxWidth"><strong>Description:</strong>The SCP Foundation[note 3] is a fictional organization featured in stories created by contributors on the SCP Wiki, a wiki-based collaborative writing project. Within the project's shared fictional universe, the SCP Foundation is a secret organization that is responsible for capturing, containing, and studying various paranormal, supernatural, and other mysterious phenomena (known as "anomalies" or "SCPs"[note 3]), while also keeping their existence hidden from the rest of society.</p>
            <p className="BoxWidth">The collaborative writing project includes elements of many genres such as horror, science fiction, and urban fantasy. The majority of works on the SCP Wiki consist of thousands of SCP files: mock confidential scientific reports that document various SCPs and associated containment procedures. The website also contains "Foundation Tales", short stories featuring various characters and settings in the SCP universe. The wiki's literary works have been praised for their ability to convey horror through a quasi-scientific and academic writing style, as well as for their high standards of quality.

            The SCP universe has inspired numerous fan-made adaptations in varying forms of media, including literature, music, short films, and video games.</p>
            <div className="border border-secondary rounded p-3 m-3">
                <p className="BoxWidth"><strong>PLEASE BE REMINDED THAT ALL INFORMATION PERTAINING TO THE SCP FOUNDATION, ITS CONSTITUENTS, AND ITS MEMBERS IS STRICKLY PROHIBITED AND LEGALLY PUNISHABLE IF REVEALED TO THE GREATER PUBLIC.</strong></p>
            </div>
        </div>
    );
};

export default Home;
