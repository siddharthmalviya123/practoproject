// Articles.js
import React from 'react';

const Article1 = () => {
    const handleButtonClick = () => {
        const newWindow = document.createElement('a');
        newWindow.href = 'https://health.ucdavis.edu/blog/good-food/category/health-tips';
        newWindow.target = '_blank';
        newWindow.rel = 'noopener noreferrer';
        newWindow.click();
      };

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Read top articles from health experts</h2>
        <p className="mt-2 text-gray-600">Health articles that keep you informed about good health practices and achieve your goals.</p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700" onClick={handleButtonClick}>
          See all articles
        </button>
      </div>
      <div className="flex justify-center items-center space-x-4 mt-10">
        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:border hover:border grey-800">
          <img className="w-full h-48 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLiTSc5cyd1guK7oOxy3GFXuSyy3WE1E0Hg&s" alt="Article 1" />
          <div className="p-4">
            <p className="text-sm font-medium text-teal-600">CORONAVIRUS</p>
            <h3 className="text-lg font-semibold text-gray-800 mt-2">12 Coronavirus Myths and Facts That You Should Be Aware Of</h3>
            <p className="mt-2 text-gray-600">Dr. Diana Borgio</p>
          </div>
        </div>

        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:border hover:border grey-800">
          <img className="w-full h-48 object-cover" src="https://regencyhealthcare.in/wp-content/uploads/2020/04/Blog-2-1200x628.png" alt="Article 2" />
          <div className="p-4">
            <p className="text-sm font-medium text-teal-600">VITAMINS AND SUPPLEMENTS</p>
            <h3 className="text-lg font-semibold text-gray-800 mt-2">Eating Right to Build Immunity Against Cold and Viral Infections</h3>
            <p className="mt-2 text-gray-600">Dr. Diana Borgio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article1;
