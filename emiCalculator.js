
function isEMIAvailable(bookingDate, checkInDate) {

  const bookingDateObj = new Date(bookingDate);
  const checkInDateObj = new Date(checkInDate);

  const timeDifference = checkInDateObj - bookingDateObj;
  const daysDifference = timeDifference / (1000 * 3600 * 24);


  console.log('daysDifference:', daysDifference);


  return daysDifference > 30;
}

// File: emiCalculator.js
function calculateEMI(bookingDate, amount, checkInDate) {
  const emiList = [];
  const initialEmiPercentage = 0.25;
  const remainingEmiPercentage = 0.75; 
  const emiIntervalDays = 7;

  const bookingDateObj = new Date(bookingDate);
  const checkInDateObj = new Date(checkInDate);

  const timeDifference = checkInDateObj - bookingDateObj;
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  if (daysDifference <= 30) {
    return emiList;
  }

  const firstEmiAmount = initialEmiPercentage * amount;

  const roundedFirstEmiAmount = parseFloat(firstEmiAmount.toFixed(2));

  amount -= roundedFirstEmiAmount;

  emiList.push({
    emi_date: bookingDateObj.toISOString().split('T')[0],
    amount: roundedFirstEmiAmount,
  });

  const remainingEmiAmount = remainingEmiPercentage * amount;
  const roundedRemainingEmiAmount = parseFloat(
    (remainingEmiAmount / Math.ceil(daysDifference / emiIntervalDays)).toFixed(2)
  );

  const remainingWeeks = Math.floor((daysDifference - 1) / emiIntervalDays);

  for (let i = 1; i <= remainingWeeks; i++) {
    const emiDate = new Date(bookingDateObj);
    emiDate.setDate(emiDate.getDate() + i * emiIntervalDays);

    emiList.push({
      emi_date: emiDate.toISOString().split('T')[0],
      amount: roundedRemainingEmiAmount,
    });
  }

  return emiList;
}

module.exports = { isEMIAvailable, calculateEMI };







