import { createContext, useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthGlobalContext';
import { useMutation } from "@tanstack/react-query";
export const ActionContext = createContext();

function ActionProvider({ children }) {
  const { user, isAuth } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
const [editObject, setEditObject] = useState(null);




function openModal(prd, modal_name,u) {
  setEditObject(prd);
  console.log(modal_name,"modal_name modal_name")
  modal_name === "confirm_modal" && setUrl(u)
  document.getElementById(modal_name)?.showModal();
};
  // const prevAuthState = useRef(isAuth);


  //   // --- טעינה של הקובץ ---
  // useEffect(() => { 
  // if(isAuth) {
  //   localStorage.setItem("Refrash",true);

  // }
  // else {
  //   localStorage.removeItem("Refrash");
  //   }
  // }, [isAuth]); // רץ רק פעם אחת


  useEffect(() => {
    console.log(editObject,"editObject")
    
  }, [editObject]); // רץ רק פעם אחת

  useEffect(() => {
    if (!user) {
      // אם אין משתמש, קודם כל ננקה את העגלה
      setCart([]);
      
      const storedCartString = localStorage.getItem('cart');
      const storedCart = storedCartString ? JSON.parse(storedCartString) : [];
      setCart(storedCart);
      console.log(storedCart, "1");
    }
    else {
      const userCart = user.user_shopping_cart;
      const storedCartString = localStorage.getItem('cart');
      const storedCart = storedCartString ? JSON.parse(storedCartString) : [];
      
      if (storedCart.length > 0) {
        // בעיה: ייתכן שמבנה ה-ID לא עקבי בין העגלות השונות
        // נוודא שאנחנו מייצרים מזהה עקבי לכל פריט
        
        // פונקציה להפקת מזהה עקבי מכל פריט
        const getConsistentId = (item) => {
          // בדיקה של כל האפשרויות האפשריות של מזהה
          if (item._id && typeof item._id === 'string') {
            return item._id;
          } else if (item._id && item._id._id) {
            return item._id._id;
          } else if (item.id) {
            return item.id;
          } else if (item._id && typeof item._id === 'object' && item._id.toString) {
            // במקרה שמדובר ב-ObjectId של MongoDB
            return item._id.toString();
          }
          // אם אין מזהה תקין, נחזיר מחרוזת ריקה או מזהה ייחודי אחר
          console.error('פריט ללא מזהה תקין:', item);
          return '';
        };
  
        const mergedMap = new Map();
        
        // נכניס את המוצרים מהעגלת המשתמש
        userCart.forEach(product => {
          const consistentId = getConsistentId(product);
          if (consistentId) {
            mergedMap.set(consistentId, { ...product });
          }
        });
        
        // נשלב את המוצרים מה־localStorage
        storedCart.forEach(product => {
          const consistentId = getConsistentId(product);
          if (!consistentId) return; // דילוג על פריטים ללא מזהה תקין
          
          if (mergedMap.has(consistentId)) {
            console.log(consistentId, "ספירה מספר 1 - מזהה קיים, מעדכן כמות");
            const existingProduct = mergedMap.get(consistentId);
            existingProduct.quantity = (existingProduct.quantity || 0) + (product.quantity || 1);
          } else {
            console.log(consistentId, "ספירה מספר 2 - מזהה חדש, מוסיף לעגלה");
            // חשוב להעתיק את המוצר המלא כדי לשמור על כל הפרטים
            mergedMap.set(consistentId, { ...product });
          }
        });
        
        const mergedArray = Array.from(mergedMap.values());
        setCart(mergedArray);
        localStorage.removeItem("cart");
        UpdateUserCart(mergedArray);
      } else {
        // אם אין מוצרים בלוקאל, פשוט נטען מהמשתמש
        setCart(userCart);
      }
      
      console.log(userCart, "2");
    }
  }, [user]); // כן, רץ רק כאשר user משתנה


  // --- הוספת מוצר לעגלה ---
  const addToCart = (product) => {
    console.log(cart, "3")
    // console.log(product, "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    // console.log(cart, "cart in add to cart")

    const existing = cart.find(itemProduct => {
      console.log(product._id, "item in cart 3433434")
      console.log(itemProduct._id._id, "item in cart id vccvcccvcccccc")
      console.log(itemProduct.id, "item in cart id רק ID")

      return itemProduct.id === product._id || itemProduct._id === product._id || itemProduct._id._id===product._id;

    }

    );

    let updatedCart = [];
    console.log(existing, "existing in add to cart");
    
    if (existing) {
      updatedCart = cart.map(item => {
        // בדיקה נכונה של השוויון - אחד מהתנאים צריך להיות נכון
        if (
          (item.id && item.id === product._id) || 
          (item._id && item._id === product._id) ||
          (item._id && item._id._id && item._id._id === product._id)
        ) {
          console.log(item.id, "item.id");
          console.log(item._id, "item._id");
          console.log(item._id && item._id._id ? item._id._id : "no _id._id", "item._id._id");
          console.log(product._id, "product._id");
          return { ...item, quantity: item.quantity + 1 }; // החזר אובייקט חדש עם כמות מעודכנת
        }
        return item; // החזר את הפריט המקורי אם הוא לא המוצר שאותו מחפשים
      });
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }]; // צור מערך חדש עם הפריט החדש
    }
    
    console.log(updatedCart, "updated cart in add to cart]]]]]]]]]");


    if (!isAuth) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    else {
      UpdateUserCart(updatedCart);
    }

    setCart(updatedCart);

    console.log(cart, "4")

  }



  // --- מעדכן את הLOCALSTORAGE או ששולח לעדכון בשרת אם הלקוח מאומת ---
  // const updateCart = () => {
  //   const savethecart = localStorage.getItem("cart");
  //   setCart(savethecart);
  //   console.log(cart, "5")

  // if (isAuth) UpdateUserCart(updatedCart);
  // else localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };





  // ---לעדדכן את העגלה בשרת בעת פעולות ---
  const UpdateUserCart = async (updatedCart) => {
    console.log(updatedCart, "6vcvcvv")
    console.log(cart, "6")

    let newCart = []
    const id = user?._id
    if (isAuth || user) {

      newCart = updatedCart.map(item => ({
        id: item.product_id || item._id,
        quantity: item.quantity,

      }))


      console.log(newCart, "new cart in update user cart 888888888")

      try {
        const { data } = await axios.post(`/users/setShoppingCart/${id}`, newCart);
        console.log(data.data.user_shopping_cart, "Cart synced to server");
        setCart(data.data.user_shopping_cart)
      } catch (err) {
        console.error("Failed to sync cart:", err.message);
      }
      console.log(cart, "7")
     
    };

  }


  // useEffect(() => {
  //   if (isAuth) {
  //     UpdateUserCart(cart);
  //   } else {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }
  // }, [cart]);


  // --- הסרת כמות מהעגלה ---
  const removeFromCart = (product) => {
    console.log(cart, "8")
    console.log(product, "product in remove from cart")
    const id = product._id;
    console.log(id, "id in remove from cart")
    const updatedCart = product.quantity > 1 ?

      cart.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      : cart.filter(item => item._id !== id);

    // updateCart(updatedCart);
    setCart(updatedCart);
    if (!isAuth) localStorage.setItem("cart", JSON.stringify(updatedCart));
    else {
    UpdateUserCart(updatedCart);
  }
    console.log(cart, "9")

  };



  // --- הסרת מוצר לגמרי מהעגלה ---
  const removeProduct = (id) => {
    console.log(cart, "10")

    const updatedCart = cart.filter(item =>
      item._id !== id
    );
    // updateCart(updatedCart);
    // localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCart(updatedCart);
    if (!isAuth) localStorage.setItem("cart", JSON.stringify(updatedCart));
    else  {
    UpdateUserCart(updatedCart);
  }

    console.log(cart, "11")

  };

  const clearCart = () => {
    console.log(cart, "12")

    const updatedCart = [];
    // updateCart(updatedCart)
    // localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCart(updatedCart);
    if (!isAuth) localStorage.setItem("cart", JSON.stringify(updatedCart));
    else  {
    UpdateUserCart(updatedCart);
  }
    // updateCart(updatedCart);

    console.log(cart, "13")

  };


  useEffect(() => {
    // UpdateUserCart(cart);
    console.log(cart, "14 - שינוי USE EFFECT")
  }, [cart]);


  // --- Totals ---
  useEffect(() => {
    const price = cart?.reduce(
      (sum, item) => sum + (item.quantity * (item.product_costumer_price?item.product_costumer_price:item._id.product_costumer_price || 0)),
      0
    );
    setTotalPrice(Number(price.toFixed(2)));

    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalProducts(quantity);
  }, [cart]);






//שינוי מפה
const [wishlist, setWishlist] = useState(user?.user_whishlist.map(item => item._id)|| []);
  // עדכון המצב כשהמשתמש משתנה (רק כשצריך)
    useEffect(() => {
        if (user?.user_whishlist) {
            setWishlist(user.user_whishlist.map(item => item._id)|| []);
        }

    }, [user?.user_whishlist]);


       useEffect(() => {
        
           console.log(user?.user_whishlist.map(item => item._id));
        

    }, [wishlist]);

    const { mutate: updateWishlistOnServer, isLoading } = useMutation({
        mutationKey: ["update_WishList", user?._id],
        mutationFn: async (wishlistData) => {
            return await axios.post(`/Users/AddToishList/${user._id}`, wishlistData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        onSuccess: (data) => {
            console.log("Wishlist updated successfully");

        },
        onError: (err) => {
            console.error("Error updating wishlist:", err);
            // החזרה למצב הקודם
            if (user?.user_whishlist) {
                setWishlist(user.user_whishlist);
            }
        },
    });

    const toggleWishlist = (productId) => {
        if (!user || !isAuth) return;

        let newWishlist;
        if (wishlist.includes(productId)) {
            newWishlist = wishlist.filter(item => item !== productId);
        } else {
            newWishlist = [...wishlist, productId];
        }
        
        setWishlist(newWishlist);
        updateWishlistOnServer(newWishlist);
    };

    const isInWishlist = (productId) => {
     
        return wishlist.includes(productId);
    };


// export const useWishlist = () => {
//     const context = useContext(WishlistContext);
//     if (!context) {
//         throw new Error('useWishlist must be used within a WishlistProvider');
//     }











  return (
    <ActionContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        removeProduct,
        clearCart,
        totalPrice,
        totalProducts,
        setTotalProducts,
        editObject,
        setEditObject,
        openModal,

        //שינוי מפה 
        wishlist, setWishlist,
        toggleWishlist,
        isInWishlist,


       

        

      }}
    >
      {children}
    </ActionContext.Provider>
  );

}
export default ActionProvider;
