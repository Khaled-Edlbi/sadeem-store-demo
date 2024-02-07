// All API's endpoints

export const hostname = "https://sadeem-backend-demo.vercel.app/api"


export const authUrl = `${hostname}/Auth`

// Just works for user 1
export const getImgurTokenUrl = `${hostname}/user/1/GetImgurToken`
export const updateImgurTokenUrl = `${hostname}/user/1/UpdateImgurToken`

export const createImageUrl = `${hostname}/CreateImage`
export const imageUrl = `${hostname}/image`

export const getProductsUrl = `${hostname}/GetProducts`
export const createProductUrl = `${hostname}/CreateProduct`
export const productUrl = `${hostname}/product`

export const getOrdersUrl = `${hostname}/GetOrders`
export const createOrderUrl = `${hostname}/CreateOrder`
export const setOrderStatusUrl = `${hostname}/order`


// External API's endpoints
export const imgurAuthTokenUrl = "https://api.imgur.com/oauth2/token"
export const imgurFeedUrl = "https://api.imgur.com/3/feed"
export const imgurUrl = "https://api.imgur.com/3/image"
