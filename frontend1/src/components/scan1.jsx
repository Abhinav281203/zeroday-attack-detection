import React, { useState } from 'react';
import './scan1.css';
import Navbar from './navbar';
import axios from 'axios';
import Ddosgoldeneye from './attackinfos/ddosgoldeneye';
import Bot from './attackinfos/Bot';
import Ddos from './attackinfos/Ddos';
import Ddoshulk from './attackinfos/Ddoshulk';
import Ddosslowhttptest from './attackinfos/Ddosslowhttptest';
import Ddosslowloris from './attackinfos/Ddosslowloris';
import Ftppatator from './attackinfos/Ftppatator';
import Infiltration from './attackinfos/Infiltration';
import Sshpatator from './attackinfos/Sshpatator';
import Webbruteforce from './attackinfos/Webbruteforce';
import Websqlinjection from './attackinfos/Websqlinjection';
import Zeroday from './attackinfos/Zeroday';

const Scan1 = ({user, logout}) => {
    const [file, setFile] = useState(null);
    const [res, setres] = useState("");

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', user.username)

        try {
            const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                mode: 'no-cors'
            });
            setres(response.data);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <Navbar user={user} logout={logout}/>
            <div class='maegin'>
                <div class="scantitle">
                    <p>Scan your network logs here</p>
                </div>
                <p></p>
                <p class='info'>
                    We have duly furnished the necessary instructions on generating the CSV file containing the local network logs.
                    You may access the information <a href="/instructions">here</a>.
                </p>

            </div>
            <div class="uploadtotal">
                <div>
                    <form className="form">
                        <span className="form-title">Upload your file</span>
                        <p className="form-paragraph">File should be an .csv file</p>
                        <label htmlFor="file-input" className="drop-container">
                            <span className="drop-title">Drop files here</span>
                            or
                            <input type="file" accept=".csv" required id="file-input" onChange={handleChange} />
                        </label>
                    </form>
                </div>
                <div>
                    <button class="uploadbtn" onClick={handleSubmit}>Upload</button>
                </div>
            </div>
            <div class='result'>
                {res && (
                    <div class='resinfo'>
                        {res.Prediction === 'malicious' ? (
                            <div class='resulttitle'>
                                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: '50px', marginLeft: '0.6em' }}>
                                    Malicious
                                </p>
                                <p></p>
                                {/* <p>Malicious Samples: {res.mali}</p> */}
                                {/* <p>Type of the attack: {res.attack}</p> */}
                                {res.attack === 'zeroday' && <Zeroday />}
                                {res.attack === 'bot' && <Bot />}
                                {res.attack === 'ddos' && <Ddos />}
                                {res.attack === 'ddoshulk' && <Ddoshulk />}
                                {res.attack === 'ddosgoldeneye' && <Ddosgoldeneye />}
                                {res.attack === 'dosslowhttptest' && <Ddosslowhttptest />}
                                {res.attack === 'dosslowloris' && <Ddosslowloris />}
                                {res.attack === 'ftppatator' && <Ftppatator />}
                                {res.attack === 'infiltration' && <Infiltration />}
                                {res.attack === 'sshpatator' && <Sshpatator />}
                                {res.attack === 'webattackbruteforce' && <Webbruteforce />}
                                {res.attack === 'webattacksqlinjection' && <Websqlinjection />}
                            </div>
                        ) : (
                            <>
                                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: '50px' }}>
                                    Not Malicious
                                </p>
                                <p class='contextabtatk'>
                                    After carefully reviewing the provided network logs, it has been determined that they do not indicate any malicious activity. Based on the analysis, the network logs appear to be safe and do not pose any immediate security concerns. However, it is essential to remain vigilant and continue monitoring network activities for any suspicious behavior or anomalies.
                                </p>
                            </>
                        )}
                    </div>
                )}

            </div>

            <footer className="footer">
                <div className="contact-details">
                    <a href="#" style={{ color: 'white' }}>Github</a>
                </div>
            </footer>
        </div>
    )
}

export default Scan1