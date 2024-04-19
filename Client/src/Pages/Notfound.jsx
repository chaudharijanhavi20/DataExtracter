import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div>
      <section class="w-full h-screen flex justify-center items-center  bg-black">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white">
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">
              Something's missing.
            </p>
            <p class="mb-4 text-lg font-light text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <div class="relative inline-flex group mt-5">
              <div class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <Link
                to={"/"}
                title="Get quote now"
                class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-black rounded-lg font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Return to Home Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
