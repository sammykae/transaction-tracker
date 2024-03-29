import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment/moment";
import { Colors } from "../components/Colors";
import { CustomInputFull, CustomInputDate } from "../components/CustomInput";
import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../components/fire";

const CreateExpense = () => {
  const [value, setValue] = useState(moment());
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const setExpense = async (e) => {
    e.preventDefault();
    if (loading) {
      toast.warning("Please Wait");
      return;
    }
    setLoading(true);
    if (moment().month() > value?.month()) {
      if (value.diff(moment(), "days") < -5) {
        toast.info("You can't record Expense for this date any longer");
        setLoading(false);
        return;
      }
    } else {
      await setDoc(doc(db, "transaction", ` ${moment().valueOf()}`), {
        amount: amount,
        for: value.format("MM-YYYY"),
        type: "exp",
        desc: desc,
        date: value.format("DD-MM-YYYY"),
      })
        .then(() => {
          setAmount("");
          setDesc("");
          toast.success("Expense Recorded Successfully");
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err?.code);
          setLoading(false);
        });
    }
  };

  return (
    <Box component={"form"} onSubmit={setExpense}>
      <Typography variant="h4">Record Expense</Typography>
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
          label="Enter Expense amount"
        />

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CustomInputDate
            sx={{ width: "100%", mt: { xs: 2, sm: 0 } }}
            label="Select Date"
            value={value}
            disableFuture
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          mt: 3,
          width: { md: "95%", lg: "88%" },

          columnGap: 5,
        }}
      >
        <CustomInputFull
          fullWidth
          required
          multiline
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          maxRows={2}
          label="Enter Description"
        />
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
          {loading ? "Please wait" : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateExpense;
