export const getOptionLabel = (options, value) => {
  const option = options.find((option) => option.value === value);

  return option?.label || value;
};
