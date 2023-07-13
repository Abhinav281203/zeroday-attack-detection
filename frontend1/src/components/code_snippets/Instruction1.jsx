import React, { useRef } from 'react';
import './Ins.css'; // Import the CSS file

const CodeSnippet = ({ code }) => {
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

const Instruction1 = () => {
  const code = `git clone https://gitlab.com/hieulw/cicflowmeter
cd cicflowmeter
python setup.py install`;

  return (
    <div>
      <CodeSnippet code={code} />
    </div>
  );
};

export default Instruction1;
