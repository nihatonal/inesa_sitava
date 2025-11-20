import React from "react";
import RefreshLink from "./RefreshLink";

const Logo = () => {
  return (
    <div className="relative flex items-center text-muted z-[99]">
      <RefreshLink to="/" className="flex items-center gap-2 group">
        <span className="text-2xl font-bold font-heading leading-none whitespace-nowrap">
          Logo
        </span>
      </RefreshLink>
    </div>
  );
};

export default Logo;
