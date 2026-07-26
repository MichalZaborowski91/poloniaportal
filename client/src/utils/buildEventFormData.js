export const buildEventFormData = (formData) => {
  const data = new FormData();

  // START DATETIME
  const startDate = new Date(formData.startDate);
  startDate.setHours(
    formData.startTime.getHours(),
    formData.startTime.getMinutes(),
    0,
    0,
  );

  // END DATETIME
  const endDate = new Date(formData.endDate);
  console.log("startDate", formData.startDate);
  console.log("startTime", formData.startTime);

  console.log("endDate", formData.endDate);
  console.log("endTime", formData.endTime);
  endDate.setHours(
    formData.endTime.getHours(),
    formData.endTime.getMinutes(),
    0,
    0,
  );

  Object.entries(formData).forEach(([key, value]) => {
    // tych pól już nie wysyłamy
    if (
      key === "startTime" ||
      key === "endTime" ||
      key === "startDate" ||
      key === "endDate"
    ) {
      return;
    }

    if (value !== null && value !== "") {
      data.append(key, value);
    }
  });

  data.append("startDate", startDate.toISOString());
  data.append("endDate", endDate.toISOString());

  return data;
};
