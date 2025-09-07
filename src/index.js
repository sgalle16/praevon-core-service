import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/health', (req, res) => res.json({
    ok:true
}));

app.listen(PORT, ()=>{
    console.log(`Core service running on http://localhost:${PORT}`);
});