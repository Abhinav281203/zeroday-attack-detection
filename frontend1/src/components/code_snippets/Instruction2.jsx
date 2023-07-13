import React, { useRef } from 'react';
import './Ins.css'; // Import the CSS file

const CodeSnippet3 = ({ code }) => {
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

const Instruction2 = () => {
  const code = `cicflowmeter [-h] (-i INPUT_INTERFACE | -f INPUT_FILE) [-c] [-u URL_MODEL] output`;

  return (
    <div>
      <CodeSnippet3 code={code} />
    </div>
  );
};

export default Instruction2;
