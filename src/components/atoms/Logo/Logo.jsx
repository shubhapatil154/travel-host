import React from "react";
import logoImage from "../../../assets/logo-white.png";

export const Logo = () => {
  return (
    <div class="header__logo-box">
      <img src={logoImage} alt="logo" class="header__logo" />
    </div>
  );
};
