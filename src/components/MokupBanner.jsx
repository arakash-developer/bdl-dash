import { MockupZoneContextProvider } from "../context/MockupZoneContex";
import MokupBannerForm from "./MokupBannerForm";
import MokupBannerList from "./MokupBannerList";

const MokupBanner = () => {
  return (
    <MockupZoneContextProvider>
      <div className="flex gap-4 p-4">
        <div className="w-1/3">
          <MokupBannerForm />
        </div>
        <div className="w-2/3">
          <MokupBannerList />
        </div>
      </div>
    </MockupZoneContextProvider>
  );
};

export default MokupBanner;
