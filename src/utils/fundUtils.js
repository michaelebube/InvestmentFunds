export function formatPercentage(returns) {
  if (returns === null || returns === undefined) {
    return "N/A";
  }
  return (parseFloat(returns) * 100).toFixed(2);
}

export function formatRiskLevel(risk) {
  const riskLevel = Number(risk);
  if (riskLevel === 3) {
    return "Growth";
  } else if (riskLevel === 2) {
    return "Moderate";
  } else {
    return "Conservative";
  }
}
