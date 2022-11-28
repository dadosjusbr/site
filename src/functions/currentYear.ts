function getCurrentYear(): number {
  if (new Date().getDate() <= 17 && new Date().getMonth() == 0) {
    return new Date().getFullYear() - 1;
  } else {
    return new Date().getFullYear();
  }
}

export { getCurrentYear };
