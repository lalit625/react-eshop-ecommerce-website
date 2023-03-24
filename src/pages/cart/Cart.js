import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_FOR_LATER,
  SAVE_FOR_LATER_MOVE_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  REMOVE_SAVE_FOR_LATER,
    selectSaveLaterItem,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";



const Cart = () => {
 let cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  let saveLaterItems=useSelector(selectSaveLaterItem);

  const saveLaterUnique = saveLaterItems.filter((obj, index, self) =>
  index === self.findIndex((t) => t.name === obj.name && t.id === obj.id)
);



  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };
  const saveforlater = (cart) => {
    
    
    dispatch(SAVE_FOR_LATER(cart));
    dispatch(REMOVE_FROM_CART(cart));
     
    

  };

  const movetocart = (savelaterItem, id) => {
    console.log(id);
    const saveLaterCart = savelaterItem.filter((item) => item.id === id);
   const newSaveLater = saveLaterCart.reduce(function(acc, cur, i) {
      acc = cur;
      return acc;
    }, {});


    dispatch( SAVE_FOR_LATER_MOVE_CART(newSaveLater));
     dispatch(REMOVE_SAVE_FOR_LATER(newSaveLater));
     
    

  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>${price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${parseInt((price * cartQuantity)).toFixed(2)}</td>
                      
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                        &nbsp; &nbsp;  <button
          className={"--btn --btn-danger"}
          onClick={() =>  saveforlater(cart)}
         
        >
          Save for Later
        </button>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>${parseInt(cartTotalAmount).toFixed(2)}</h3>
                    
                  </div>
                  <p>Tax an shipping calculated at checkout</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

      <br/>
      <div className={`container ${styles.table}`}>
        <h2>Save For Later</h2>
        {saveLaterItems.length !== 0 ? (
           <>
           <table>
             <thead>
               <tr>
                 <th>s/n</th>
                 <th>Product</th>
                 <th>Price</th>
                 
                 <th>Action</th>
               </tr>
             </thead>
             <tbody>
               {saveLaterUnique.map((cart, index) => {
                 const { id, name, price, imageURL } = cart;
                 return (
                   <tr key={id}>
                     <td>{index + 1}</td>
                     <td>
                       <p>
                         <b>{name}</b>
                       </p>
                       <img
                         src={imageURL}
                         alt={name}
                         style={{ width: "100px" }}
                       />
                     </td>
                     <td>${price}</td>
                    
                     
                     
                     <td className={styles.icons}>
                         <button
         className={"--btn --btn-danger"}
         onClick={() => movetocart(saveLaterUnique, id)}
        
       >
         Move To Cart
       </button>

                     </td>
                   </tr>
                 );
               })}
             </tbody>
           </table>
          
         </>
          
        ) : (
          <>
            <p>Your Save for Later Item is empty</p>
          
          </>
         
        )}
      </div>
    </section>
  );
};

export default Cart;