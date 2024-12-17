export interface IOrderState {
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    isListing: boolean;
    data: any[];
    error: any;
}