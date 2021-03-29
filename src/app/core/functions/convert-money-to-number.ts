export const convertMoneyToNumber = (money: string): number => {
  if (!money) {
    return 0;
  }

  return money
    .toString()
    .replace(',', '')
    .replace(' MNX', '') as unknown as number * 1;
}
