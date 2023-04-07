import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteBorderIcon } from "../../../helpers/IconContants";
import "../../../public/css/components/maps/popups/BasePopup.scss";
import { BaseMapPopupProps } from "../../../shared/shareddtypes";
import BaseBadge from "../../badges/BaseBadge";
import BaseButton from "../../buttons/BaseButton";
import ProfileInfoWithFollowButton from "../../profiles/ProfileInfoWithFollowButton";
import { usePointDetailsStore } from "../../../store/point.store";
import { canonizeUrl } from "../../../utils/stringUtils";
import { availableCategories } from "../../../helpers/CategoryFilterHelper";

function BaseMapPopup({
  name,
  location,
  image,
  owner,
  category,
  point,
}: BaseMapPopupProps) {
  const [showCategoryBadge, setShowCategoryBadge] = useState(false);
  const {setPointToShow} = usePointDetailsStore();

  const navigate = useNavigate();

  const badgeStyles = {
    backgroundColor: "white",
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  const handleShowBadge = (show: boolean) => {
    setShowCategoryBadge(show);
  };

  const handleButtonClick = () => {
    if(point){
      setPointToShow(point);
    }
    if(point?.name){
      navigate(canonizeUrl("/points", point.name));
    }
  };

  return (
    <div className="base-popup-modal">
      <div
        className="base-popup-modal__head"
        onMouseEnter={() => handleShowBadge(true)}
        onMouseLeave={() => handleShowBadge(false)}
      >
        {category && showCategoryBadge && (
          <BaseBadge text={availableCategories.find(cat => cat.code === category)?.name || "Otros"} styles={badgeStyles} />
        )}
        <img src={image} alt={""} />
      </div>
      <div className="base-popup-modal__body">
        <ProfileInfoWithFollowButton
          name={owner?.name || ""}
          imageUrl={owner.imageUrl}
          webId={owner.webId}
        />

        <div className="popup-modal-social-icons">
          <FavoriteBorderIcon
            sx={{
              color: "#ef233c",
            }}
          />
        </div>
      </div>
      <div className="base-popup-modal__footer">
        <div className="popup-model-footer__contact-info">
          <p>
            {name?.length > 25 ? name.substring(0, 25).concat("...") : name}
          </p>
          <p>
            {location?.address?.length > 30
              ? location?.address.substring(0, 30).concat("...")
              : location?.address}
          </p>
        </div>
        <BaseButton
          type="button-blue"
          text="Ver punto"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

export default BaseMapPopup;
