import { FormControl, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { Colors } from "./Colors";
export const CustomInput = styled(TextField)({
	"& label.Mui-focused": {
		color: Colors.primary,
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			border: "none",
			borderBottom: `1px solid ${Colors.hover}`,
		},
		"&:hover fieldset": {
			borderColor: Colors.hover,
		},
		"&.Mui-focused fieldset": {
			borderColor: Colors.primary,
		},
	},
});

export const CustomInputFull = styled(TextField)({
	"& label.Mui-focused": {
		color: Colors.primary,
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			// borderBottom: `1px solid ${Colors.hover}`,
		},
		"&:hover fieldset": {
			borderColor: Colors.hover,
		},
		"&.Mui-focused fieldset": {
			borderColor: Colors.primary,
		},
	},
});

export const CustomSelect = styled(Select)(({ theme }) => ({
	"& label.Mui-focused": {
		color: Colors.primary,
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			// borderBottom: `1px solid ${Colors.hover}`,
		},
		"&:hover fieldset": {
			borderColor: Colors.hover,
		},
		"&.Mui-focused fieldset": {
			borderColor: Colors.primary,
		},
	},
}));

export const CustomFormControl = styled(FormControl)(({ theme }) => ({
	"& label.Mui-focused": {
		color: Colors.primary,
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			// borderBottom: `1px solid ${Colors.hover}`,
		},
		"&:hover fieldset": {
			borderColor: Colors.hover,
		},
		"&.Mui-focused fieldset": {
			borderColor: Colors.primary,
		},
	},
}));

export const CustomInputDate = styled(DatePicker)({
	"& label.Mui-focused": {
		color: Colors.primary,
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			// borderBottom: `1px solid ${Colors.hover}`,
		},
		"&:hover fieldset": {
			borderColor: Colors.hover,
		},
		"&.Mui-focused fieldset": {
			borderColor: Colors.primary,
		},
	},
});
