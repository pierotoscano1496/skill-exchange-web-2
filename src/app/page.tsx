import Image from "next/image";
import SocialMediaForm from "../components/SocialMediaForm";
import { redirect } from "next/navigation";

export default function Home() {
  /* const goToLogin = () => {
    redirect('/login');
  } */

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <SocialMediaForm />{/* 
        <button onClick={goToLogin}>Ir al login</button> */}
      </div>
    </main>
  );
}
