function getCurrentYear(): number {
  if (new Date() < new Date(new Date().getFullYear(), 1, 17)) {
    return new Date().getFullYear() - 1;
  } else {
    return new Date().getFullYear();
  }
}

export { getCurrentYear };
