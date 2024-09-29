import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  setCipher: Dispatch<SetStateAction<string>>;
}

const SelectButton: React.FC<Props> = ({ setCipher }) => {
  return (
    <Select onValueChange={(value: string) => setCipher(value)}>
      <SelectTrigger className="w-[180px] bg-gray-800">
        <SelectValue placeholder="Select a Cipher" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cipher&apos;s</SelectLabel>
          <SelectItem value="caesar">Caesar&apos;s</SelectItem>
          <SelectItem value="columnar">Columnar Transposition</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectButton;
