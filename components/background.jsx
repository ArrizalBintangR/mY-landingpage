import Image from "next/image";

const Background = ({ className = "", style = {}}) => {
  return (
    <Image
      src="/black-crayon-drawing.jpg"
      alt="Background"
      width={1920} // Adjust based on your need
      height={1080}
      className={className}
      style={style}
    />
  );
};

export default Background;
