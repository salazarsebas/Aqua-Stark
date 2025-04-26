import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { banners } from "@/data/mock-store";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { CountdownTimer } from "./countdownTimer";

export const StoreCarousel = () => {
  return (
    <div className="max-w-7xl px-4 py-8 mx-auto">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className={`rounded-xl p-8 flex flex-col md:flex-row items-center justify-between ${banner.background} text-white`}
              >
                {/* Left Side: Text */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                    <span>✨</span> {banner.title}
                  </h2>
                  <p className="mb-6">{banner.description}</p>
                  <div className="flex items-center gap-4">
                    <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100 transition">
                      {banner.buttonText}
                    </button>
                    <CountdownTimer countdown={banner.countdown} />
                  </div>
                </div>

                {/* Right Side: Banner Image */}
                <div className="flex-1 mt-8 md:mt-0 flex justify-center">
                  <img
                    src={banner.bannerImage}
                    alt={banner.title}
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev absolute p-2 top-1/2 left-0 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer after:hidden">
            <ChevronLeftIcon className="w-4 h-4 text-white" />
          </div>
          <div className="swiper-button-next absolute p-2 top-1/2 right-0 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer after:hidden">
            <ChevronRightIcon className="w-4 h-4 text-white" />
          </div>
        </Swiper>
      </div>
    </div>
  );
};
