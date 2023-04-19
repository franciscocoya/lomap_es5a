import { useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import SinglePointDetailBanner from "../../components/banners/pointDetail/SinglePointDetailBanner";
import AddNewPointLink from "../../components/points/details/AddNewPointLink";
import PointReviewSection from "../../components/points/details/PointReviewSection";
import ReviewListing from "../../components/points/details/ReviewListing";
import SingleDetail from "../../components/points/details/SingleDetails";
import AuthenticatedLayout from "../../layouts/AuthenticatedLayout";
import "../../public/css/pages/points/SinglePointPage.scss";
import { usePointDetailsStore } from "../../store/point.store";

function SinglePointDetailsPage() {
  const { getPointDetails, pointToShow } = usePointDetailsStore();
  const { session } = useSession();

  return (
    <AuthenticatedLayout>
      <div className="single-point-details-container" id="point-details-page">
        <SinglePointDetailBanner
          pointImage={getPointDetails()?.image?.url}
          coords={getPointDetails().location.coords}
        />
        <section className="single-point-details__details">
          <SingleDetail pointToShow={getPointDetails()} />
        </section>
        {pointToShow?.reviews && pointToShow?.reviews?.length > 0 && (
          <section className="single-point-details__reviews">
            <PointReviewSection pointToShow={getPointDetails()} />
          </section>
        )}

        {session.info.webId !== getPointDetails()?.owner?.webId && (
          <section className="single-point-details__addReview">
            <AddNewPointLink pointToShow={getPointDetails()} />
          </section>
        )}
        <section className="single-point-details__reviewListing">
          <ReviewListing />
        </section>
      </div>
    </AuthenticatedLayout>
  );
}

export default SinglePointDetailsPage;
