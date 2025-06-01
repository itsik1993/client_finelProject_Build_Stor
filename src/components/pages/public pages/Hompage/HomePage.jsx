import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthGlobalContext'
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, ArrowRight, Menu, X, Heart, Search, User, Truck, Shield, Award, Phone } from 'lucide-react';




function HomePage() {
const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState([]);

  // Hero slides data - עיצוב מקצועי
  const heroSlides = [
    {
      title: "איכות ללא פשרות",
      subtitle: "מוצרים מובחרים לחיים טובים יותר",
      buttonText: "גלו את הקולקציה",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop"
    },
    {
      title: "מגוון רחב ואיכותי",
      subtitle: "למעלה מ-10,000 מוצרים במלאי",
      buttonText: "גלו את הקטלוג",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop"
    },
    {
      title: "שירות מקצועי ואמין",
      subtitle: "צוות מומחים לשירותכם",
      buttonText: "צרו קשר",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop"
    }
  ];

  // Featured products - עיצוב מקצועי
  const featuredProducts = [
    { 
      id: 1, 
      name: "מוצר פרימיום מסגרת 1", 
      price: "₪1,299", 
      originalPrice: "₪1,599", 
      category: "פרימיום",
      rating: 4.8, 
      reviews: 124,
      inStock: true,
      badge: "מומלץ"
    },
    { 
      id: 2, 
      name: "מוצר איכות מסגרת 2", 
      price: "₪899", 
      originalPrice: "₪1,149", 
      category: "איכות",
      rating: 4.9, 
      reviews: 89,
      inStock: true,
      badge: "חדש"
    },
    { 
      id: 3, 
      name: "מוצר מקצועי מסגרת 3", 
      price: "₪649", 
      originalPrice: "₪799", 
      category: "מקצועי",
      rating: 4.7, 
      reviews: 156,
      inStock: false,
      badge: "אזל"
    },
    { 
      id: 4, 
      name: "מוצר יוקרה מסגרת 4", 
      price: "₪1,899", 
      originalPrice: "₪2,299", 
      category: "יוקרה",
      rating: 5.0, 
      reviews: 67,
      inStock: true,
      badge: "בלעדי"
    }
  ];

  // Categories - עיצוב מקצועי
  const categories = [
    { name: "אלקטרוניקה", icon: "💻", count: "2,340 מוצרים" },
    { name: "בגדים ואופנה", icon: "👔", count: "1,890 מוצרים" },
    { name: "בית וגן", icon: "🏠", count: "3,210 מוצרים" },
    { name: "ספורט ופנאי", icon: "⚽", count: "1,560 מוצרים" },
    { name: "יופי ובריאות", icon: "💄", count: "990 מוצרים" },
    { name: "ספרים ומשחקים", icon: "📚", count: "750 מוצרים" }
  ];

  // Trust indicators
  const trustIndicators = [
    { icon: Truck, title: "משלוח מהיר", subtitle: "תוך 24-48 שעות" },
    { icon: Shield, title: "אחריות מלאה", subtitle: "עד 2 שנים" },
    { icon: Award, title: "איכות מובטחת", subtitle: "מוצרים מובחרים" },
    { icon: Phone, title: "תמיכה 24/7", subtitle: "שירות מקצועי" }
  ];

  // Auto-scroll hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>📞 לשים פה פרמטר לעדכון עצמאי של המשתמש </span>
            <span className="hidden sm:inline">✉️לשים פה פרמטר לעדכון עצמאי של המשתמש </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">  לשים פה פרמטר לעדכון עצמאי של המשתמש </span>
            <span>🚚</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {/* <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16"> */}
            {/* Logo */}
            {/* <div className="flex items-center">
              <div className="bg-gray-900 text-white p-2 rounded">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <span className="mr-3 text-2xl font-bold text-gray-900">STORE</span>
              <span className="hidden sm:inline text-gray-500 text-sm">החנות המקצועית</span>
            </div> */}

            {/* Desktop Menu */}
            {/* <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {['בית', 'קטלוג מוצרים', 'קטגוריות', 'מבצעים', 'אודות', 'צור קשר'].map((item) => (
                  <a key={item} href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium relative group">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </div> */}

            {/* Right side icons */}
            {/* <div className="flex items-center space-x-4"> */}
              {/* <div className="hidden sm:block relative">
                <input 
                  type="text" 
                  placeholder="חיפוש מוצרים..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 w-64"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <User className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200" />
              <div className="relative">
                <ShoppingBag className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200" />
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div> */}
              
              {/* Mobile menu button */}
              {/* <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button> */}
            {/* </div>
          </div>
        </div> */}

        {/* Mobile Menu */}
        {/* {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['בית', 'קטלוג מוצרים', 'קטגוריות', 'מבצעים', 'אודות', 'צור קשר'].map((item) => (
                <a key={item} href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200">
                  {item}
                </a>
              ))}
              <div className="px-3 py-2">
                <input 
                  type="text" 
                  placeholder="חיפוש מוצרים..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>
          </div>
        )} */}
      {/* </nav> */}


      
    {/* Hero Section */}
      <section className="relative h-96 md:h-[250px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
                  {heroSlides[currentSlide].buttonText}
                  <ArrowRight className="mr-2 h-5 w-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                  למד עוד
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>





            {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">מוצרים נבחרים</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">מבחר המוצרים הטובים ביותר שלנו עם איכות מובטחת</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="relative bg-gray-100 h-64 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">תמונת מוצר</span>
                  </div>
                  
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                    product.badge === 'מומלץ' ? 'bg-blue-500 text-white' :
                    product.badge === 'חדש' ? 'bg-green-500 text-white' :
                    product.badge === 'אזל' ? 'bg-red-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}>
                    {product.badge}
                  </div>
                  
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                      favorites.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-400 hover:text-red-500 shadow-md'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm mr-2">({product.reviews} ביקורות)</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through mr-2 text-sm">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                      product.inStock 
                        ? 'bg-gray-900 text-white hover:bg-gray-800' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'הוסף לסל' : 'אזל במלאי'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <item.icon className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">קטגוריות מובילות</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">מגוון רחב של מוצרים איכותיים בכל הקטגוריות הפופולריות</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">הישארו מעודכנים</h2>
          <p className="text-xl text-gray-300 mb-8">קבלו עדכונים על מוצרים חדשים, הנחות בלעדיות וטיפים מקצועיים</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="כתובת אימייל"
              className="flex-1 px-6 py-4 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-600 bg-gray-800 text-white placeholder-gray-400"
            />
            <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 whitespace-nowrap">
              הירשמו לעדכונים
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gray-900 text-white p-2 rounded">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <span className="mr-3 text-xl font-bold text-gray-900">STORE</span>
              </div>
              <p className="text-gray-600 mb-4">
                החנות המקצועית לכל הצרכים שלכם. איכות, שירות ואמינות מאז 2020.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors">
                  <span className="text-sm">ig</span>
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors">
                  <span className="text-sm">tw</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">מוצרים</h3>
              <ul className="space-y-3">
                {['קטלוג מלא', 'הגעו חדשות', 'מוצרים פופולריים', 'מבצעים שוטפים'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">שירות לקוחות</h3>
              <ul className="space-y-3">
                {['צור קשר', 'מדיניות החזרות', 'תנאי משלוח', 'שאלות נפוצות', 'תמיכה טכנית'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">פרטי קשר</h3>
              <div className="space-y-3 text-gray-600">
                <div>📍 רחוב הדוגמה 123, תל אביב</div>
                <div>📞 03-123-4567</div>
                <div>✉️ info@store.co.il</div>
                <div>🕒 ב'-ו' 9:00-18:00</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© 2025 STORE. כל הזכויות שמורות.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">תנאי שימוש</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">מדיניות פרטיות</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">עוגיות</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage