import React from 'react'
import Navbar from './navbar'
import "./instructions.css"
import Instruction1 from './code_snippets/Instruction1'
import Instruction1_2 from './code_snippets/Instruction1_2'
import Instruction2 from './code_snippets/Instruction2'
import Instruction3 from './code_snippets/Instruction3'
import Instruction4 from './code_snippets/Instruction4'

const Instructions = ({user, logout}) => {

  const downloadfile = () => {
    const downloadFile = (fileUrl, fileName) => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.click();
    };

    downloadFile(process.env.PUBLIC_URL + '/collectlogs.zip', 'collectlogs.zip');
  };


  return (
    <div>
      <Navbar user = {user} logout={logout}/>
      <div class='maegin'>
        <div class='institle'>
          <p>Generate your own network logs</p>
        </div>
        <div class='insread'>
          <p>Access the script file to collect the logs <a href="#" onClick={downloadfile}>here.</a></p>
        </div>
        <div class="insread">
          <p>To generate a .csv file of network logs using cicflowmeter, you can checkout the official page of  <a href='https://pypi.org/project/cicflowmeter/'> cicflowmeter </a>
            or you can to follow these steps:</p>
        </div>
        <div class='instruction'>
          <p class='stepnos'>1. Installation</p>
          <div class='innerins'>
            <p>To install CICFlowMeter, you have two options:</p>
            <p>Option 1: Clone the repository and install manually:</p>
          </div>
          <Instruction1 />
          <p class='innerins'>Option 2: Install using pip:</p>
          <Instruction1_2 />
          <p class='stepnos'>2. Usage</p>
          <p class='innerins'>Once you have installed CICFlowMeter, you can use it with the following command-line options:</p>
          <Instruction2 />
          <div class='innerins'>
            <p>Here's an explanation of the command-line options:</p>
            <p><a class='ach'>-h</a> or <a class='ach'>--help</a>: Display the help message and exit.</p>
            <p><a class='ach'>-i INPUT_INTERFACE</a> : Capture online data from the specified INPUT_INTERFACE.</p>
            <p><a class='ach'>-f INPUT_FILE</a>: Capture offline data from the specified INPUT_FILE (pcap file).</p>
            <p><a class='ach'>-c, --csv, --flow</a>: Output flows as a CSV file.</p>
            <p><a class='ach'>-a URL_MODEL</a>: (Optional) Specify a URL for the flow classification model.</p>
            <p><a class='ach'>output</a>: Specify the output file name (in flow mode) or directory (in sequence mode).</p>
          </div>
          <p class='stepnos'>3. Converting a pcap file to flow CSV:</p>
          <p class='innerins'>To convert a pcap file to a flow CSV file, employ the following command:</p>
          <Instruction3 />
          <p class='innerins'>Replace <a class='ach'>example.pcap</a> with the path to your pcap file, and <a class='ach'>flows.csv</a> with the desired output file name.</p>
          <p class='stepnos'>4. Capturing real-time packets from an interface to a flow CSV:</p>
          <div class='innerins'>
            <p >To capture and convert real-time packets from an interface to a flow CSV file, execute the following command:</p>
            <p ><a style={{ fontWeight: 'bold' }}>Note:</a> This command requires root permission.</p>
          </div>
          <Instruction4 />
          <div class='innerins'>
            <p>Replace <a class='ach'>eth0</a> with the name of the interface from which you wish to capture packets, and flows.csv with the desired output file name.</p>
            <p>That's it! You have now successfully installed CICFlowMeter and can proceed to analyze network flows using the library.</p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="contact-details">
          <a href="#" style={{ color: 'white' }}>Github</a>
        </div>
      </footer>
    </div>
  )
}

export default Instructions