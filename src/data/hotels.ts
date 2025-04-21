
export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  beds: number;
  bathrooms: number;
  size: number; // in square feet
  amenities: string[];
  images: string[];
  availableDates?: Date[];
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  rating: number;
  images: string[];
  features: string[];
  overview: string;
  rooms: Room[];
}

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Manthokha Waterfall Resort",
    description: "A luxury resort offering panoramic views of the Manthokha Waterfall.",
    location: "500m from Manthokha Waterfall, Kharmang, Gilgit-Baltistan",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1200&h=800"
    ],
    features: [
      "In-house restaurant with local and international cuisine",
      "Guided waterfall tours",
      "Spa and wellness center",
      "Free Wi-Fi in all areas",
      "Airport shuttle service"
    ],
    overview: "Nestled just 500 meters away from the magnificent Manthokha Waterfall, our resort offers a perfect blend of luxury and nature. Wake up to the soothing sounds of the waterfall and enjoy breathtaking views from your room. Our dedicated staff ensures a comfortable and memorable stay for all our guests.",
    rooms: [
      {
        id: 101,
        name: "Waterfall View Deluxe",
        description: "Spacious room with direct views of Manthokha Waterfall and modern amenities.",
        price: 15000,
        capacity: 2,
        beds: 1,
        bathrooms: 1,
        size: 350,
        amenities: ["Air Conditioning", "Flat-screen TV", "Private Balcony", "Mini Bar", "Free Wi-Fi"],
        images: [
          "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: 102,
        name: "Mountain View Suite",
        description: "Luxury suite with panoramic mountain views and separate living area.",
        price: 25000,
        capacity: 3,
        beds: 2,
        bathrooms: 2,
        size: 550,
        amenities: ["Air Conditioning", "Flat-screen TV", "Private Balcony", "Mini Bar", "Free Wi-Fi", "Jacuzzi", "Kitchenette"],
        images: [
          "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=600"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Kharmang Valley Inn",
    description: "A charming inn offering cozy accommodations with spectacular nature views.",
    location: "1km from Manthokha Waterfall, Kharmang Valley Road",
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&h=800"
    ],
    features: [
      "Traditional Pakistan cuisine restaurant",
      "Garden with seating area",
      "Trekking and hiking tours",
      "Free Wi-Fi in common areas",
      "24-hour front desk"
    ],
    overview: "Kharmang Valley Inn offers a peaceful retreat in the heart of Gilgit-Baltistan. Our inn combines traditional architecture with modern comfort to provide a unique staying experience. Enjoy the serene environment and the hospitality of the local staff.",
    rooms: [
      {
        id: 201,
        name: "Standard Twin Room",
        description: "Cozy room with twin beds and valley views.",
        price: 8000,
        capacity: 2,
        beds: 2,
        bathrooms: 1,
        size: 250,
        amenities: ["Heating", "TV", "Mountain View", "Free Wi-Fi", "Tea/Coffee Maker"],
        images: [
          "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: 202,
        name: "Family Room",
        description: "Spacious room suitable for families with children.",
        price: 12000,
        capacity: 4,
        beds: 2,
        bathrooms: 1,
        size: 400,
        amenities: ["Heating", "TV", "Mountain View", "Free Wi-Fi", "Tea/Coffee Maker", "Extra Bedding"],
        images: [
          "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=600"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Gilgit Serenity Lodge",
    description: "Modern lodge with traditional touches, perfect for nature lovers.",
    location: "1.5km from Manthokha Waterfall, Gilgit Main Road",
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&h=800"
    ],
    features: [
      "Rooftop dining with waterfall views",
      "Cultural programs on weekends",
      "Board games and indoor entertainment",
      "Bicycle rental",
      "Laundry service"
    ],
    overview: "Gilgit Serenity Lodge combines modern comfort with traditional hospitality. Located at a convenient distance from the Manthokha Waterfall, our lodge offers comfortable rooms, excellent dining options, and various activities for a memorable stay.",
    rooms: [
      {
        id: 301,
        name: "Deluxe Double Room",
        description: "Elegant room with a double bed and modern amenities.",
        price: 12000,
        capacity: 2,
        beds: 1,
        bathrooms: 1,
        size: 300,
        amenities: ["Air Conditioning", "Flat-screen TV", "Work Desk", "Mini Fridge", "Free Wi-Fi", "Tea/Coffee Maker"],
        images: [
          "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=600"
        ]
      },
      {
        id: 302,
        name: "Premium Suite",
        description: "Luxury suite with separate living room and dining area.",
        price: 20000,
        capacity: 2,
        beds: 1,
        bathrooms: 2,
        size: 500,
        amenities: ["Air Conditioning", "Flat-screen TV", "Work Desk", "Mini Fridge", "Free Wi-Fi", "Bathtub", "Dining Area", "Premium Toiletries"],
        images: [
          "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&h=600"
        ]
      }
    ]
  }
];

export const featuredHotels = hotels.slice(0, 2);
export const featuredRooms = hotels.flatMap(hotel => hotel.rooms.slice(0, 1));
