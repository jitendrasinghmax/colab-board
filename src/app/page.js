import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="main">
      <div className="navbar">
        <div className="nav-container">
          <div>GPT Diagram</div>
          <div>About</div>
        <Link href="/draw"><button className="landing-btn">Draw</button></Link>
        </div>
      </div>
     <div className="hero">
       <div>
        AI for technical 
      </div>
      <div>
        design and documentation
      </div>
      <div className="">
        <Link href="/draw"><button className="landing-btn">Start Drawing</button></Link>
      </div>
      <div className='image'>
        <div className="img1"><Image height={300} width={350}  src="/ss.png" alt=""/></div>
        <div className="img2"><Image height={400} width={450}  src="/ss2.png" alt=""/></div>
        <div className="img3"><Image height={300} width={300}  src="/ss3.png" alt=""/></div>
      </div>
     </div>
    </div>
  );
}
