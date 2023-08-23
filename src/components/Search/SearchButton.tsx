import { LoadingButton } from '@mui/lab';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

type SearchButtonProps = {
  loading: boolean;
  searchHandleClick: () => void;
};

const SearchButton = ({ loading, searchHandleClick }: SearchButtonProps) => {
  return (
    <LoadingButton
      size="large"
      onClick={searchHandleClick}
      loading={loading}
      variant="outlined"
      startIcon={<SearchOutlinedIcon />}
    >
      Pesquisar
    </LoadingButton>
  );
};

export default SearchButton;
