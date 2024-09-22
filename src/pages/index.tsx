import InputFile from "@/components/caeser_cipher/input_file";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import localFont from "next/font/local";
import Image from "next/image";
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
  const [cryptoKey, setCryptoKey] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  async function setFormSubmission(encrypt: "true" | "false") {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("encryptionKey", cryptoKey.toString());
      formData.append("encrypt", encrypt);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const encryptStatus = response.headers["x-encrypt-status"];

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;

      if (encryptStatus === "true") {
        link.setAttribute("download", "encrypted_file.txt");
      } else {
        link.setAttribute("download", "decrypted_file.txt");
      }

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--background)] text-[var(--foreground)] font-[family-name:var(--font-geist-sans)]`}
      >
        <header className="text-5xl font-bold text-center mt-5">
          Jared's Cryptography Library
        </header>
        <div className="flex flex-col justify-center items-center mx-auto mt-8 max-w-2xl text-lg text-[var(--foreground)]">
          <p>
            This is my personal Cryptography Library. Currently it only supports
            cryptography using Caesar's Cipher. Over time, I will be adding more
            advanced ciphers and algorithms. The library is written in
            <span className="font-bold text-xl"> C</span>. The front end UI is
            written with <span className="font-bold text-xl">Next.js</span>. The
            backend is written in{" "}
            <span className="font-bold">Typescript (Node)</span>
            and <span className="font-bold">Express.js</span>. Child_Process is
            being used to connect my backend with the C library.
          </p>
        </div>

        <div
          className={`min-h-screen flex flex-col items-center justify-center p-6`}
        >
          <header className="text-4xl font-bold text-center mb-10">
            Caesar's Cipher
          </header>

          <div className="w-full max-w-lg bg-[var(--background)] rounded-lg p-8 shadow-lg border border-gray-700">
            <div className="mb-6">
              <InputFile onFileUpload={handleFileUpload} />
            </div>

            {/* Key Input */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-[var(--foreground)]">
                Cryptography Key
              </label>
              <Input
                value={cryptoKey}
                onChange={(e) => setCryptoKey(Number(e.target.value))}
                placeholder="Enter a number key"
                className="w-full bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <Button
                onClick={() => setFormSubmission("true")}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
              >
                Encrypt
              </Button>
              <Button
                onClick={() => setFormSubmission("false")}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition"
              >
                Decrypt
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
