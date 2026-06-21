

const Bannar = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
   <div className=''>
     <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      className="max-w-xl rounded-lg shadow-2xl"
    />
   </div>
    <div>
      <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
            Find & Hire
            <span className="text-blue-600">
              {" "}Expert Legal Counsel
            </span>
          </h1>
      <p className="py-6">
       Connect with verified lawyers, explore legal services,
            and hire professionals securely from anywhere.
      </p>
      <button className="btn btn-primary">Booking Now</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default Bannar;