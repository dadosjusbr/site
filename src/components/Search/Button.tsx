import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchButton = ({ children, ...buttonProps }: LoadingButtonProps) => {
  return (
    <LoadingButton size="large" variant="outlined" {...buttonProps}>
      {children}
    </LoadingButton>
  );
};

export default SearchButton;
