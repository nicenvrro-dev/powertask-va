import { ClipLoader } from "react-spinners";

type LoadingSpinnerProps = {
  color?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ color = "#FFFFFF" }) => {
  return (
    <div>
      <ClipLoader color={color} size={24} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
};

export default LoadingSpinner;
