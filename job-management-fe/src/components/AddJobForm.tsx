import React, { useState } from "react";
import { Job, SubItem } from "../types";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface AddJobFormProps {
  onJobAdded: (job: Job) => void;
  onCancel: () => void;
}

const AddJobForm: React.FC<AddJobFormProps> = ({ onJobAdded, onCancel }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [subItems, setSubItems] = useState<SubItem[]>([]);

  const handleAddSubItem = () => {
    setSubItems([
      ...subItems,
      { itemId: crypto.randomUUID(), title: "", description: "", status: "Pending" },
    ]);
  };

  const handleChangeSubItem = (
    index: number,
    field: keyof SubItem,
    value: string
  ) => {
    const updatedSubItems = [...subItems];
    updatedSubItems[index][field] = value as any;
    setSubItems(updatedSubItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: crypto.randomUUID(),
      title,
      description,
      subItems,
    };
    onJobAdded(newJob);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        marginBottom: 3,
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Add New Job
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Sub-Items
      </Typography>
      {subItems.map((subItem, index) => (
        <Box
          key={subItem.itemId}
          sx={{
            marginBottom: 2,
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Sub-Item Title"
                value={subItem.title}
                onChange={(e) =>
                  handleChangeSubItem(index, "title", e.target.value)
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Sub-Item Description"
                value={subItem.description}
                onChange={(e) =>
                  handleChangeSubItem(index, "description", e.target.value)
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={subItem.status}
                  onChange={(e) =>
                    handleChangeSubItem(index, "status", e.target.value)
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="InProgress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAddSubItem}
        sx={{ marginTop: 2 }}
      >
        Add Sub-Item
      </Button>
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddJobForm;
