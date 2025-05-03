import {useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";

interface WriteTVSeriesReviewProps {
    tvSeriesId: number;
  }
  
  const WriteTVSeriesReview: React.FC<WriteTVSeriesReviewProps> = ({ tvSeriesId }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/tvseries/${tvSeriesId}/review`);
    };
  
    return (
      <IconButton onClick={handleClick} color="primary">
        <RateReviewIcon />
      </IconButton>
    );
  };
  
  export default WriteTVSeriesReview;
  