const wrapText = (text) => {
  return text.split('').map((char, index) => {
    const className = index % 2 === 0 ? 'wiggle-left-right' : 'wiggle-right-left';
    return <span key={index} className={className}>{char === ' ' ? '\u00A0' : char}</span>;
  });
}


export default wrapText;
