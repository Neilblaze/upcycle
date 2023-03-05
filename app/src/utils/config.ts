

export const ERROR_ROUTE='/error'
export const GOOGLE_AUTH_START='/api/auth/google/start'
export const DASHBOARD='/dash'
export const HISTORY='/history'
export const LOGOUT='/api/auth/logout'
export const LANDING='/'


export const ADD_PROJECT_FOR_PROVIDER='/p/add-project'



export const REGISTER_PROVIDER_API = '/api/providers/register'
export const LISTINGS_ALL_API = '/api/listings/all'
export const AUTH_STATUS_API = '/api/auth/status'

export const REGULAR_DASH = '/u/dash'
export const PROVIDER_DASH = '/p/dash'

export const UPDATE_STORE_PROFILE = '/p/update'

export const ALL_MESSAGES = '/chat/all'



export const ADD_PROJECT_FOR_PROVIDER_API = '/api/listings/add-project'


export const MY_LISTING_FOR_PROVIDER_API = '/api/listings/my-listing'


export const DELETE_PROJECT_FOR_PROVIDER_API = '/api/listings/delete-project'


export const UPDATE_PROFILE_FOR_PROVIDER_API = '/api/listings/update-my-listing'


export const LISTING_BY_ID_API = (id: string) => `/api/listings/${id}`


export const ADD_REVIEW_API = `/api/listings/add-review`


export const UPLOAD_IMAGE_API = '/api/upload/image'


export const CHAT_NORMALIZE_API = (id:string) => `/api/chat/${id}/normalize`
export const CHAT_ALL_API =  `/api/chat/all`


export const FUNKY_IDEAS_GEN='/funky-ideas-gen'


export const FUNKY_IDEAS_GEN_API=(query: string) => `/api/funky-ideas-proxy/${query}`
