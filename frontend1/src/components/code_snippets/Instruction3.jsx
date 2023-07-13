import React, { useRef } from 'react';
import './Ins.css'; // Import the CSS file

const CodeSnippet4 = ({ code }) => {
  const codeRef = useRef(null);

  const handleCopyClick = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
    }
  };

  return (
    <div className="code-snippet-container">
      <pre ref={codeRef} className="code-snippet">
        {code}
      </pre>
      {/* <button onClick={handleCopyClick}>Copy</button> */}
    </div>
  );
};

const Instruction3 = () => {
  const code = `cicflowmeter -f example.pcap -c flows.csv`;

  return (
    <div>
      <CodeSnippet4 code={code} />
    </div>
  );
};

export default Instruction3;
