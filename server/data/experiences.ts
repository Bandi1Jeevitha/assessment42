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
    title: "Coorg Coffee Plantation Tour",
    description: "Experience the aroma of freshly brewed coffee in the hills",
    longDescription:
      "Immerse yourself in the serene beauty of Coorg's coffee plantations. Walk through lush green estates, learn about coffee cultivation, and enjoy freshly brewed filter coffee with local snacks. Perfect for nature lovers and coffee enthusiasts.",
    location: "Coorg, Karnataka",
    price: 1200,
    rating: 4.8,
    reviews: 324,
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&h=600&fit=crop",
    duration: "6 hours",
    maxParticipants: 12,
    highlights: [
      "Guided plantation tour with local experts",
      "Coffee picking and processing demonstration",
      "Traditional filter coffee and local snacks",
      "Scenic viewpoints perfect for photography",
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
    title: "Alleppey Houseboat Cruise",
    description: "Float through Kerala's tranquil backwaters",
    longDescription:
      "Experience the magical Kerala backwaters on a traditional houseboat. Cruise through serene canals, witness local life along the banks, and enjoy authentic Kerala cuisine onboard while surrounded by lush greenery and peaceful waters.",
    location: "Alleppey, Kerala",
    price: 3500,
    rating: 4.9,
    reviews: 512,
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop",
    duration: "2 days (overnight)",
    maxParticipants: 20,
    highlights: [
      "Traditional Kerala houseboat accommodation",
      "Sunset and sunrise views over backwaters",
      "Authentic Kerala meals included",
      "Village visits and local culture experience",
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
    title: "Mysore Palace Heritage Walk",
    description: "Explore the royal architecture and rich history",
    longDescription:
      "Discover the grandeur of Mysore Palace, one of India's most magnificent royal residences. Walk through ornate halls, learn about the Wadiyar dynasty, and witness the stunning illuminated palace during special occasions.",
    location: "Mysore, Karnataka",
    price: 800,
    rating: 4.7,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1581344342228-68cd52c54c36?w=800&h=600&fit=crop",
    duration: "4 hours",
    maxParticipants: 10,
    highlights: [
      "Expert guide sharing palace history",
      "Visit to Durbar Hall and royal chambers",
      "Traditional art and architecture insights",
      "Sound and light show in the evenings",
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
    title: "Ooty Hill Station Adventure",
    description: "Escape to the Queen of Hill Stations",
    longDescription:
      "Experience the cool climate and scenic beauty of Ooty. Visit tea gardens, botanical gardens, and lakes while enjoying local cuisine. A perfect retreat from the city heat with breathtaking mountain views and colonial charm.",
    location: "Ooty, Tamil Nadu",
    price: 1500,
    rating: 4.6,
    reviews: 287,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    duration: "Full day (12 hours)",
    maxParticipants: 15,
    highlights: [
      "Tea plantation visit with factory tour",
      "Botanical gardens and rose garden",
      "Boat ride on Ooty Lake",
      "Traditional South Indian meals",
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
    title: "Hampi Ancient Temples Tour",
    description: "Discover the ruins of Vijayanagara Empire",
    longDescription:
      "Explore the UNESCO World Heritage Site of Hampi, home to ancient temples, royal structures, and fascinating ruins from the 14th-century Vijayanagara Empire. Walk through history and witness stunning architecture.",
    location: "Hampi, Karnataka",
    price: 2000,
    rating: 4.9,
    reviews: 456,
    image:
      "https://images.unsplash.com/photo-1528184039930-bd03972bd974?w=800&h=600&fit=crop",
    duration: "Full day (10 hours)",
    maxParticipants: 8,
    highlights: [
      "Certified heritage guide",
      "Visit to Virupaksha Temple and Vittala Temple",
      "Monkey Temple and sunset viewpoints",
      "Traditional South Indian lunch included",
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
