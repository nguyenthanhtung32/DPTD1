import React, { memo } from "react";
import Link from "next/link";
import { MapPinned, Phone, Mail } from "lucide-react";

function Header() {
  return (
    <div className="bg-black fixed top-0 left-0 w-full z-50">
      <div className="container flex flex-wrap items-center justify-between px-14 md:flex-nowrap">
        <div className="flex flex-wrap md:flex-nowrap items-center">
          <Link href="/" className="flex items-center mb-4 md:mb-0">
            <img
              src="/img/logo.png"
              title="DreamPoker"
              className="md:w-[5rem] md:h-[5rem] w-[3rem] h-[3rem]"
              alt="Logo"
            />
          </Link>
          <div className="text-white flex items-center w-full md:w-auto md:ml-4">
            <MapPinned className="w-6 md:w-8 text-yellow mr-2" />
            <span className="text-sm md:text-base">
              Trụ sở tại: 388 Đ. Trần Hưng Đạo, An Hải, Sơn Trà, Đà Nẵng
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row text-white space-y-2 md:space-y-0">
          <div className="flex items-center text-sm md:text-base">
            <Phone className="mr-2 text-yellow" />
            <span>Số điện thoại: +84 88 93 222 55</span>
          </div>
          <div className="flex items-center text-sm md:text-base mt-2 md:mt-0 md:ml-4">
            <Mail className="mr-2 text-yellow" />
            <span>Email: hrbp.dreampokerdanang@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
