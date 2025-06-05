import React, { useState, useEffect,useContext } from 'react';
import { ShoppingCart, Tag, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from '../../../UI/Loading';
import axios from 'axios';
import { ActionContext } from "../../../Context/GlobalContext";

function SingelProduct() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart ,cart ,removeFromCart } = useContext(ActionContext);

  // שליפת הנתונים של המוצר הבודד


  const { 
    data: productData,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ["get_singelProduct", id],
    queryFn: async () => (await axios.get(`/Products/getProductBYid/${id}`)).data,
    staleTime: 1000 * 60,
    onSuccess: (data) => {
      console.log("המוצר נטען בהצלחה:", data);  
      
    },
    onError: (err) => {
      console.log("שגיאה בטעינת המוצר:", err);
    },
  });

  // נשלוף את המוצר מהנתונים כשהם מגיעים
  const product = productData?.data || null;


  useEffect(() => {
    // איפוס אינדקס התמונה כאשר מוצר חדש נטען
    setCurrentImageIndex(0);
    
    // איפוס הכמות כאשר מוצר חדש נטען
    // setQuantity(0);
    
    cart.forEach((item) => {
      if (item._id === product?._id) {  
        setQuantity(item.quantity || 0);
        product.quantity= item.quantity || 0; // עדכון הכמות במוצר עצמו
      }
    });
    console.log("המוצר נטען:", product);
    // if (product) {
    //   console.log("המוצר נטען בהצלחה:", product);
    // }
  }, [product]);

  const incrementQuantity = () => {
    if (quantity < (product?.product_stock || 0)) {
      setQuantity(quantity + 1);
      addToCart(product);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      removeFromCart(product,1);
    }
  };

  const nextImage = () => {
    if (product?.product_image_gallery?.length) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.product_image_gallery.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.product_image_gallery?.length) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.product_image_gallery.length - 1 : prevIndex - 1
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // בדיקה האם המוצר במלאי
  const isInStock = product?.product_stock > 0 && product?.product_showInStore;

  if (isLoading) return <Loading />;
  
  if (isError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl text-red-600">שגיאה בטעינת המוצר</h2>
        <p className="mt-2">{error?.message || 'אירעה שגיאה בטעינת פרטי המוצר'}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl">המוצר לא נמצא</h2>
      </div>
    );
  }

  // קבלת קטגוריות כמערך (או מחרוזת בודדת למערך)
  const categories = product.product_category ? 
    (Array.isArray(product.product_category) ? product.product_category : [product.product_category.category_name || product.product_category]) :
    [];

  // קבלת תתי-קטגוריות כמערך (או מחרוזת בודדת למערך)
  const subcategories = product.product_Subcategory ?
    (Array.isArray(product.product_Subcategory) ? product.product_Subcategory : [product.product_Subcategory.subcategory_name || product.product_Subcategory]) :
    [];
// בדיקה אם יש קטגוריות או תתי-קטגוריות
// const allCategorises = [...categories, ...subcategories];

//   console.log("קטגוריות:", allCategorises);
console.log("קטגוריות:", categories);
  console.log("תתי-קטגוריות:", subcategories);

  // יצירת מערך גלריית תמונות (או מערך עם תמונה בודדת אם אין גלריה)
  const imageGallery = [
    ...(product.product_image ? [product.product_image] : []),
    ...(product.product_image_gallery?.length ? product.product_image_gallery : []),
  ];
  
  if (!imageGallery.length) {
    imageGallery.push("/api/placeholder/500/500");
  }




  
  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 space-x-reverse">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">ראשי</a>
            </li>
            <li className="text-gray-500 mx-2">/</li>
            {categories.length > 0 && (
              <>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    {typeof categories[0] === 'object' ? categories[0].category_name : categories[0]}
                  </a>
                </li>
                <li className="text-gray-500 mx-2">/</li>
              </>
            )}
            {subcategories.length > 0 && (
              <>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    {typeof subcategories[0] === 'object' ? subcategories[0].Subcategory_name : subcategories[0]}
                  </a>
                </li>
                <li className="text-gray-500 mx-2">/</li>
              </>
            )}
            <li className="text-gray-700">{product.product_name}</li>
          </ol>
        </nav>

        {/* Product section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery - Right side */}
          <div className="flex flex-col items-center order-first">
            <div className="relative w-full h-96 mb-4 bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={imageGallery[currentImageIndex]} 
                alt={product.product_name}
                className="w-full h-full object-contain p-4"
              />
              {imageGallery.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail grid */}
            {imageGallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {imageGallery.map((img, idx) => (
                  <button 
                    key={idx}
                    className={`w-20 h-20 border-2 rounded ${currentImageIndex === idx ? 'border-blue-500' : 'border-gray-200'}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.product_name} - תמונה ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info - Left side */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 order-last">
            {/* Product details */}
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.product_name}</h1>
              
              <div className="mt-3">
                <p className="text-3xl text-gray-900">
                  ₪{product.product_costumer_price?.toFixed(2) || '0.00'}
                </p>
              </div>

              {/* Stock status */}
              <div className="mt-6">
                <div className="flex items-center">
                  {isInStock ? (
                    <>
                      <Check className="h-5 w-5 text-green-500" />
                      <p className="mr-2 text-sm text-green-600">במלאי - {product.product_stock} יחידות</p>
                    </>
                  ) : (
                    <p className="text-sm text-red-600">אזל מהמלאי</p>
                  )}
                </div>
              </div>

              {/* Product code / barcode */}
              <div className="mt-4 space-y-2">
                {product.product_mkt && (
                  <p className="text-sm text-gray-600">מק"ט: {product.product_mkt}</p>
                )}
                {product.product_barcode && product.product_barcode.length > 0 && (
                  <p className="text-sm text-gray-600">
                    ברקוד: {Array.isArray(product.product_barcode) ? 
                      product.product_barcode[0] : product.product_barcode}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">תיאור</h3>
                <div className="mt-2 text-base text-gray-700 space-y-4">
                  <p>{product.product_description}</p>
                </div>
              </div>

              {/* Details */}
              {product.product_details && (
                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-medium text-gray-900">פרטים נוספים</h3>
                  <div className="mt-2 text-base text-gray-700">
                    <p>{product.product_details}</p>
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="mt-8">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-gray-400" />
                  <span className="mr-2 text-sm text-gray-600">קטגוריות:</span>
                  <div className="flex flex-wrap gap-2 mr-2">
                    {categories.map((category, index) => (
                      <span key={`cat-${index}`} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                        {typeof category === 'object' ? category.category_name : category}
                      </span>
                    ))}
                    {subcategories.map((subcat, index) => (
                      <span key={`subcat-${index}`} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                        {typeof subcat === 'object' ? subcat.Subcategory_name : subcat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="mt-4 text-sm text-gray-500">
                נוסף בתאריך: {formatDate(product.createdAt)}
              </div>

              {/* Add to cart section */}
              {isInStock && (
                <div className="mt-8">
                  <div className="flex items-center">
                    {/* <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        onClick={decrementQuantity} 
                        className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        max={product.product_stock}
                        value={quantity} 
                        readOnly
                        className="w-12 text-center border-r border-l border-gray-300 py-2"
                      />
                      <button 
                        onClick={incrementQuantity} 
                        className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
                        disabled={quantity >= product.product_stock}
                      >
                        +
                      </button>
                    </div> */}

                    <button 
                      type="button"
                      className="mr-4 py-3 px-8 flex items-center justify-center rounded-md border border-transparent bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white"
                      onClick={() => {
                              setQuantity(quantity + 1);
                            addToCart(product)
                        }}
                    >
                      <ShoppingCart className="h-5 w-5 ml-2" />
                      הוסף לסל
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products section placeholder */}
        {/* <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900">מוצרים דומים</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4"> */}
            {/* Sample related products would go here */}
            {/* <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden">
                <img src="/api/placeholder/200/200" alt="מוצר דומה" className="w-full h-48 object-cover" />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">מוצר דומה לדוגמה</h3>
                <p className="mt-1 text-sm text-gray-500">₪29.90</p>
              </div>
            </div> */}
            {/* More related products... */}
          {/* </div>
        </div>*/}
      </div> 
    </div>
  );
}

export default SingelProduct;