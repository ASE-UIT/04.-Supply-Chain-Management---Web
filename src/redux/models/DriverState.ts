export interface IDriverState {
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isListing: boolean;
  data: any[];
  error: any;
}
