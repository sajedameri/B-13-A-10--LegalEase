// import LawyerCard from '@/components/LawyerCard';

const BrowseLawyerPage = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lawyers`);
  // const data = await res.json();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5">
      {/* {data.map((lawyer) => (
        <LawyerCard key={lawyer._id} lawyer={lawyer} />
      ))} */}
    </div>
  );
};

export default BrowseLawyerPage;
