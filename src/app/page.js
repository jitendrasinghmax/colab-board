import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>welcode to my app</div>
      <Link href="/draw">start drawing</Link>
    </div>
  );
}
