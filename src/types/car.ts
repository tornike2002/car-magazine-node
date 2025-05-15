export interface CarFilters {
  category?: string
  tag?: {
    $in: string[]
  }
  search?: {
    $search: string
  }
  vehicleFilter?: {
    body?: string
    model?: string
    year?: number
    price?: number
    color?: string
    transmission?: string
    mileage?: number
    engine?: number
    fuelType?: string
  }
  page?: number
  limit?: number
}
