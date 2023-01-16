import { Button } from "@mui/material";
import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

const Postcode = ({ insertAddr }) => {
  const open = useDaumPostcodePopup("http://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    insertAddr(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Button variant="outlined" onClick={handleClick} style={{ width: "100%" }} sx={{ mb: 1 }}>
      주소 검색
    </Button>
  );
};
export default Postcode;
