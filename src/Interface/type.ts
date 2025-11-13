export interface Type {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Med" | "High";
  status: "Open" | "Closed";
  createdAt: string;
}



