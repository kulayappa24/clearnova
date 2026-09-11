export interface User {
  id: string;
  email: string;
  fullName: string;
  username?: string;
  phone?: string;
  role: 'ADMIN' | 'SANITATION_OFFICER' | 'WORKER' | 'CITIZEN';
  greenPoints?: number;
  rank?: number;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  role: 'ADMIN' | 'SANITATION_OFFICER' | 'WORKER' | 'CITIZEN';
  user: User;
}

// SWM 2026 Four-Stream Waste Rules
export type WasteStream2026 = 'WET' | 'DRY' | 'SANITARY' | 'SPECIAL_CARE' | 'REJECT';

export type BinStatus = 'NORMAL' | 'WARNING' | 'HIGH' | 'CRITICAL' | 'OFFLINE';

export interface Bin {
  id: string;
  binCode: string;
  name: string;
  locationDescription?: string;
  latitude?: number;
  longitude?: number;
  zone?: string;
  fillLevel: number;
  weightKg: number;
  temperature: number;
  status: BinStatus;
  criticalityScore: number;
  connectivity: 'ONLINE' | 'OFFLINE';
  lastSeen?: string;
  stream: WasteStream2026;
}

export interface AiPredictionResponse {
  category: string;
  confidence: number;
  stream: WasteStream2026;
  streamLabel: string;
  streamColor: string;
  disposalInstruction: string;
  inferenceTimeMs?: number;
  modelVersion?: string;
  developmentMode?: boolean;
  alternatives: { category: string; confidence: number; stream: WasteStream2026 }[];
}

export interface SanitizationTicket {
  id: string;
  ticketCode: string;
  locationCategory: 'WASHROOM' | 'CLASSROOM' | 'LABORATORY' | 'CANTEEN' | 'HOSTEL' | 'DRINKING_WATER' | 'WASTE_AREA' | 'OTHER';
  locationDetail: string;
  description: string;
  priorityScore: number; // Formula: Severity + Location sensitivity + Wait time + Repeat count
  priorityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'REPORTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'VERIFIED';
  reportedBy: string;
  assignedStaff?: string;
  createdAt: string;
  resolvedAt?: string;
  imagePath?: string;
}

export interface GreenLeaderboardUser {
  rank: number;
  name: string;
  department: string;
  points: number;
  badge: 'ECO_CHAMPION' | 'GREEN_AMBASSADOR' | 'ECO_WARRIOR' | 'RECYCLER';
  scansCount: number;
  reportsResolved: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
