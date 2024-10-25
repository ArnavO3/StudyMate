"use client";
import React, { useState, useEffect } from "react";
import "animate.css/animate.min.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../globals.css";
import Error from "../error";
import Logout from "../logout/page";
import Footer from "../footer";
import Image from "next/image";

function Dashboard() {
  const controls1 = useAnimation();
  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView1) {
      controls1.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "circOut" },
      });
    }
  }, [controls1, inView1]);

  const controls2 = useAnimation();
  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView2) {
      controls2.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }
  }, [controls2, inView2]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.log("User is not logged in");
    }
  }, []);

  const products = [
    {
      id: 1,
      name: "Web Development - MERN",
      href: "#",
      imageSrc: "/assets/carousel1.png",
      price: "₹1200",
    },
    {
      id: 2,
      name: "Go Deep in AI/ML",
      href: "#",
      imageSrc: "/assets/carousel2.png",
      price: "₹1000",
    },
    {
      id: 3,
      name: "Start your DevOps Career",
      href: "#",
      imageSrc: "/assets/carousel3.png",
      price: "₹3500",
    },
    {
      id: 4,
      name: "Learn and hack with Cyber Security",
      href: "#",
      imageSrc: "/assets/carousel4.png",
      price: "₹2500",
    },
  ];

  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.log("User is not logged in");
    }
  }, []);

  if (!localStorage.getItem("username")) {
    return (
      <>
        <Error text="You cannot visit this page, kindly login again." />
      </>
    );
  }

  return (
    <>
      <div className="navbar shadow-[0px_0px_60px_0px_rgba(0,0,0,0.3)] rounded-2xl mb-2 sticky top-1 z-10 bg-white">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">StudyMate</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <p className="font-semibold border-b-2 border-[##00ADB5]">
            {username}
          </p>
          <div className="ml-5">
            <Logout />
          </div>
        </div>
      </div>

      <div className="diff h-[89vh]">
        <div className="diff-item-1">
          <div className="bg-[#393E46] text-[#00ADB5] grid place-content-center text-9xl font-black">
            BEGIN
          </div>
        </div>
        <div className="diff-item-2">
          <div className="bg-[#00ADB5] text-[#393E46] grid place-content-center text-9xl font-black">
            HERE
          </div>
        </div>
        <div className="diff-resizer"></div>
      </div>

      <motion.div
        ref={ref1}
        initial={{ x: -100, opacity: 0 }}
        animate={controls1}
      >
        <div className="card rounded-none lg:card-side studyDiv">
          <div className="card-body">
            <h2 className="card-title uppercase text-3xl text-[#222831]">
              Empowering Learners Across the Globe
            </h2>
            <p className="text-lg pt-5 text-[#393E46]">
              At StudyMate, we believe that learning should be easy, accessible,
              and enjoyable for everyone. That’s why we’ve built a platform
              designed to support students at every step of their academic
              journey. Whether you’re preparing for exams, working on
              assignments, or just expanding your knowledge, we’ve got you
              covered.
              <br />
              Why thousands choose StudyMate:
              <br />
              Personalized Learning: With our vast library of 500+ study guides,
              you’ll find resources tailored specifically to your needs, no
              matter the subject.
              <br />
              Collaborative Environment: Connect with a thriving community of
              over 4000+ learners.
              <br />
              Proven results: Our users have logged over 10,000+ hours of study
              time.
            </p>
          </div>
          <img className="p-5 rounded-xl" src="/assets/studyDiv.png" alt="Album" />
        </div>

        <div className="stats shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] m-2 flex -mt-7 mb-5">
          <div className="stat place-items-center">
            <div className="stat-title text-[#393E46]">Hours of study</div>
            <div className="stat-value">10K</div>
            <div className="stat-desc text-[#393e46a5]">Between 2023-2024</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title text-[#00ADB5]">Users</div>
            <div className="stat-value text-[#00ADB5]">4,200</div>
            <div className="stat-desc text-[#00acb5a7]">↗︎ (2%)</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title text-[#393E46]">Total Courses</div>
            <div className="stat-value">450+</div>
            <div className="stat-desc text-[#393e46a5]">↗︎ 24 (5%)</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={ref2}
        initial={{ y: 100, opacity: 0 }}
        animate={controls2}
      >
        <div className="bgDiv">
          <h1 className="ml-5 pt-3 text-[35px] text-black font-bold">
            LET ME SHOW YOU SOME EXAMPLES! 😀
          </h1>
          <div className="w-full px-4 sm:px-6 sm:py-12 lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 justify-center">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:scale-110 lg:h-80">
                    <Image
                      width={340}
                      height={317}
                      alt={product.name}
                      src={product.imageSrc}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <h3 className="text-sm font-semibold text-[#222831]">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="text-sm font-medium text-[#222831]">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </>
  );
}

export default Dashboard;
