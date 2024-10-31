export interface IWarehouseState {
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    isListing: boolean;
    data: any[];
    error: any;
}