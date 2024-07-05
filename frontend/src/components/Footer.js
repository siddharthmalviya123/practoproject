import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#28328c] text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Column 1 */}
        <div className="flex flex-col space-y-2">
          <span className="font-semibold">About</span>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">About</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Search for doctors</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Practo Profile</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Insta by Practo</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Help</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Facebook</a>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Blog</span>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Blog</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Search for Minics</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">For clinics</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Qixwell by Practo</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Developers</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Twitter</a>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Careers</span>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Careers</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Search for hospitals</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Practo Profile</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Privacy Policy</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Linkedin</a>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Press</span>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Press</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Practo Plus</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Ray by Practo</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Practo Reach</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Terms & Conditions</a>
          <a href="https://www.practo.com/" className="text-gray-300 hover:text-white">Youtube</a>
        </div>

        {/* Company Info */}
       
      </div>
      <div className="flex items-center  justify-center  mt-7 ">
          <img src="https://blog.practo.com/wp-content/uploads/2017/04/1.png" alt="Footer Photo" className="h-20 w-20 rounded-full" />
          <p className="ml-2">© 2024 Practo or Your Company Name</p>
        </div>
    </footer>
  );
}

export default Footer;
