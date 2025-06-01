import React, { useEffect } from 'react'; // ייבא useEffect
import { User, Clock, Heart } from "lucide-react"; // ייבא רק את האייקונים שאתה משתמש בהם
import { useLocation, useNavigate } from 'react-router-dom'; // ייבא useNavigate
import { useQueryClient } from "@tanstack/react-query";

function ProfileMenu({ activeTab, setActiveTab }) {
  const location = useLocation();
  const navigate = useNavigate(); // אתחל את ה-navigate hook
      const queryClient = useQueryClient();
          queryClient.invalidateQueries({ queryKey: ["getUser"] });

  // נתון ה-state שהועבר (לדוגמה, { page: "orders" })
  const goToPageState = location.state;

  // useEffect שירוץ רק פעם אחת בטעינת הקומפוננטה
  // או כאשר GoToPageState משתנה (כדי לתפוס ניווט עם state חדש)
  useEffect(() => {
    // אם ה-state קיים ומכיל את המאפיין 'page' עם הערך 'orders'
    if (goToPageState?.page === "orders") {
      setActiveTab("orders"); // הגדר את הלשונית הפעילה ל-"orders"

      // חשוב: נקה את ה-state מ-location כדי למנוע דריסת מצב עתידית.
      // זה יגרום לכך שאחרי שה-tab הוגדר, ניווטים עתידיים או רענון לא יפגעו בו.
      // אנחנו מחליפים את ה-state הנוכחי ב-state ריק באותו נתיב.
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [goToPageState, setActiveTab, navigate, location.pathname]); // תלותיות ה-useEffect

  return (
    <aside className="md:w-1/4 bg-white rounded-lg shadow-md p-4 h-fit">
      <nav>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab("personal")}
              className={`w-full text-right p-3 rounded-md flex items-center gap-2 ${activeTab === "personal" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
            >
              <User className="h-5 w-5" />
              <span>פרטים אישיים</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-right p-3 rounded-md flex items-center gap-2 ${activeTab === "orders" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
            >
              <Clock className="h-5 w-5" />
              <span>היסטוריית הזמנות</span>
            </button>
          </li>
          <li>
            <button
              onClick={() =>{
          // queryClient.invalidateQueries({ queryKey: ["getUser"] });

               setActiveTab("wishlist")}}
              className={`w-full text-right p-3 rounded-md flex items-center gap-2 ${activeTab === "wishlist" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
            >
              <Heart className="h-5 w-5" />
              <span>מוצרים שאהבתי</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default ProfileMenu;