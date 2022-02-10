import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import("../src/components/index"), {
  ssr: false,
});

const index = () => {
  return (
    <div style={{ width: "screen", height: "100vh", background: "lightGray" }}>
      <Map />
    </div>
  );
};

export default index;
