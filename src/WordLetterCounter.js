import React, { useState } from 'react';
import './counter.css';

function WordLetterCounter() {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [isSubscript, setIsSubscript] = useState(false); 
  const [wideText, setWideText] = useState(false);
  const [isAesthetic, setIsAesthetic] = useState(false); 
  const [strikeThrough, setStrikeThrough] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [binaryText, setBinaryText] = useState('');
  const [copied, setCopied] = useState(false);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);

    // word count
    const words = newText.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    
    // letter count
    const letters = newText.replace(/\s/g, '');
    setLetterCount(letters.length);
    
    //  sentence count
    const sentences = newText.split(/[.!?]+/).filter(Boolean);
    setSentenceCount(sentences.length);
    
    //  line count
    const lines = newText.split('\n').filter(Boolean);
    setLineCount(lines.length);
  };

  const handleUpperCase = () => {
    setText(text.toUpperCase());
  };

  const handleLowerCase = () => {
    setText(text.toLowerCase());
  };

  const handleCapitalizedCase = () => {
    setText(text.toLowerCase().replace(/(^|\s)\S/g, (s) => s.toUpperCase()));
  };

  const handleSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (s) => s.toUpperCase()));
  };

  const handleTitleCase = () => {
    setText(text.toLowerCase().replace(/(^\w|[-']\w)/g, (s) => s.toUpperCase()));
  };

  const handleInverseCase = () => {
    setText(
      text
        .split('')
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join('')
    );
  };

  const handleAlternatingCase = () => {
    setText(
      text
        .split('')
        .map((c, index) => (index % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
        .join('')
    );

  };

  //Subscript text
  const toggleSubscript = () => {
    setIsSubscript(!isSubscript);
  };

  //wide text
  const handleWideText = () => {
    setWideText(!wideText); 
  };

  //Aesthetic Font
   const toggleAesthetic = () => {
    setIsAesthetic(!isAesthetic);
  };

  const getAestheticClass = () => {
    return isAesthetic ? 'aesthetic-text' : ''; 
  };

  //strike through 
  const handleStrikeThrough = () => {
    setStrikeThrough(!strikeThrough); 
  };

  //flip text
  const flipText = () => {
    setIsFlipped(!isFlipped);
  };

  //bold text
  const boldtext = () => {
    setBold(!bold);
  };

  //italic text
  const italictext = () => {
    setItalic(!italic);
  };


  //underline text
  const Underlinetext = () => {
    setUnderline(!underline);
  };

  //preivew text
  const generatePreviewText = () => {
    let previewText = text;
    if (isSubscript) {
      previewText = <sub>{previewText}</sub>;
    }
    if (wideText) {
      previewText = <span className="wide-text">{previewText}</span>;
    }
    if (isAesthetic) {
      previewText = <span className="aesthetic-text">{previewText}</span>;
    }
    if (strikeThrough) {
      previewText = <span style={{ textDecoration: 'line-through' }}>{previewText}</span>;
    }
    if (isFlipped)  {
      previewText = <p className={isFlipped ? 'flipped-text' : ''} >{previewText}</p>
    };

    if(bold){
      previewText = <p className={bold ? 'bold-text' : ''}>{previewText}</p>
    };

    if(italic){
      previewText = <p className={italic ? 'italic-text' : ''}>{previewText}</p>
    };

    if(underline){
      previewText = <p className={underline ? 'underline-text' : ''}>{previewText}</p>
    };
  
    return previewText;
  };

  //reverse text
  const handleBackwardsText = () => {
    setText(text.split('').reverse().join(''));
  };


  //binary text
  const handleTextToBinary = () => {
    const binary = text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
    setBinaryText(binary);
  };


  //download text
  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'text.txt';
    document.body.appendChild(element);
    element.click();
  };


//copy text
  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000); 
  };


  //clear text
  const handleClearText = () => {
    setText('');
    setWordCount(0);
    setLetterCount(0);
    setSentenceCount(0);
    setLineCount(0);
  };

  
  return (
    <div className='word-box'>
      <div className="word-inner-box">
        <h1>Word and Letter Counter</h1>
        {copied && <p>Text Copied!</p>}
        <textarea
          rows="6"
          cols="50"
          value={text}
          onChange={handleTextChange}
          placeholder="Type something here..."
          className={getAestheticClass()}
        />
        <div className='count'>
          <p>Word Count: {wordCount}</p>
          <p>Letter Count: {letterCount}</p>
          <p>Sentence Count: {sentenceCount}</p>
          <p>Line Count: {lineCount}</p>
        </div>

        <div className='case-btn'>
            <button onClick={handleUpperCase}>Upper Case</button>
            <button onClick={handleLowerCase}>Lower Case</button>
            <button onClick={handleCapitalizedCase}>Capitalized Case</button>
            <button onClick={handleSentenceCase}>Sentence Case</button>
            <button onClick={handleTitleCase}>Title Case</button>
            <button onClick={handleInverseCase}>Inverse Case</button>
            <button onClick={handleAlternatingCase}>Alternating Case</button>
        </div>

        <div className='case-btn'>
            <button onClick={toggleSubscript}>Subscript Text</button>
            <button onClick={handleWideText}>{wideText ? 'Narrow Text' : 'Wide Text'}</button>
            <button onClick={toggleAesthetic}>Aesthetic Font</button>
            <button onClick={handleStrikeThrough}>Strike Through Text</button>
            <button onClick={handleBackwardsText}>Reverse Text</button>
            <button onClick={flipText}>Flip Text</button>
        </div>

        <div className='case-btn'>
            <button onClick={boldtext}>Bold</button>
            <button onClick={italictext}>Italic</button>
            <button onClick={Underlinetext}>Underline</button>
            <button onClick={handleTextToBinary}>Convert to Binary</button>
            <button onClick={handleDownloadText}>Download Text</button>
            <button onClick={copyTextToClipboard}>Copy Text</button>
            <button onClick={handleClearText}>Clear Text</button>
        </div>
          
        <div className='text-preview'>
          <h2>Text Preview:</h2>
          <p>{generatePreviewText()}</p>
          <h2>Binary Text:</h2>
          <p>{binaryText}</p>
        </div>
        
      </div>
    </div>
  );
}

export default WordLetterCounter;


