import { ICar } from "@/components/Card";

export const fakeCarData: {
  data: { success: boolean; data: ICar[] };
  error: boolean;
  isLoading: boolean;
} = {
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
        type: "Electric Sedan",
        features: [
          "Autopilot",
          "Long Range",
          "Fast Charging",
          "Premium Interior",
        ],
        customerReviews: [
          {
            customerId: "c1",
            name: "John Doe",
            review:
              "Amazing car with incredible performance! The autopilot feature is a game changer.",
          },
          {
            customerId: "c2",
            name: "Jane Smith",
            review:
              "Love the sleek design and technology. Expensive but worth the investment.",
          },
        ],
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
        type: "Muscle Car",
        features: [
          "V8 Engine",
          "Leather Seats",
          "Bluetooth Connectivity",
          "Rearview Camera",
        ],
        customerReviews: [
          {
            customerId: "c3",
            name: "Mark Taylor",
            review:
              "The performance is top-notch. Classic design with modern features.",
          },
        ],
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
        type: "Luxury SUV",
        features: [
          "All-Wheel Drive",
          "Navigation System",
          "Heated Seats",
          "Sunroof",
        ],
        customerReviews: [
          {
            customerId: "c4",
            name: "Emily Johnson",
            review:
              "Comfortable and luxurious ride. Great for families and long trips.",
          },
        ],
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
        type: "Sedan",
        features: [
          "Adaptive Cruise Control",
          "Touchscreen Display",
          "Blind Spot Monitoring",
          "Leather Upholstery",
        ],
        customerReviews: [
          {
            customerId: "c5",
            name: "Chris Lee",
            review:
              "Smooth drive and excellent features. Perfect for daily commuting.",
          },
        ],
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
        type: "Electric Vehicle",
        features: [
          "Long Range Battery",
          "Fast Charging",
          "Regen On Demand",
          "Spacious Interior",
        ],
        customerReviews: [
          {
            customerId: "c6",
            name: "Olivia Brown",
            review:
              "Great value for an electric car. Impressive range and performance.",
          },
        ],
      },
    ],
  },
  error: false,
  isLoading: false,
};

export const fakeSingleCarData: {
  data: { success: boolean; data: ICar };
  error: boolean;
  isLoading: boolean;
} = {
  data: {
    success: true,
    data: {
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
      type: "Electric Sedan",
      features: [
        "Autopilot",
        "Long Range",
        "Fast Charging",
        "Premium Interior",
      ],
      customerReviews: [
        {
          customerId: "c1",
          name: "John Doe",
          review:
            "Amazing car with incredible performance! The autopilot feature is a game changer.",
        },
        {
          customerId: "c2",
          name: "Jane Smith",
          review:
            "Love the sleek design and technology. Expensive but worth the investment.",
        },
      ],
    },
  },
  error: false,
  isLoading: false,
};
