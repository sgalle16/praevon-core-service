import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import propertiesRouter from "./routes/properties.js";
import rentalsRouter from "./routes/rentals.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const coreServiceRouter = express.Router();

coreServiceRouter.use('/auth', authRouter);
coreServiceRouter.use('/users', userRouter);
coreServiceRouter.use('/properties', propertiesRouter);
coreServiceRouter.use('/rentals', rentalsRouter);

app.use('/api/core-service/v1', coreServiceRouter);

app.get('/health', (req, res) => res.json({
    ok:true
}));

app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Core service running on http://localhost:${PORT}`);
});