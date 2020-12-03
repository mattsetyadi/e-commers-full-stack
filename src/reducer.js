export const initialState = {
  basket: [],
  user: null, // null bc theres no user before log in
};

//selector untuk mendapatkan harga dan totalnya
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  // mengecek apakah data dari button addToBaasket dikirimkan
  // ke reducer, bisa juga mengecek item apa saja yang telah
  // di dispatch yang menggunakan kunci ADD_TO_BASKET
  console.log(action);

  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    //menambah case baru untuk menghapus isi basket (fungsi listener)
    // case "REMOVE_FROM_BASKET":

    //fingsi di bawah akan menghapus seluruh item dengan id yang sama
    //sedangkan yg dibutuhkan yaitu mrnghapus salah satu saja
    // return {
    //     ...state, basket: state.basket.filter(
    //       item => item.id !== action.id
    //     )
    //   }

    //digunakan operasi splice pada array >> basket tsb di ubah menjadi array di newBasket
    //dan terjadi lah operasi seleksi berdasarkan index array tsb
    // here we gooooo!!!

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id,
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        //jika isi basket ada, maka newBasket ini akan menghilangkan 1 array berdasarkan index
        //dan jumlahnya 1 (index, 1)
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can not remove product (id: ${action.id}) as it is not in the basket!`,
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user, //action.user, user yang dimaksud dari dispatch app.js (user: authUser)
      };

    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default reducer;
