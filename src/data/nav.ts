export interface NavLink {
  label: string;
  href: string;
}

export const SITE = {
  name: "[Your company]",
  initials: " ",
  address: "Walnut Creek, California, 94598, United States",
  fullAddress: "2256 Oak Grove Road, Walnut Creek, California, 94598",
  timezone: "America/Los_Angeles",
  email: "walnutcreek@test.com",
  // Dummy placeholder — swap for the real number when available.
  phone: "(925) 555-0142",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "All services", href: "#services" },
  { label: "Enrollments", href: "#services" },
  { label: "Class Cards", href: "#class-cards" },
  { label: "Camps", href: "#services" },
  { label: "Parties", href: "#services" },
  { label: "Products", href: "#services" },
  { label: "Trials", href: "#trials" },
  { label: "Calendar", href: "/calendar" },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Calendar", href: "/calendar" },
  { label: "Contact", href: "#contact" },
  { label: "About", href: "#about" },
];
