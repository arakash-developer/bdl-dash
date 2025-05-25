import { useContext } from "react";
import RecentWorkBannerList from "../components/RecentWorkBannerList";
import RecentWorksBannerContext from "../context/RecentWorkBannerContext";
import RecentWorkBannerForm from "../components/RecentWorkBannerForm";
const RecentWorkBanner = () => {
  let { recentWorks } = useContext(RecentWorksBannerContext);
  console.log(recentWorks);

  return (
    <>
      <div className="flex gap-4 p-4">
        <div className="w-1/3">
        <RecentWorkBannerForm />
        </div>

        <div className="w-2/3">
          <RecentWorkBannerList />
        </div>
      </div>
    </>
  );
};

export default RecentWorkBanner;
