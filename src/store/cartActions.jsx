import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
    return async (dispatch) => {
      const fetchHandler = async () => {
        const res = await fetch(
          "https://redux-http-93c17-default-rtdb.firebaseio.com/cartItems.json"
        );
        const data = await res.json();
        return data;
      };
      try {
        const cartData = await fetchHandler();
        console.log(cartData);
        dispatch(cartActions.replaceData(cartData));
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Sending Request to Fetch Failed",
            type: "error",
          })
        );
      }
    };
  };
  

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "sending Request",
        type: "warning",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://redux-http-93c17-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      // console.log(notification, "no");
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sent to database successfully ",
          type: "success",
        })
      );
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sending request failed ",
          type: "error",
        })
      );
    }
  };
};
