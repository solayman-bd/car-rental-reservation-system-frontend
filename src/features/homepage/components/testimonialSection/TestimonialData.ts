export interface ITestimonial {
  id: number;
  name: string;
  image: string;
  message: string;
  designation: string;
}

export const testimonials: ITestimonial[] = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    message:
      "This is the best camping gear I've ever bought! Highly recommend.",
    designation: "Outdoor Enthusiast",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    message: "Great quality products and excellent customer service.",
    designation: "Adventure Seeker",
  },
  {
    id: 3,
    name: "Sam Wilson",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    message:
      "I love the variety of items available. My go-to shop for camping.",
    designation: "Hiking Expert",
  },
];
