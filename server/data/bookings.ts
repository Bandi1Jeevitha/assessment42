export interface Booking {
  id: string;
  experienceId: string;
  slotId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  participants: number;
  totalPrice: number;
  discountApplied: number;
  promoCode: string | null;
  createdAt: Date;
  status: "confirmed" | "pending" | "cancelled";
}

const bookings: Map<string, Booking> = new Map();

function generateBookingId(): string {
  return "BK" + Date.now() + Math.random().toString(36).substr(2, 9);
}

export function createBooking(
  data: Omit<Booking, "id" | "createdAt" | "status">,
): Booking {
  const booking: Booking = {
    ...data,
    id: generateBookingId(),
    createdAt: new Date(),
    status: "confirmed",
  };
  bookings.set(booking.id, booking);
  return booking;
}

export function getBooking(id: string): Booking | undefined {
  return bookings.get(id);
}

export function getBookingsByEmail(email: string): Booking[] {
  return Array.from(bookings.values()).filter((b) => b.email === email);
}

export function getAllBookings(): Booking[] {
  return Array.from(bookings.values());
}

export function checkSlotAvailability(
  experienceId: string,
  slotId: string,
): boolean {
  const slotBookings = Array.from(bookings.values()).filter(
    (b) => b.experienceId === experienceId && b.slotId === slotId,
  );
  const totalParticipants = slotBookings.reduce(
    (sum, b) => sum + b.participants,
    0,
  );
  // Assuming max 50 people per slot (you can adjust this)
  return totalParticipants < 50;
}
