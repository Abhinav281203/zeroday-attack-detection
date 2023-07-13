import React, { useRef } from 'react';
import './Ins.css'; // Import the CSS file

const CodeSnippet2 = ({ code }) => {
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

const Instruction1_2 = () => {
  const code = `pip install cicflowmeter`;

  return (
    <div>
      <CodeSnippet2 code={code} />
    </div>
  );
};

export default Instruction1_2;
