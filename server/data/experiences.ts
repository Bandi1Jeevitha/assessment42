export interface Experience {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  duration: string;
  maxParticipants: number;
  highlights: string[];
  availableSlots: Array<{
    id: string;
    date: string;
    time: string;
    available: number;
  }>;
}

const experiencesData: Experience[] = [
  {
    id: "1",
    title: "Mountain Hiking Adventure",
    description: "Experience breathtaking mountain views on this guided hike",
    longDescription:
      "Join us for an unforgettable mountain hiking adventure. Our experienced guides will lead you through stunning alpine trails with spectacular views. This experience is perfect for nature lovers and fitness enthusiasts.",
    location: "Colorado Rocky Mountains",
    price: 85,
    rating: 4.8,
    reviews: 324,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    duration: "6 hours",
    maxParticipants: 12,
    highlights: [
      "Guided hike with professional mountain guide",
      "Lunch and refreshments included",
      "All necessary equipment provided",
      "Photography opportunities at scenic viewpoints",
    ],
    availableSlots: [
      { id: "1-1", date: "2025-02-15", time: "8:00 AM", available: 5 },
      { id: "1-2", date: "2025-02-16", time: "8:00 AM", available: 8 },
      { id: "1-3", date: "2025-02-17", time: "8:00 AM", available: 3 },
      { id: "1-4", date: "2025-02-22", time: "8:00 AM", available: 0 },
      { id: "1-5", date: "2025-02-23", time: "8:00 AM", available: 7 },
    ],
  },
  {
    id: "2",
    title: "Sunset Beach Yoga Retreat",
    description: "Relax with yoga and meditation by the ocean",
    longDescription:
      "Experience tranquility with our beachfront yoga and meditation retreat. Practice yoga while watching the sunset over the ocean, followed by a peaceful meditation session and healthy snacks.",
    location: "Malibu Beach, California",
    price: 65,
    rating: 4.9,
    reviews: 512,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    duration: "2.5 hours",
    maxParticipants: 20,
    highlights: [
      "Guided yoga session with certified instructor",
      "Meditation and breathing exercises",
      "Healthy snacks and beverages",
      "Beach access and sunset viewing",
    ],
    availableSlots: [
      { id: "2-1", date: "2025-02-14", time: "4:30 PM", available: 10 },
      { id: "2-2", date: "2025-02-15", time: "4:30 PM", available: 8 },
      { id: "2-3", date: "2025-02-18", time: "4:30 PM", available: 12 },
      { id: "2-4", date: "2025-02-19", time: "4:30 PM", available: 6 },
      { id: "2-5", date: "2025-02-21", time: "4:30 PM", available: 15 },
    ],
  },
  {
    id: "3",
    title: "Culinary Tour & Wine Tasting",
    description: "Explore local cuisine and fine wines",
    longDescription:
      "Discover the flavors of the region on this gourmet culinary tour. Visit local farms, artisan producers, and renowned restaurants while learning about wine pairing and traditional cooking techniques.",
    location: "Napa Valley, California",
    price: 150,
    rating: 4.7,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1504674900769-e71fada305e0?w=800&h=600&fit=crop",
    duration: "4 hours",
    maxParticipants: 10,
    highlights: [
      "Visit 3 local vineyards with expert sommeliers",
      "Gourmet lunch at a Michelin-recommended restaurant",
      "Wine education and tasting notes",
      "Local delicacies and artisanal cheese board",
    ],
    availableSlots: [
      { id: "3-1", date: "2025-02-16", time: "11:00 AM", available: 4 },
      { id: "3-2", date: "2025-02-17", time: "11:00 AM", available: 2 },
      { id: "3-3", date: "2025-02-20", time: "11:00 AM", available: 8 },
      { id: "3-4", date: "2025-02-23", time: "11:00 AM", available: 5 },
      { id: "3-5", date: "2025-02-24", time: "11:00 AM", available: 10 },
    ],
  },
  {
    id: "4",
    title: "Urban Street Art Walking Tour",
    description: "Discover hidden street art and local culture",
    longDescription:
      "Explore the vibrant street art scene of the city with an expert guide. Learn about different artists, techniques, and the stories behind iconic murals. Visit galleries and meet local artists.",
    location: "Los Angeles, California",
    price: 45,
    rating: 4.6,
    reviews: 287,
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
    duration: "3 hours",
    maxParticipants: 15,
    highlights: [
      "Expert guide specializing in street art history",
      "Visit to local artist studios and galleries",
      "Photo opportunities at famous murals",
      "Complimentary refreshments",
    ],
    availableSlots: [
      { id: "4-1", date: "2025-02-15", time: "10:00 AM", available: 8 },
      { id: "4-2", date: "2025-02-18", time: "10:00 AM", available: 12 },
      { id: "4-3", date: "2025-02-19", time: "10:00 AM", available: 9 },
      { id: "4-4", date: "2025-02-22", time: "10:00 AM", available: 14 },
      { id: "4-5", date: "2025-02-24", time: "10:00 AM", available: 11 },
    ],
  },
  {
    id: "5",
    title: "Scuba Diving for Beginners",
    description: "Learn scuba diving in a safe, controlled environment",
    longDescription:
      "Perfect for beginners, this scuba diving course teaches you the basics in a controlled environment before exploring the reef. Our certified instructors ensure a safe and enjoyable experience.",
    location: "Great Barrier Reef, Australia",
    price: 200,
    rating: 4.9,
    reviews: 456,
    image:
      "https://images.unsplash.com/photo-1583212192562-40c696a6d5d0?w=800&h=600&fit=crop",
    duration: "Full day (8 hours)",
    maxParticipants: 8,
    highlights: [
      "Certified scuba diving instructor",
      "All diving equipment provided",
      "Reef exploration and marine life viewing",
      "Lunch and underwater photography",
    ],
    availableSlots: [
      { id: "5-1", date: "2025-02-15", time: "7:00 AM", available: 3 },
      { id: "5-2", date: "2025-02-17", time: "7:00 AM", available: 5 },
      { id: "5-3", date: "2025-02-19", time: "7:00 AM", available: 2 },
      { id: "5-4", date: "2025-02-21", time: "7:00 AM", available: 4 },
      { id: "5-5", date: "2025-02-23", time: "7:00 AM", available: 6 },
    ],
  },
];

export function getExperiences(): Experience[] {
  return experiencesData;
}

export function getExperienceById(id: string): Experience | undefined {
  return experiencesData.find((exp) => exp.id === id);
}
