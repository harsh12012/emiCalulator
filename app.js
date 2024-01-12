
const express = require('express');
const { calculateEMI, isEMIAvailable } = require('./emiCalculator');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/calculate-emi', (req, res) => {

  const { Booking_date, Check_In_date, Amount } = req.body;
  const emi_available = isEMIAvailable(Booking_date, Check_In_date);
  const emiData = emi_available ? calculateEMI(Booking_date, Amount, Check_In_date) : [];

  res.json({
    emi_available,
    data: emiData,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
