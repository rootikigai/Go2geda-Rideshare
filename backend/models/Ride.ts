export interface Ride {
    id: number;
    driverId: number;
    origin: String;
    destination: String;
    departureTime: String;
    price: String;
    status: "SCHEDULED" | "ONGOING" | "COMPLETED" | "CANCELLED";    
}

export const rides: Ride[] = [];