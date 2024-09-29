import * as CipherTypes from "../../types/cipher_types";
import InputFile from "../caeser_cipher/input_file";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import React, { useState } from "react";

const ColumnarCipher: React.FC<CipherTypes.Props> = ({ cipher }) => {
  const [cryptoKey, setCryptoKey] = useState<string>("");
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
      formData.append("cipher", cipher);

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
      <header className="text-4xl font-bold text-center mb-10">
        Columnar Transposition Cipher
      </header>

      <div className="w-full max-w-lg bg-[var(--background)] rounded-lg p-8 shadow-lg border border-gray-700">
        <div className="mb-6">
          <InputFile onFileUpload={handleFileUpload} />
        </div>

        {/* Key Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-[var(--foreground)]">
            Cryptography Key: Please Enter a Word as Your Key
          </label>
          <Input
            value={cryptoKey}
            onChange={(e) => setCryptoKey(e.target.value)}
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
    </>
  );
};

export default ColumnarCipher;
