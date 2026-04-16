export type LoanStatus = 'pending' | 'approved' | 'rejected';
export type AssetType = 'vehicle' | 'starship';

export interface LoanRequest {
  id: number;
  characterName: string;
  characterUrl: string;
  assetName: string;
  assetType: AssetType;
  assetUrl: string;
  amount: number;
  status: LoanStatus;
  date: string;
}