export interface IVehicleState {
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    isListing: boolean;
    data: any[];
    error: any;
}