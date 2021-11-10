export const initialState = {
    basket:[],
    user:null,
    product:[],
    items:[],
    categoryFilter:[],
    categoryFilterSmall:[],
    priceSelected:[],
    priceSelectedSmall:[],
    orderBy:[],
    ratingFilter:5,
    filterProducts:[],
    verBuyCart:false,
    fullCat:[],
    fullPrice:[],
}

export const actionTypes = {
    ADD_TO_BASKET:"ADD_TO_BASKET",
    REMOVE_ITEM:"REMOVE_ITEM",
    CLEAR_SHOPPING_CART: "CLEAR_SHOPPING_CART",
    SET_USER:"SET_USER",
    LOAD_PRODUCTS:"LOAD_PRODUCTS",
    CATEGORY_FILTER:"CATEGORY_FILTER",
    CATEGORY_FILTER_SMALL:"CATEGORY_FILTER_SMALL",
    RATING_FILTER:"RATING_FILTER",
    ORDERBY:"ORDERBY",
    PRICE_FILTER:"PRICE_FILTER",
    PRICE_FILTER_SMALL:"PRICE_FILTER_SMALL",
    FILTER_PRODUCTS:"FILTER_PRODUCTS",
    LOAD_BUYPAGE:"LOAD_BUYPAGE"
}

export const getTotal =(basket) => {
    let Total = basket?.reduce((amount, item)=> item.price + amount, 0);
    
    return Total;

}





const reducer =(state, action ) =>{

    console.log(action);
    
 
         
        

switch(action.type){
    case "ADD_TO_BASKET":
        return{
            ...state,
            basket:[...state.basket, action.item]
        }
    case "REMOVE_ITEM":
        const index = state.basket.findIndex((basketItem=> basketItem.id === action.id))
        let newBasket = [...state.basket];
        if (index>=0){
            newBasket.splice(index,1)
        }else {console.log("Cant remove item")}
        return{
            ...state,
            basket: newBasket,
        }
        case "CLEAR_SHOPPING_CART":
        return{
            ...state,
            basket:[]
        }
        case "SET_USER":
            return{
                ...state,
                user:action.user,
            }
        case "LOAD_PRODUCTS":
            return{
                ...state,
                items:action.items,
                categoryFilter:action.categoryFilter,
                priceSelected:action.priceSelected,
                filterProducts:action.filterProducts,
                fullCat:action.fullCat,
                fullPrice:action.fullPrice
            }
        case "CATEGORY_FILTER":
            return{
                ...state,
                categoryFilter:action.categoryFilter,       
            }
        case "CATEGORY_FILTER_SMALL":
            return{
                ...state,
                categoryFilterSmall:action.categoryFilterSmall,       
                }
        case "RATING_FILTER":
          
            return{
                 ...state,
                ratingFilter:action.ratingFilter,

                }
        case "ORDERBY":
            return{
                  ...state,
                 orderBy:action.orderBy,
                }
        case "PRICE_FILTER":
            return{
                  ...state,
                  priceSelected:action.priceSelected,
                  }
        case "PRICE_FILTER_SMALL":
            return{
                    ...state,
                    priceSelectedSmall:action.priceSelectedSmall,
                    }         
        case "FILTER_PRODUCTS":
            return{
                ...state,
                 filterProducts:action.filterProducts,
                   }  
        case "LOAD_FILTERPAGE":
            return{
                ...state,
                loadFilterPage:action.loadFilterPage,
                    } 
        case "LOAD_BUYPAGE":
            return{
                ...state,
                verBuyCart:action.verBuyCart,
                                }                                                                                    
        default: return state;
}
}
export default reducer