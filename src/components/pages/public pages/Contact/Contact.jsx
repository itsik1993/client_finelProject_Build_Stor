import React, { useState } from 'react';
import { Mail, MessageSquare, Send, User, CheckCircle } from 'lucide-react';
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';





function Contact() {
const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // סימולציה של שליחה
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    mutate()
    // איפוס הטופס לאחר 3 שניות
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ email: '', subject: '', message: '' });
    }, 3000);
  };

    const { mutate } = useMutation({
      mutationKey: ["sendContactEmail"],
      mutationFn: async () => await axios.post(`/Users/SendEmailFromContact`, formData),
      onSuccess: (data) => {
        console.log(data);
        if (data.status === 200) {
          console.log("המייל נשלח בהצלחה");
        } else {
          console.log("הייתה בעיה בשליחת המייל ");
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });

  const isFormValid = formData.email && formData.subject && formData.message;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform animate-pulse">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ההודעה נשלחה בהצלחה!
            </h2>
            <p className="text-gray-600">
              תודה שפנית אלינו. נחזור אליך בהקדם האפשרי.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            צור קשר
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            יש לך שאלה או הצעה? נשמח לשמוע ממך ונחזור אליך בהקדם האפשרי
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mr-3 ml-4">אימייל</h3>
              </div>
              <p className="text-gray-600 mr-3">contact@example.com</p>
            </div>

            {/* <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mr-3">צ'אט</h3>
              </div>
              <p className="text-gray-600">זמינים בימים א'-ה' 9:00-18:00</p>
            </div> */}

            {/* <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mr-3">תמיכה</h3>
              </div>
              <p className="text-gray-600">זמן תגובה ממוצע: 2-4 שעות</p>
            </div> */}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    כתובת אימייל
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                      placeholder="הכנס את כתובת האימייל שלך"
                      dir="ltr"
                    />
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    נושא ההודעה
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                    placeholder="על מה תרצה לדבר?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    תוכן ההודעה
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-right"
                    placeholder="כתב את ההודעה שלך כאן..."
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-300 transform ${
                    isFormValid && !isSubmitting
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                      : 'bg-gray-400 cursor-not-allowed'
                  } flex items-center justify-center space-x-2`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="mr-2">שולח...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span className="mr-2">שלח הודעה</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">נשמח לעזור לך!</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              הצוות שלנו כאן כדי לענות על כל השאלות שלך ולספק לך את השירות הטוב ביותר. 
              אל תהסס לפנות אלינו בכל עת.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact