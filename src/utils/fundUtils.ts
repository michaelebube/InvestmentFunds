export function formatPercentage(returns: string | null | undefined) {
  if (returns === null || returns === undefined) {
    return "N/A";
  }
  return (parseFloat(returns) * 100).toFixed(2);
}

export function formatRiskLevel(risk: number) {
  if (risk === 3) {
    return "Growth";
  } else if (risk === 2) {
    return "Moderate";
  } else {
    return "Conservative";
  }
}

export function formatReturnsPayment(
  returnsPaymentSchedule: number | null | undefined
): string | undefined {
  if (returnsPaymentSchedule === null || returnsPaymentSchedule === undefined) {
    return "N/A";
  }
  if (returnsPaymentSchedule == 1) {
    return "Capital Appreciation";
  }
  if (returnsPaymentSchedule == 2) {
    return "Quarterly";
  }
  if (returnsPaymentSchedule == 3) {
    return "Bi-Annually";
  }
  if (returnsPaymentSchedule == 4) {
    return "Yearly";
  }
}

export function formatNaira(amount: number): string {
  if (typeof amount !== "number") return "";

  const nairaAmount = amount / 100;

  if (nairaAmount >= 1000000000) {
    const billions = nairaAmount / 1000000000;
    return (
      "₦ " +
      billions.toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) +
      "B"
    );
  } else {
    const millions = nairaAmount / 1000000;
    return (
      "₦ " +
      millions.toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) +
      "M"
    );
  }
}
