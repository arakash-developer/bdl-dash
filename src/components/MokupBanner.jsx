// import MokupBannerForm from "../components/MokupBannerForm";
import MokupBannerList from "../components/MokupBannerList.";
const RecentWorkBanner = () => {
  return (
    <>
      <div className="flex gap-4 p-4">
        <div className="w-1/3">{/* <MokupBannerForm /> */}</div>
        <div className="w-2/3">
          {/* <RecentWorkBannerList /> */}

          <MokupBannerList />
        </div>
      </div>
    </>
  );
};

export default RecentWorkBanner;
