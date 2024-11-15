import React from "react";
import { SubItem } from "../types";

interface SubItemListProps {
  subItems: SubItem[];
}

const SubItemList: React.FC<SubItemListProps> = ({ subItems }) => {
  const getStatusColor = (status: SubItem["status"]): string => {
    switch (status) {
      case "Pending":
        return "red";
      case "InProgress":
        return "orange";
      case "Completed":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <ul>
      {subItems.map((item) => (
        <li key={item.itemId} style={{ color: getStatusColor(item.status) }}>
          <strong>{item.title}</strong>: {item.description} ({item.status})
        </li>
      ))}
    </ul>
  );
};

export default SubItemList;
