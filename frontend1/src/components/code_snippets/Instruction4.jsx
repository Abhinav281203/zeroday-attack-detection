import React, { useRef } from 'react';
import './Ins.css'; // Import the CSS file

const CodeSnippet5 = ({ code }) => {
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

const Instruction4 = () => {
  const code = `cicflowmeter -i eth0 -c flows.csv`;

  return (
    <div>
      <CodeSnippet5 code={code} />
    </div>
  );
};

export default Instruction4;
