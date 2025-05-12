export interface Performance {
  fund_id: string;
  year: number;
  annual_return: string;
}

// Interface for Fund Composition
export interface FundComposition {
  [key: string]: string;
}

// Main Fund Interface
export interface Fund {
  id: string;
  name: string;
  fund_code: string;
  returns: string;
  logo: string;
  is_money_market: boolean;
  is_eurobond: boolean;
  performance: Performance[];
  description: string;
  fund_manager: string;
  terms_of_use: string;
  risk: number;
  prospectus: string | null;
  custodian: string;
  size_in_kobo: number;
  fundtype: number;
  status: number;
  returns_model: number;
  composition: FundComposition;
  [key: string]: any;
}

export interface State {
  funds: Fund[];
  selectedFund: Fund | null;
  filterRisk: number | null;
  isLoading: boolean;
  error: string | null;
}
