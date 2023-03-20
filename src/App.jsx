import { useEffect } from "react";
import "./App.scss";
import Routers from "./routes/Routers";

function App() {
	useEffect(() => {
		document.title = "Expense Tracker";
	}, []);
	return <Routers />;
}

export default App;
