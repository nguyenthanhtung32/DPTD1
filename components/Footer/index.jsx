import React, { memo } from "react";
import { FacebookOutlined, YoutubeOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center py-8 bg-darkblue text-white">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="/img/logo.png"
            alt="Company Logo"
            className="mb-4 md:mr-4 w-40 md:w-60"
          />
          <div className="text-center md:text-left">
            <div className="text-sm md:text-base leading-loose">
              Để được hỗ trợ và giải đáp mọi thắc mắc liên quan đến vấn đề tuyển
              dụng và nhân sự, vui lòng liên hệ trực tiếp tại:
            </div>
            <h1 className="text-base md:text-lg font-bold leading-loose">
              CÔNG TY TNHH TƯ VẤN GIẢI TRÍ DREAM
            </h1>
            <div className="leading-loose text-sm md:text-base">
              Địa chỉ: 388 Đ. Trần Hưng Đạo, An Hải, Sơn Trà, Đà Nẵng
            </div>
            <div className="leading-loose font-bold text-sm md:text-base">
              Số điện thoại văn phòng công ty: +84 88 93 222 55
            </div>
            <div className="leading-loose flex flex-col md:flex-row text-sm md:text-base">
              <p className="font-bold mr-2">Phụ trách nhân sự:</p> Mr.Trung -
              0913 097 481
            </div>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61565264831452"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlined className="text-2xl md:text-3xl" />
              </a>
              <a href="#" className="text-white">
                <YoutubeOutlined className="text-2xl md:text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
