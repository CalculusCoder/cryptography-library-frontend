import CaesarCipher from "@/components/caeser_cipher/caesar";
import ColumnarCipher from "@/components/columnar_transposition_cipher/columnar_cipher";
import SelectButton from "@/components/common/select_button";
import { Button } from "@/components/ui/button";
import localFont from "next/font/local";
import Link from "next/link";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [cipher, setCipher] = useState<string>("");
  let content;

  if (cipher === "caesar") {
    content = <CaesarCipher cipher={cipher} />;
  }
  if (cipher === "columnar") {
    content = <ColumnarCipher cipher={cipher} />;
  }

  return (
    <>
      <div
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--background)] text-[var(--foreground)] font-[family-name:var(--font-geist-sans)]`}
      >
        <header className="text-5xl font-bold text-center mt-5">
          Jared&apos;s Cryptography Library
        </header>
        <div className="flex flex-col mx-auto mt-8 max-w-2xl text-lg text-[var(--foreground)]">
          <p className="text-center">
            This is my personal Cryptography Library. Currently it only supports
            cryptography using Caesar&apos;s Cipher. Over time, I will be adding
            more advanced ciphers and algorithms. The library is written in
            <span className="font-bold text-xl"> C</span>. The front end UI is
            written with <span className="font-bold text-xl">Next.js</span>. The
            backend is written in
            <span className="font-bold">Typescript (Node)</span>
            and <span className="font-bold">Express.js</span>. Child_Process is
            being used to connect my backend with the C library I built.
          </p>
          <header className="text-3xl text-center mt-10 font-semibold">
            Source Code
          </header>
          <div className="mt-6 flex justify-around">
            <Link
              href={`https://github.com/CalculusCoder/c-cryptography-library`}
            >
              <Button className="bg-white text-black hover:text-white">
                C Cryptography Library
              </Button>
            </Link>
            <Link
              href={`https://github.com/CalculusCoder/cryptography-library-frontend`}
            >
              <Button className="bg-white text-black hover:text-white">
                Front End
              </Button>
            </Link>
            <Link
              href={`https://github.com/CalculusCoder/cryptography-library-backend`}
            >
              <Button className="bg-white text-black hover:text-white">
                Backend
              </Button>
            </Link>
          </div>
          <div className="flex justify-center mt-16">
            <SelectButton setCipher={setCipher} />
          </div>
        </div>

        <div className={` flex flex-col items-center p-6 mt-16`}>{content}</div>
      </div>
    </>
  );
}
