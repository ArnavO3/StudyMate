//#222831
//#393E46
//#00ADB5
//#EEEEEE

import React from "react";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4 text-[#222831]">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaYoutube className="h-[24px] w-[24px] hover:text-red-500" />
            </a>
            <a>
              <FaInstagram className="h-[24px] w-[24px] hover:text-orange-500" />
            </a>
            <a>
              <FaTwitter className="h-[24px] w-[24px] hover:text-blue-400" />
            </a>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            StudyMate
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
