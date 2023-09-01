import { LoadingButton, LoadingButtonProps } from '@mui/lab';

const SearchButton = ({ children, ...buttonProps }: LoadingButtonProps) => (
  <LoadingButton size="large" variant="outlined" {...buttonProps}>
    {children}
  </LoadingButton>
);

export default SearchButton;
