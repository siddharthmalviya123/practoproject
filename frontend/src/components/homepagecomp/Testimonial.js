import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonial() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl pt-9  pb-2 font-semibold text-center mb-2">What our users have to say</h2>

      <div className="flex justify-center items-center pb-24 mt-9 ">
        <div className="max-w-3xl w-full">
          <Slider {...settings}>
            <div className="flex justify-center  ">
              <div className="w-full md:w-1/2 p-8 border border-gray-200 rounded-lg shadow-md text-center">
                <p className="text-gray-600 mb-6">Testimonial 1</p>
                <p className="font-semibold text-gray-700">User 1</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full md:w-1/2 p-8 border border-gray-200 rounded-lg shadow-md text-center">
                <p className="text-gray-600 mb-6">Testimonial 2</p>
                <p className="font-semibold text-gray-700">User 2</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full md:w-1/2 p-8 border border-gray-200 rounded-lg shadow-md text-center">
                <p className="text-gray-600 mb-6">Testimonial 3</p>
                <p className="font-semibold text-gray-700">User 3</p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
