import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TransactionCard from "../components/TransactionCard";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Colors } from "../components/Colors";
import { CustomFormControl, CustomInputDate } from "../components/CustomInput";
import moment from "moment";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../components/fire";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
const History = () => {
  const [value, setValue] = useState(moment());
  const [view, setView] = useState("");
  const [trans, setTrans] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFilter = (e) => {
    e.preventDefault();

    setLoading(true);
    if (view?.length > 2) {
      const q = query(
        collection(db, "transaction"),
        where("date", "==", moment(value).format("DD-MM-YYYY"))
      );
      onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setTrans(
          data.sort(
            (a, b) =>
              moment(b?.date, "DD-MM-YYYY") - moment(a?.date, "DD-MM-YYYY")
          )
        );
        setLoading(false);
      });
    } else {
      const q = query(
        collection(db, "transaction"),
        where("for", "==", moment(value).format("MM-YYYY"))
      );
      onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setTrans(
          data.sort(
            (a, b) =>
              moment(b?.date, "DD-MM-YYYY") - moment(a?.date, "DD-MM-YYYY")
          )
        );
        setLoading(false);
      });
    }
  };

  return (
    <Box>
      <Box component={"form"} onSubmit={(e) => handleFilter(e)}>
        <Typography variant="h4">Filter History</Typography>
        <Box
          sx={{
            mt: 3,
            width: { md: "95%", lg: "88%" },
            display: { xs: "block", sm: "flex" },
            columnGap: 5,
          }}
        >
          <CustomFormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={view}
              required
              label="Filter By"
              onChange={(e) => {
                setView(e.target.value?.split(","));
              }}
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value={"month,year"}>Month, Year</MenuItem>
              <MenuItem value={"day,month,year"}>Day, Month, Year</MenuItem>
            </Select>
          </CustomFormControl>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <CustomInputDate
              sx={{ width: "100%", mt: { xs: 2, sm: 0 } }}
              value={value}
              label={view ? view?.toString() : "day,month,year"}
              views={view ? view : ["day", "month", "year"]}
              openTo={view ? view[0] : "month"}
              disableFuture
              format="DD-MM-YYYY"
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            size="large"
            type="submit"
            variant="contained"
            sx={{
              width: { xs: "100%", sm: "20%" },
              backgroundColor: Colors.primary,
              "&:hover": {
                backgroundColor: Colors.hover,
              },
            }}
          >
            {loading ? "Please wait" : "Query"}
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        {loading && <Loader />}
        {!loading && (
          <>
            {trans?.length > 0 && (
              <Typography variant="h4">Transaction History</Typography>
            )}
            {trans?.map((t, i) => (
              <TransactionCard key={i} data={t} />
            ))}
            {trans?.length <= 0 && (
              <Typography mt={15} textAlign={"center"} variant="h6">
                No transaction available for selected period. Please Try again
              </Typography>
            )}

            {!trans && (
              <Typography mt={15} textAlign={"center"} variant="h6">
                Please filter to view Transaction History
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default History;
