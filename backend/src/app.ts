import express from "express";
import { errorHandler } from "./api/middleware/handle-error";
import { authRouter } from "./api/router/signup-router";
import { buyerRouter } from "./api/router/buyer-router";
import { sellerRouter } from "./api/router/seller-router";
import { storeRouter } from "./api/router/store-router";
import { productRouter } from "./api/router/product-router";
import { orderRouter } from "./api/router/order-router";
import { validateAuthorization } from "./api/middleware/validate-authorization";
import { deliveryPartnerRouter } from "./api/router/delivery-partner-router";
import { homeRouter } from "./api/router/home-router";
import { SignupUsecase } from "./application/usecase/auth/SignupUsecase";
import { UserRepository } from "./infrastructure/repository/UserRepository";

const app = express();

const BASE_API_URL = "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/welcome", (req, res) => {
  res.send("You are welcome to our rest api");
});

app.get("/", async (req, res) => {
  const users = [
    { email: "amit.sharma@gmail.com", password: "123456", role: "buyer" },
    { email: "neha.pandey@gmail.com", password: "123456", role: "seller" },
    {
      email: "rohan.gupta@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "isha.kaur@gmail.com", password: "123456", role: "buyer" },
    { email: "priya.verma@gmail.com", password: "123456", role: "seller" },
    {
      email: "vikram.singh@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "ankita.rana@gmail.com", password: "123456", role: "buyer" },
    { email: "mohit.bajaj@gmail.com", password: "123456", role: "seller" },
    {
      email: "sunita.dubey@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "darshan.patel@gmail.com", password: "123456", role: "buyer" },
    {
      email: "shruti.khandelwal@gmail.com",
      password: "123456",
      role: "seller",
    },
    {
      email: "naveen.mehra@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "kriti.joshi@gmail.com", password: "123456", role: "buyer" },
    { email: "parth.sawant@gmail.com", password: "123456", role: "seller" },
    {
      email: "laxmi.chopra@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "tanya.nair@gmail.com", password: "123456", role: "buyer" },
    { email: "yash.pandita@gmail.com", password: "123456", role: "seller" },
    {
      email: "manish.kumar@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "aarti.singhal@gmail.com", password: "123456", role: "buyer" },
    { email: "rahul.jain@gmail.com", password: "123456", role: "seller" },
    {
      email: "megha.rathi@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "pranav.garg@gmail.com", password: "123456", role: "buyer" },
    { email: "neelam.mahajan@gmail.com", password: "123456", role: "seller" },
    {
      email: "vikas.agarwal@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "richa.saxena@gmail.com", password: "123456", role: "buyer" },
    { email: "aditya.tiwari@gmail.com", password: "123456", role: "seller" },
    {
      email: "sona.kapoor@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "deepika.shah@gmail.com", password: "123456", role: "buyer" },
    { email: "tarun.rao@gmail.com", password: "123456", role: "seller" },
    {
      email: "kunal.verghese@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "radha.menon@gmail.com", password: "123456", role: "buyer" },
    { email: "sandeep.kaur@gmail.com", password: "123456", role: "seller" },
    {
      email: "ritu.chawla@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "aman.jha@gmail.com", password: "123456", role: "buyer" },
    { email: "rekha.garg@gmail.com", password: "123456", role: "seller" },
    {
      email: "harish.soni@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "pallavi.rao@gmail.com", password: "123456", role: "buyer" },
    { email: "nikhil.chaudhary@gmail.com", password: "123456", role: "seller" },
    {
      email: "geeta.das@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "ramya.venkat@gmail.com", password: "123456", role: "buyer" },
    { email: "vijay.kale@gmail.com", password: "123456", role: "seller" },
    {
      email: "ritu.gupta@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "omprakash.verma@gmail.com", password: "123456", role: "buyer" },
    { email: "sanaya.pandit@gmail.com", password: "123456", role: "seller" },
    {
      email: "kapil.mehta@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "nitya.sharma@gmail.com", password: "123456", role: "buyer" },
    { email: "rajesh.yadav@gmail.com", password: "123456", role: "seller" },
    {
      email: "anita.narayan@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "saurabh.khan@gmail.com", password: "123456", role: "buyer" },
    { email: "meera.kothari@gmail.com", password: "123456", role: "seller" },
    {
      email: "bhavesh.shinde@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "kritika.saxena@gmail.com", password: "123456", role: "buyer" },
    { email: "rakesh.gupta@gmail.com", password: "123456", role: "seller" },
    {
      email: "neha.choudhary@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "mukul.arora@gmail.com", password: "123456", role: "buyer" },
    { email: "vidya.singh@gmail.com", password: "123456", role: "seller" },
    {
      email: "sumit.khandelwal@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "raji.bose@gmail.com", password: "123456", role: "buyer" },
    { email: "chirag.patel@gmail.com", password: "123456", role: "seller" },
    {
      email: "sarthak.verma@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "isha.dhawan@gmail.com", password: "123456", role: "buyer" },
    { email: "anil.tripathi@gmail.com", password: "123456", role: "seller" },
    {
      email: "mona.jain@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "gopal.rao@gmail.com", password: "123456", role: "buyer" },
    { email: "pinky.khanna@gmail.com", password: "123456", role: "seller" },
    {
      email: "vinay.agarwal@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "neelam.patel@gmail.com", password: "123456", role: "buyer" },
    { email: "rajat.sharma@gmail.com", password: "123456", role: "seller" },
    {
      email: "sneha.gupta@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "vivek.singh@gmail.com", password: "123456", role: "buyer" },
    { email: "ritu.tandon@gmail.com", password: "123456", role: "seller" },
    {
      email: "aman.kapoor@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "shreya.jain@gmail.com", password: "123456", role: "buyer" },
    {
      email: "sumana.chatterjee@gmail.com",
      password: "123456",
      role: "seller",
    },
    {
      email: "harsha.malik@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "pratik.singh@gmail.com", password: "123456", role: "buyer" },
    { email: "rajeev.verma@gmail.com", password: "123456", role: "seller" },
    {
      email: "tina.patel@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "milind.kumar@gmail.com", password: "123456", role: "buyer" },
    { email: "vandana.chauhan@gmail.com", password: "123456", role: "seller" },
    {
      email: "karan.jain@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "anupama.verma@gmail.com", password: "123456", role: "buyer" },
    { email: "jaydeep.shah@gmail.com", password: "123456", role: "seller" },
    {
      email: "richa.pandey@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "niraj.garg@gmail.com", password: "123456", role: "buyer" },
    { email: "sonia.doshi@gmail.com", password: "123456", role: "seller" },
    {
      email: "uttam.rana@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "praveen.singh@gmail.com", password: "123456", role: "buyer" },
    { email: "anjali.tiwari@gmail.com", password: "123456", role: "seller" },
    {
      email: "raja.khan@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "meenal.oswal@gmail.com", password: "123456", role: "buyer" },
    { email: "shyam.prasad@gmail.com", password: "123456", role: "seller" },
    {
      email: "deepa.chatterjee@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "amanita.rao@gmail.com", password: "123456", role: "buyer" },
    { email: "vikrant.patel@gmail.com", password: "123456", role: "seller" },
    {
      email: "joyeeta.mazumdar@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "rakesh.tandon@gmail.com", password: "123456", role: "buyer" },
    { email: "neeta.mahajan@gmail.com", password: "123456", role: "seller" },
    {
      email: "rahul.kumar@gmail.com",
      password: "123456",
      role: "delivery_partner",
    },
    { email: "pallav.parekh@gmail.com", password: "123456", role: "buyer" },
  ];
  const signupUser = new SignupUsecase(new UserRepository());
  for (const user of users) {
    const response = await signupUser.execute(user);
    console.log(response);
  }
  res.send("Multiple users created");
});

app.use(`${BASE_API_URL}/auth`, authRouter);
app.use(`${BASE_API_URL}/buyer`, validateAuthorization, buyerRouter);
app.use(`${BASE_API_URL}/seller`, validateAuthorization, sellerRouter);
app.use(
  `${BASE_API_URL}/delivery-partner`,
  validateAuthorization,
  deliveryPartnerRouter
);
app.use(`${BASE_API_URL}/store`, storeRouter);
app.use(`${BASE_API_URL}/product`, productRouter);
app.use(`${BASE_API_URL}/order`, validateAuthorization, orderRouter);
app.use(`${BASE_API_URL}`, homeRouter);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}${BASE_API_URL}`);
});
