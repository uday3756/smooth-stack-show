export type ServiceType = "enrollment" | "camp" | "party" | "product";

interface ServiceBase {
  id: string;
  type: ServiceType;
  title: string;
}

export interface EnrollmentService extends ServiceBase {
  type: "enrollment";
  schedule: { day: string; time: string }[];
  trialPrice: string;
  trialLength: string;
  trialAvailable: boolean;
}

export interface CampService extends ServiceBase {
  type: "camp";
  dateRange: string;
  priceMin: string;
  priceMax: string;
  unit: string;
}

export interface PartyService extends ServiceBase {
  type: "party";
  tiers: { name: string; price: string }[];
  fromPrice: string;
}

export interface ProductService extends ServiceBase {
  type: "product";
  optionsCount: number;
  fromPrice: string;
  image?: string;
}

export type Service =
  | EnrollmentService
  | CampService
  | PartyService
  | ProductService;

export interface ServiceSection {
  id: string;
  heading: string;
  services: Service[];
}

export const SERVICE_SECTIONS: ServiceSection[] = [
  {
    id: "enrollments",
    heading: "Enrollments",
    services: [
      {
        id: "waddlers",
        type: "enrollment",
        title: "Waddlers",
        schedule: [
          { day: "Mon", time: "3:00 PM" },
          { day: "Wed", time: "3:00 PM" },
          { day: "Fri", time: "3:00 PM" },
        ],
        trialPrice: "$5.00",
        trialLength: "1-weeks trial",
        trialAvailable: true,
      },
      {
        id: "little-bunnies",
        type: "enrollment",
        title: "Little Bunnies",
        schedule: [
          { day: "Tue", time: "10:00 AM" },
          { day: "Thu", time: "10:00 AM" },
        ],
        trialPrice: "$8.00",
        trialLength: "2-weeks trial",
        trialAvailable: true,
      },
      {
        id: "champions",
        type: "enrollment",
        title: "Champions",
        schedule: [
          { day: "Mon", time: "5:00 PM" },
          { day: "Wed", time: "5:00 PM" },
          { day: "Sat", time: "9:00 AM" },
        ],
        trialPrice: "$10.00",
        trialLength: "1-week trial",
        trialAvailable: false,
      },
    ],
  },
  {
    id: "camps",
    heading: "Camps & Events",
    services: [
      {
        id: "summer",
        type: "camp",
        title: "Summer Camp",
        dateRange: "Jul 1 – Aug 30",
        priceMin: "$5.00",
        priceMax: "$10.00",
        unit: "session",
      },
      {
        id: "winter",
        type: "camp",
        title: "Winter Camp",
        dateRange: "Dec 20 – Jan 5",
        priceMin: "$8.00",
        priceMax: "$15.00",
        unit: "session",
      },
      {
        id: "spring-break",
        type: "camp",
        title: "Spring Break",
        dateRange: "Mar 25 – Apr 5",
        priceMin: "$6.00",
        priceMax: "$12.00",
        unit: "session",
      },
    ],
  },
  {
    id: "parties",
    heading: "Parties",
    services: [
      {
        id: "birthday",
        type: "party",
        title: "Birthday Party",
        tiers: [{ name: "VIP", price: "$199.00" }],
        fromPrice: "$199.00",
      },
      {
        id: "themed",
        type: "party",
        title: "Themed Party",
        tiers: [{ name: "Superhero", price: "$249.00" }],
        fromPrice: "$249.00",
      },
      {
        id: "graduation",
        type: "party",
        title: "Graduation Party",
        tiers: [{ name: "Deluxe", price: "$299.00" }],
        fromPrice: "$299.00",
      },
    ],
  },
  {
    id: "products",
    heading: "Products",
    services: [
      { id: "t-shirts", type: "product", title: "T Shirts", optionsCount: 9, fromPrice: "$5.00", image: "/tshirt.svg" },
      { id: "water-bottles", type: "product", title: "Water Bottles", optionsCount: 5, fromPrice: "$12.00", image: "/waterbottle.svg" },
      { id: "gym-bags", type: "product", title: "Gym Bags", optionsCount: 4, fromPrice: "$29.99", image: "/gymbag.svg" },
      { id: "resistance-bands", type: "product", title: "Resistance Bands", optionsCount: 6, fromPrice: "$8.99", image: "/resistanceband.svg" },
      { id: "yoga-mats", type: "product", title: "Yoga Mats", optionsCount: 3, fromPrice: "$19.99", image: "/yogamat.svg" },
      { id: "towels", type: "product", title: "Gym Towels", optionsCount: 4, fromPrice: "$9.99", image: "/towel.svg" },
      { id: "baseball-caps", type: "product", title: "Baseball Caps", optionsCount: 7, fromPrice: "$14.99", image: "/cap.svg" },
      { id: "shorts", type: "product", title: "Athletic Shorts", optionsCount: 8, fromPrice: "$24.99", image: "/shorts.svg" },
      { id: "shaker-bottles", type: "product", title: "Protein Shakers", optionsCount: 5, fromPrice: "$11.99", image: "/shakerbottle.svg" },
    ],
  },
];

export interface Category {
  id: string;
  label: string;
  icon: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  { id: "enrollments", label: "Enrollments", icon: "🎓", count: 3 },
  { id: "camps", label: "Camps", icon: "⛺", count: 3 },
  { id: "parties", label: "Parties", icon: "🎉", count: 3 },
  { id: "products", label: "Products", icon: "🛍️", count: 9 },
];

