import SectionsWraper from "@/components/SectionWrapper";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "@/components/Card";
import { fakeCarData } from "./falkeCarData";
const FeaturedCarsSection = () => {
  // const { data, error, isLoading } = useGetBestSellingProductsQuery(undefined);
  const { data, error, isLoading } = fakeCarData;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 733,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 536,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <SectionsWraper heading="Featured Cars">
      {isLoading && (
        <div className="flex items-center justify-center h-full border border-gray-200 rounded-lg w-full dark:border-gray-700">
          <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            <p className=" text-3xl"> loading...</p>
          </div>
        </div>
      )}
      {error && <p className="text-3xl text-red-800">Some error occured....</p>}
      {data?.success && (
        <>
          <div className="slider-container ">
            <Slider {...settings}>
              {data?.data?.map((car) => (
                <Card key={car.name} car={car} />
              ))}
            </Slider>
          </div>
        </>
      )}
    </SectionsWraper>
  );
};

export default FeaturedCarsSection;
