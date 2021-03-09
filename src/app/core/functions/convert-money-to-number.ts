export const convertMoneyToNumber = (money: string) => {
  if (!money) {
    return 0;
  }

  return money
    .toString()
    .replace(',', '')
    .replace(' MNX', '') as unknown as number * 1;
}
