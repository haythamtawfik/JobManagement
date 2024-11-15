export interface SubItem {
    itemId: string;
    title: string;
    description: string;
    status: "Pending" | "InProgress" | "Completed";
  }
  
  export interface Job {
    id: string;
    title: string;
    description: string;
    subItems: SubItem[];
  }
  