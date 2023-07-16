import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Colors } from "../components/Colors";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment/moment";
import { CustomInputFull, CustomInputDate } from "../components/CustomInput";
import { toast } from "react-toastify";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../components/fire";
const CreateBudget = () => {
  const [value, setValue] = useState(moment());
  const [amount, setAmount] = useState("");
  const [some, setSome] = useState(false);
  const [loading, setLoading] = useState(false);

  const setBudget = async (e) => {
    e.preventDefault();
    if (loading) {
      toast.warning("Please Wait");
      return;
    }
    setLoading(true);
    await setDoc(doc(db, "budget", value.format("MM-YYYY")), {
      amount: amount,
      for: value.format("MM-YYYY"),
    })
      .then(() => {
        toast.success("Budget Set Successfully");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.code);
      });
  };

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "budget", value.format("MM-YYYY"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAmount(docSnap?.data()?.amount);
        setSome(true);
        toast.info("Budget Already Exist");
      }
    };
    getData();
  }, [value]);

  //test
  return (
    <Box component={"form"} onSubmit={setBudget}>
      <Typography variant="h4">Set Budget</Typography>
      <Box
        sx={{
          mt: 3,
          width: { md: "95%", lg: "88%" },
          display: { xs: "block", sm: "flex" },
          columnGap: 5,
        }}
      >
        <CustomInputFull
          value={Number(amount) > 0 ? Number(amount) : ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          fullWidth
          required
          type={"number"}
          label="Enter Budget"
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CustomInputDate
            sx={{ width: "100%", mt: { xs: 2, sm: 0 } }}
            label="Select Date"
            value={value}
            disableFuture
            disablePast
            views={["month", "year"]}
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
            width: { xs: "100%", sm: "30vw", md: "20vw" },
            backgroundColor: Colors.primary,
            "&:hover": {
              backgroundColor: Colors.hover,
            },
          }}
        >
          {loading ? "Please Wait" : some ? "Edit Budget" : "Set Budget"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateBudget;
