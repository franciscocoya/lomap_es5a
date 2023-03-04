import { useEffect } from "react";
import PointListingAside from "src/components/asides/PointListingAside";
import BaseMap from "src/components/maps/BaseMap";
import { getUserDatasetByWebId } from "src/helpers/AuthHelper";
import AuthenticatedLayout from "src/layouts/AutenticatedLayout";
import "../../public/css/pages/home/HomePage.scss";

function HomePage() {
  const loadProfile = async () => {
    const data = await getUserDatasetByWebId("https://id.inrupt.com/uo257239");
    console.log(data);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div>
      <AuthenticatedLayout
        styles={{
          padding: "0 50px",
        }}
      >
        <div className="home-map-wrapper">
          <BaseMap
            position={[43.36297198377049, -5.851084856954243]}
            styles={{
              width: "100%",
              height: "80vh",
              borderRadius: "10px",
            }}
          />
          <PointListingAside />
        </div>
      </AuthenticatedLayout>
    </div>
  );
}

export default HomePage;
