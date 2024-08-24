import SectionsWraper from "@/components/SectionWrapper";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "@/components/Card";
const FeaturedCarsSection = () => {
  // const { data, error, isLoading } = useGetBestSellingProductsQuery(undefined);
  const { data, error, isLoading } = {
    data: {
      success: true,
      data: [
        {
          _id: "1",
          name: "Tesla Model S",
          description:
            "A high-performance electric sedan with cutting-edge technology.",
          price: 79999,
          ratings: 4.8,
          images: [
            "https://example.com/images/tesla_model_s_1.jpg",
            "https://example.com/images/tesla_model_s_2.jpg",
          ],
          isFeatured: true,
          isAvailable: true,
          cartQuantity: 0,
        },
        {
          _id: "2",
          name: "Ford Mustang",
          description:
            "A classic American muscle car with powerful engine options.",
          price: 55999,
          ratings: 4.5,
          images: [
            "https://example.com/images/ford_mustang_1.jpg",
            "https://example.com/images/ford_mustang_2.jpg",
          ],
          isFeatured: false,
          isAvailable: true,
        },
        {
          _id: "3",
          name: "BMW X5",
          description:
            "A luxury SUV offering both comfort and performance for the modern driver.",
          price: 65999,
          ratings: 4.6,
          images: [
            "https://example.com/images/bmw_x5_1.jpg",
            "https://example.com/images/bmw_x5_2.jpg",
          ],
          isFeatured: true,
          isAvailable: false,
        },
        {
          _id: "4",
          name: "Audi A4",
          description:
            "A sleek and stylish sedan with advanced technology and a refined interior.",
          price: 49999,
          ratings: 4.4,
          images: [
            "https://example.com/images/audi_a4_1.jpg",
            "https://example.com/images/audi_a4_2.jpg",
          ],
          isFeatured: false,
          isAvailable: true,
          cartQuantity: 2,
        },
        {
          _id: "5",
          name: "Chevrolet Bolt EV",
          description:
            "An affordable electric vehicle with impressive range and technology.",
          price: 34999,
          ratings: 4.7,
          images: [
            "https://example.com/images/chevrolet_bolt_ev_1.jpg",
            "https://example.com/images/chevrolet_bolt_ev_2.jpg",
          ],
          isFeatured: false,
          isAvailable: true,
        },
      ],
    },
    error: false,
    isLoading: false,
  };

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
