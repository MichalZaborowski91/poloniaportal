export const validateEventForm = (formData) => {
  const errors = {};

  //TITLE
  if (!formData.title.trim()) {
    errors.title = "Podaj tytuł wydarzenia.";
  } else if (formData.title.trim().length < 5) {
    errors.title = "Tytuł musi mieć minimum 5 znaków.";
  } else if (formData.title.trim().length > 120) {
    errors.title = "Tytuł może mieć maksymalnie 120 znaków.";
  }

  //DESCRIPTION
  if (!formData.description.trim()) {
    errors.description = "Podaj opis wydarzenia.";
  } else if (formData.description.trim().length < 20) {
    errors.description = "Opis musi mieć minimum 20 znaków.";
  } else if (formData.description.trim().length > 3000) {
    errors.description = "Opis może mieć maksymalnie 3000 znaków.";
  }

  //CATEGORY
  if (!formData.category) {
    errors.category = "Wybierz kategorię wydarzenia.";
  }

  //START DATE
  if (!formData.startDate) {
    errors.startDate = "Wybierz datę rozpoczęcia.";
  }

  //START TIME
  if (!formData.startTime) {
    errors.startTime = "Wybierz godzinę rozpoczęcia.";
  }

  //END DATE
  if (!formData.endDate) {
    errors.endDate = "Wybierz datę zakończenia.";
  }

  //END TIME
  if (!formData.endTime) {
    errors.endTime = "Wybierz godzinę zakończenia.";
  }

  if (
    formData.startDate &&
    formData.startTime &&
    formData.endDate &&
    formData.endTime
  ) {
    const start = new Date(formData.startDate);
    start.setHours(
      formData.startTime.getHours(),
      formData.startTime.getMinutes(),
      0,
      0,
    );

    const end = new Date(formData.endDate);
    end.setHours(
      formData.endTime.getHours(),
      formData.endTime.getMinutes(),
      0,
      0,
    );

    if (end <= start) {
      errors.endTime =
        "Data zakończenia musi być późniejsza niż data rozpoczęcia.";
    }
  }

  ///LOCATION
  if (formData.isOnline) {
    if (!formData.onlineLink.trim()) {
      errors.onlineLink = "Podaj link do wydarzenia.";
    }
  } else {
    if (!formData.city.trim()) {
      errors.city = "Podaj miasto.";
    }

    if (!formData.address.trim()) {
      errors.address = "Podaj adres wydarzenia.";
    }
  }

  //ADDITIONAL INFORMATION
  //PRICE
  if (!formData.isFree) {
    if (!formData.price) {
      errors.price = "Podaj cenę wydarzenia.";
    } else if (Number(formData.price) <= 0) {
      errors.price = "Cena musi być większa od 0.";
    }
    if (formData.priceLabel?.trim().length > 50) {
      errors.priceLabel = "Opis ceny może mieć maksymalnie 50 znaków.";
    }
  }

  //CAPACITY
  if (!formData.unlimitedCapacity) {
    if (!formData.capacity) {
      errors.capacity = "Podaj liczbę miejsc.";
    } else if (Number(formData.capacity) <= 0) {
      errors.capacity = "Liczba miejsc musi być większa od 0.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
